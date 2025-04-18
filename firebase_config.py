import firebase_admin
from firebase_admin import credentials, auth, firestore

cred = credentials.Certificate("chompbooks-privatekey.json")
firebase_app = firebase_admin.initialize_app(cred)

db = firestore.client()
