def save_place(tx, user_id, place_data):
    query = """
    MERGE (u:User {id: $user_id})
    CREATE (p:Place {name: $name, address: $address, lat: $lat, lng: $lng, photos: $photos})
    MERGE (u)-[:SAVED]->(p)
    """
    tx.run(query, user_id=user_id, **place_data)
