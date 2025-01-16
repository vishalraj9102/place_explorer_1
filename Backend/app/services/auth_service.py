from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

users = {}  # Temporary in-memory storage

def register_user(data):
    username = data['username']
    password = generate_password_hash(data['password'])
    if username in users:
        return jsonify({'message': 'User already exists'}), 400
    users[username] = password
    return jsonify({'message': 'User registered successfully'}), 201

def login_user(data):
    username = data['username']
    password = data['password']
    if username not in users or not check_password_hash(users[username], password):
        return jsonify({'message': 'Invalid credentials'}), 401
    token = create_access_token(identity=username)
    return jsonify({'token': token}), 200
