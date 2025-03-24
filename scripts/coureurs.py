import os
import re
import json
import time
import requests
from bs4 import BeautifulSoup
import pycountry

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Fonction pour obtenir le code ISO du pays à partir du nom
def get_iso_code(nationality):
    try:
        # Certains noms de pays ne sont pas reconnus directement, on effectue une recherche floue
        country = pycountry.countries.search_fuzzy(nationality)[0]
        return country.alpha_2.lower()
    except Exception as e:
        print(f"[Warning] Impossible de trouver le code ISO pour '{nationality}': {e}")
        return ""

# Fonction pour télécharger l'image et sauvegarder avec la nomenclature indiquée
def download_image(img_url, save_path):
    try:
        response = requests.get(img_url, stream=True)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"[Info] Image sauvegardée sous {save_path}")
        else:
            print(f"[Erreur] Téléchargement de l'image échoué: code HTTP {response.status_code}")
    except Exception as e:
        print(f"[Erreur] Exception lors du téléchargement de l'image : {e}")

def main():
    URL_BASE = "https://www.letour.fr/fr/coureurs"

    # Création des dossiers de sauvegarde
    assets_folder = os.path.join("assets", "coureurs")
    os.makedirs(assets_folder, exist_ok=True)

    # Configuration de Selenium en mode headless
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=chrome_options)

    try:
        print("[Info] Ouverture de la page des coureurs...")
        driver.get(URL_BASE)

        # Attendre que la liste des coureurs soit chargée. Ajuster le sélecteur si besoin.
        wait = WebDriverWait(driver, 20)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "a[href*='/fr/coureur/']")))
        time.sleep(2)  # Petite pause pour être sûr que tout soit chargé
        
        # Récupérer la page source et parser avec BeautifulSoup
        page = driver.page_source
        soup = BeautifulSoup(page, "html.parser")
        
        # Récupérer tous les liens menant à la page d'un coureur
        # On recherche tous les <a> qui contiennent "/fr/coureur/" dans leur href
        rider_links = []
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if "/fr/coureur/" in href:
                # Assurer la complétude de l'URL
                full_url = href if href.startswith("http") else "https://www.letour.fr" + href
                if full_url not in rider_links:
                    rider_links.append(full_url)
        print(f"[Info] {len(rider_links)} coureurs trouvés.")

        # Stockage des informations des coureurs
        coureurs = []

        for idx, rider_url in enumerate(rider_links, start=1):
            print(f"[Info] Traitement du coureur {idx} : {rider_url}")
            driver.get(rider_url)
            # Attendre que les éléments essentiels soient chargés
            try:
                wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".riderInfos__firstName")))
                time.sleep(1)
            except Exception as e:
                print(f"[Erreur] Timeout sur la page {rider_url}: {e}")
                continue

            rider_page = driver.page_source
            rider_soup = BeautifulSoup(rider_page, "html.parser")

            # Extraction des informations
            first_name_el = rider_soup.find(class_="riderInfos__firstName")
            full_name_el = rider_soup.find(class_="riderInfos__fullName")
            bib_el = rider_soup.find(class_="riderInfos__bib__number")
            counrty_el = rider_soup.find(class_="riderInfos__country__name")
            team_el = rider_soup.find(class_="riderInfos__teamName")
            image_el = rider_soup.find("img", class_=lambda x: x and "riderProfile__img" in x)

            if not (first_name_el and full_name_el and bib_el and counrty_el and team_el and image_el):
                print(f"[Erreur] Certaines informations manquent pour la page {rider_url}.")
                continue

            first_name = first_name_el.get_text(strip=True)
            full_name = full_name_el.get_text(strip=True)
            # bib_el contient un texte du type "N° 1", on enlève "N°" et les espaces
            bib_text = bib_el.get_text(strip=True)
            bib_number = re.sub(r"^N°\s*", "", bib_text)

            nationality = counrty_el.get_text(strip=True)
            team = team_el.get_text(strip=True)

            # Récupérer l'url de l'image. Parfois la source peut être dans "src" ou "data-src".
            img_url = image_el.get("src") if image_el.get("src") else image_el.get("data-src")
            if not img_url.startswith("http"):
                img_url = "https://www.letour.fr" + img_url

            # Définir le nom de fichier pour l'image
            # Conversion des noms en minuscules et suppression des espaces via un tiret
            prenom_nom = f"{first_name}-{full_name}".lower().replace(" ", "-")
            img_filename = f"{bib_number}_{prenom_nom}_profil.jpg"
            img_save_path = os.path.join(assets_folder, img_filename)

            # Télécharger l'image
            download_image(img_url, img_save_path)

            # Récupérer le code ISO pour le drapeau en utilisant pycountry
            iso_code = get_iso_code(nationality)
            drapeau = f"flag-icon flag-icon-{iso_code}" if iso_code else ""

            # Construire le dictionnaire du coureur
            coureur_data = {
                "id": bib_number,
                "prenom": first_name,
                "nom": full_name,
                "nation": nationality,
                "drapeau": drapeau,
                "team": team,
                "image": img_save_path
            }
            coureurs.append(coureur_data)
            print(f"[Info] Coureur {bib_number} récupéré: {first_name} {full_name}")

        # Sauvegarder dans le fichier coureur.json
        with open("coureur.json", "w", encoding="utf-8") as f:
            json.dump(coureurs, f, ensure_ascii=False, indent=4)
        print("[Info] Données sauvegardées dans coureur.json")

    except Exception as e:
        print(f"[Erreur] Exception globale : {e}")
    finally:
        driver.quit()
        print("[Info] Fin du script.")

if __name__ == '__main__':
    main()
