import requests
from bs4 import BeautifulSoup
import json
import time

# En-têtes pour éviter le blocage
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, comme Gecko) Chrome/114.0.0.0 Safari/537.36"
}

# Boucle sur les 21 étapes
for i in range(1, 22):  # Étapes 1 à 21
    url = f"https://www.letour.fr/fr/classements/etape-{i}"
    print(f"🔎 Scraping du maillot vert pour {url}...")

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
        ajax_url_general = "https://www.letour.fr" + json_data["ipg"]  # URL AJAX pour le classement par points (maillot vert)

        # Requête AJAX pour obtenir la page du classement par points (maillot vert)
        response_ajax_vert = requests.get(ajax_url_general, headers=headers)
        if response_ajax_vert.status_code == 200:
            ajax_soup_vert = BeautifulSoup(response_ajax_vert.text, "html.parser")

            # Récupérer la première ligne du classement des points (leader du maillot vert)
            leader_row = ajax_soup_vert.find("tr", class_="rankingTables__row")
            if leader_row:
                # ID du coureur (dossard)
                dossard_td = leader_row.find("td", class_="is-alignCenter hidden")
                dossard = int(dossard_td.text.strip()) if dossard_td else None

                # Nombre de points
                points_td = leader_row.find_all("td", class_="is-alignCenter")
                points = int(points_td[2].text.strip().replace(" PTS", "")) if len(points_td) > 2 else None

                # Enregistrer les données
                maillot_vert = {
                    "id_coureur": dossard,
                    "points": points
                }

                # Sauvegarde dans un fichier JSON
                fichier_json = f"maillot_vert_etape_{i}.json"
                with open(fichier_json, "w", encoding="utf-8") as f:
                    json.dump(maillot_vert, f, ensure_ascii=False, indent=4)

                print(f"✅ Maillot vert enregistré dans '{fichier_json}'")
            else:
                print(f"⚠️ Pas de données pour le maillot vert à l'étape {i}")
        else:
            print(f"❌ Erreur AJAX ({response_ajax_vert.status_code}) pour le maillot vert à l'étape {i}")

    else:
        print(f"❌ Erreur ({response.status_code}) lors du chargement de l'étape {i}")

    time.sleep
