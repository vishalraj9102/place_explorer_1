import requests
from app.config import Config

def fetch_places(keyword):
    url = "https://maps.gomaps.pro/maps/api/place/textsearch/json"
    params = {'query': keyword, 'key': Config.GOOGLE_API_KEY}
    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        print("Error fetching data from GoMaps API")
        return None
    
    places_data = response.json()

    # Log only the relevant part of the response for debugging
    print("Filtered Places Data:", places_data.get('results', []))

    places = []
    for result in places_data.get('results', []):
        place = {
            'name': result.get('name'),
            'address': result.get('formatted_address'),
            'coordinates': result.get('geometry', {}).get('location', {}),
            'photos': [
                f"https://maps.gomaps.pro/maps/api/place/photo?maxwidth=400&photo_reference={photo['photo_reference']}&key={Config.GOOGLE_API_KEY}"
                for photo in result.get('photos', [])
            ] if result.get('photos') else [],
        }
        places.append(place)
    
    return places
