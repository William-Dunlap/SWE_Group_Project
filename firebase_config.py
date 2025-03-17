import firebase_admin
from firebase_admin import credentials, auth, firestore

# Load Firebase credentials (Replace with actual file path)
cred = credentials.Certificate("chompbooks-privatekey.json")
firebase_app = firebase_admin.initialize_app(cred)

# Firestore database instance
db = firestore.client()
