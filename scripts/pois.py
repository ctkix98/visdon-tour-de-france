import requests
from bs4 import BeautifulSoup
import json
import time

# En-têtes pour éviter le blocage
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, comme Gecko) Chrome/114.0.0.0 Safari/537.36"
}

# Boucle sur les 21 étapes
for i in range(1, 22):
    url = f"https://www.letour.fr/fr/classements/etape-{i}"
    print(f"🔎 Scraping du maillot grimpeur pour {url}...")

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        # Trouver l'onglet "Classement Général"
        tab_general = soup.find("span", class_="js-tabs-ranking", string="Classement général")
        if not tab_general:
            print(f"❌ Impossible de trouver le classement général pour l'étape {i}")
            continue

        # Récupérer les URLs AJAX
        ajax_data = tab_general["data-ajax-stack"]
        json_data = json.loads(ajax_data.replace("&quot;", '"'))

        # URL AJAX pour le classement grimpeur (img)
        if "img" not in json_data:
            print(f"⚠️ Pas de classement grimpeur disponible à l'étape {i}")
            continue

        ajax_url_grimpeur = "https://www.letour.fr" + json_data["img"]

        # Requête AJAX pour le classement grimpeur
        response_ajax_grimpeur = requests.get(ajax_url_grimpeur, headers=headers)
        if response_ajax_grimpeur.status_code == 200:
            ajax_soup_grimpeur = BeautifulSoup(response_ajax_grimpeur.text, "html.parser")

            leader_row = ajax_soup_grimpeur.find("tr", class_="rankingTables__row")
            if leader_row:
                # Dossard
                dossard_td = leader_row.find("td", class_="is-alignCenter hidden")
                dossard = int(dossard_td.text.strip()) if dossard_td else None

                # Points
                points_tds = leader_row.find_all("td", class_="is-alignCenter")
                points = int(points_tds[2].text.strip().replace(" PTS", "")) if len(points_tds) > 2 else None

                # Stockage
                maillot_grimpeur = {
                    "id_coureur": dossard,
                    "points": points
                }

                # Sauvegarde
                fichier_json = f"maillot_grimpeur_etape_{i}.json"
                with open(fichier_json, "w", encoding="utf-8") as f:
                    json.dump(maillot_grimpeur, f, ensure_ascii=False, indent=4)

                print(f"✅ Maillot grimpeur enregistré dans '{fichier_json}'")
            else:
                print(f"⚠️ Pas de données pour le maillot grimpeur à l'étape {i}")
        else:
            print(f"❌ Erreur AJAX ({response_ajax_grimpeur.status_code}) pour le maillot grimpeur à l'étape {i}")
    else:
        print(f"❌ Erreur HTTP ({response.status_code}) à l'étape {i}")

    time.sleep(2)  # Pause pour éviter le blocage
