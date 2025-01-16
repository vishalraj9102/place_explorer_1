def test_search_places(client, jwt_token):
    response = client.get('/places/search?keyword=restaurant', headers={'Authorization': f'Bearer {jwt_token}'})
    assert response.status_code == 200
    assert 'name' in response.json[0]
    assert 'address' in response.json[0]
    assert 'coordinates' in response.json[0]
    
def test_save_place(client, jwt_token):
    place_data = {
        "name": "Restaurant ABC",
        "address": "123 ABC Street, City",
        "coordinates": {"lat": 40.7128, "lng": -74.0060},
        "photos": []
    }
    
    response = client.post('/places/save', json=place_data, headers={'Authorization': f'Bearer {jwt_token}'})
    assert response.status_code == 200
    assert response.json['message'] == "Place saved successfully!"
