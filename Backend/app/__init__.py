from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from py2neo import Graph
from flask_cors import CORS

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    # Initialize the Neo4j connection using py2neo
    app.graph = Graph(
        app.config['NEO4J_URI'],
        auth=(app.config['NEO4J_USERNAME'], app.config['NEO4J_PASSWORD'])
    )

    # Initialize Extensions
    jwt.init_app(app)
    CORS(app, origins=["http://localhost:3000"])

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        return response

    # Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.place_routes import place_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(place_bp, url_prefix='/places')

    return app
