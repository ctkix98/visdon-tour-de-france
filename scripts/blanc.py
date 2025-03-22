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
    print(f"🔎 Scraping du maillot blanc (jeune) pour {url}...")

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

        # URL AJAX pour le classement des jeunes (ijg)
        if "ijg" not in json_data:
            print(f"⚠️ Pas de classement jeune disponible à l'étape {i}")
            continue

        ajax_url_jeune = "https://www.letour.fr" + json_data["ijg"]

        # Requête AJAX pour le maillot blanc
        response_ajax_jeune = requests.get(ajax_url_jeune, headers=headers)
        if response_ajax_jeune.status_code == 200:
            ajax_soup_jeune = BeautifulSoup(response_ajax_jeune.text, "html.parser")

            leader_row = ajax_soup_jeune.find("tr", class_="rankingTables__row")
            if leader_row:
                # Dossard
                dossard_td = leader_row.find("td", class_="is-alignCenter hidden")
                id_coureur = int(dossard_td.text.strip()) if dossard_td else None

                # Temps (1er td avec class="is-alignCenter time")
                temps_td = leader_row.find("td", class_="is-alignCenter time")
                temps = temps_td.text.strip() if temps_td else None

                # Stockage
                maillot_blanc = {
                    "id_coureur": id_coureur,
                    "temps": temps
                }

                # Sauvegarde
                fichier_json = f"maillot_blanc_etape_{i}.json"
                with open(fichier_json, "w", encoding="utf-8") as f:
                    json.dump(maillot_blanc, f, ensure_ascii=False, indent=4)

                print(f"✅ Maillot blanc enregistré dans '{fichier_json}'")
            else:
                print(f"⚠️ Pas de données pour le maillot blanc à l'étape {i}")
        else:
            print(f"❌ Erreur AJAX ({response_ajax_jeune.status_code}) pour le maillot blanc à l'étape {i}")
    else:
        print(f"❌ Erreur HTTP ({response.status_code}) à l'étape {i}")

    time.sleep(2)  # Pause pour éviter le blocage
