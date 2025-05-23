from flask import Flask, request, render_template, jsonify, session, redirect, url_for
from firebase_config import auth, db
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth as firebase_auth
import os

app = Flask(__name__, template_folder="frontend/public/templates", static_folder="frontend/public/static")

app.secret_key = os.urandom(24)

@app.route("/")
def index():
    try:
        books_ref = db.collection("books")
        books = []
        for doc in books_ref.stream():
            book = doc.to_dict()
            book["doc_id"] = doc.id
            books.append(book)
        return render_template("index.html", books=books)
    except Exception as e:
        return f"Error loading books: {str(e)}", 500

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/profile")
def profile():
    if 'user_email' not in session:
        return redirect(url_for("login_page"))
    return render_template("profile.html", user_email=session['user_email'])

@app.route("/session-login", methods=["POST"])
def session_login():
    id_token = request.json.get("idToken")
    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        session['user_email'] = decoded_token.get("email")
        return jsonify({"message": "Session created"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route("/add-book", methods=["POST"])
def add_book():
    try:
        data = request.get_json()
        title = data.get("title")
        author = data.get("author")
        course_number = data.get("courseNumber")
        professor = data.get("professor")
        price = float(data.get("price"))

        if not all([title, author, course_number, professor, price]):
            return jsonify({"error": "All fields are required"}), 400

        book_ref = db.collection("books").add({
            "title": title,
            "author": author,
            "courseNumber": course_number,
            "professor": professor,
            "price": price
        })

        return jsonify({"message": "Book added successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/search")
def search():
    query = request.args.get("q", "").lower()
    books_ref = db.collection("books")
    results = []

    for doc in books_ref.stream():
        book = doc.to_dict()
        book["doc_id"] = doc.id
        if any(query in str(book.get(field, "")).lower() for field in ["title", "author", "courseNumber", "professor"]):
            results.append(book)

    return jsonify(results)

@app.route("/delete-book/<book_id>", methods=["DELETE"])
def delete_book(book_id):
    try:
        db.collection("books").document(book_id).delete()
        return jsonify({"message": "Book deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
