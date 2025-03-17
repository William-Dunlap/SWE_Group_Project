from flask import Flask, request, render_template, jsonify
from firebase_config import auth

app = Flask(__name__, template_folder="frontend/public/templates", static_folder="frontend/public/static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("username")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing credentials"}), 400

    try:
        # Create user in Firebase Auth
        user = auth.create_user(email=email, password=password)
        return jsonify({"message": "Account created successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("username")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing credentials"}), 400

    try:
        # Firebase Auth handles login on the client side (firebase.js)
        return jsonify({"message": "Login successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
