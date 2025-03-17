from flask import Flask, request, render_template, jsonify
from firebase_config import auth, db

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
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400

    try:
        # Firebase requires an email, so we generate a fake one
        email = f"{username}@ufl.edu"
        user = auth.create_user(email=email, password=password)

        # Store username and password in Firestore
        user_ref = db.collection("users").document(username)
        user_ref.set({"username": username, "password": password})

        return jsonify({"message": "Account created successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400

    try:
        # Fetch user credentials from Firestore
        user_ref = db.collection("users").document(username)
        user_doc = user_ref.get()

        if user_doc.exists and user_doc.to_dict().get("password") == password:
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
