from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.place_service import search_places, save_place, get_saved_places

place_bp = Blueprint('place', __name__)

@place_bp.route('/search', methods=['GET'])
@jwt_required()
def search():
    keyword = request.args.get('keyword')
    return search_places(keyword)

@place_bp.route('/save', methods=['POST'])
@jwt_required()
def save():
    data = request.get_json()
    user_id = get_jwt_identity()
    return save_place(user_id, data)

@place_bp.route('/saved', methods=['GET'])
@jwt_required()
def saved_places():
    user_id = get_jwt_identity()
    return get_saved_places(user_id)
