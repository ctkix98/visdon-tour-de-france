import requests
from bs4 import BeautifulSoup
import json
import time

# En-têtes pour éviter le blocage par le site
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, comme Gecko) Chrome/114.0.0.0 Safari/537.36"
}

# Boucle sur les 21 étapes
for i in range(1, 22):  # Étapes 1 à 21
    url = f"https://www.letour.fr/fr/classements/etape-{i}"
    print(f"🔎 Scraping de {url}...")

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        # Trouver le lien AJAX du classement général
        tab_ranking = soup.find("span", class_="js-tabs-ranking", string="Classement général")
        if not tab_ranking:
            print(f"❌ Impossible de trouver le lien AJAX pour l'étape {i}")
            continue

        ajax_data = tab_ranking["data-ajax-stack"]
        json_data = json.loads(ajax_data.replace("&quot;", '"'))  # Convertir en JSON
        ajax_url = "https://www.letour.fr" + json_data["itg"]  # URL du classement général

        # Requête AJAX pour obtenir le vrai classement général
        response_ajax = requests.get(ajax_url, headers=headers)

        if response_ajax.status_code == 200:
            ajax_soup = BeautifulSoup(response_ajax.text, "html.parser")
            coureurs = []

            # Trouver toutes les lignes du classement général
            rows = ajax_soup.find_all("tr", class_="rankingTables__row")[:10]  # Prendre seulement les 10 premiers

            for row in rows:
                classement = row.find("td", class_="rankingTables__row__position is-alignCenter")
                classement = classement.text.strip() if classement else None

                dossard = row.find("td", class_="is-alignCenter hidden")
                dossard = dossard.text.strip() if dossard else None

                temps = row.find("td", class_="is-alignCenter time")
                temps = temps.text.strip() if temps else None

                if classement and dossard and temps:
                    coureurs.append({
                        "no_general": int(classement),
                        "id": int(dossard),
                        "temps": temps
                    })

            # Sauvegarde des résultats de l'étape
            fichier_json = f"classement_general_etape_{i}.json"
            with open(fichier_json, "w", encoding="utf-8") as f:
                json.dump(coureurs, f, ensure_ascii=False, indent=4)

            print(f"✅ Données enregistrées dans '{fichier_json}'")

        else:
            print(f"❌ Erreur ({response_ajax.status_code}) lors du chargement AJAX pour l'étape {i}")

    else:
        print(f"❌ Erreur ({response.status_code}) lors du chargement de la page principale de l'étape {i}")

    time.sleep(2)  # Pause pour éviter un blocage du site
