from neo4j import GraphDatabase
from flask import current_app, jsonify
from app.utils.google_api_utils import fetch_places

def search_places(keyword):
    try:
        places = fetch_places(keyword)
        if not places:
            return jsonify({"message": "No places found matching the keyword."}), 404
        return jsonify(places)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def save_place(user_id, data):
    try:
        graph = current_app.graph
        # Get the coordinates
        coordinates = data.get('coordinates', {})
        lat = coordinates.get('lat')
        lng = coordinates.get('lng')

        # Store coordinates as a string or dictionary
        coords_str = f"{lat},{lng}"

        query = """
        CREATE (p:Place {name: $name, address: $address, coordinates: $coordinates, 
                         photos: $photos, userId: $user_id})
        """

        # Collect relevant data
        place_data = {
            'name': data['name'],
            'address': data['address'],
            'coordinates': coords_str,  # Pass coordinates as a string or dictionary
            'photos': data.get('photos', []),  # Photos reference array (if available)
            'user_id': user_id,
        }

        graph.run(query, **place_data)
        return jsonify({"message": "Place saved successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_saved_places(user_id):
    try:
        graph = current_app.graph
        query = """
        MATCH (p:Place {userId: $user_id})
        RETURN p
        """
        result = graph.run(query, user_id=user_id).data()
        if not result:
            return jsonify({"message": "No saved places found for this user."}), 404
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
