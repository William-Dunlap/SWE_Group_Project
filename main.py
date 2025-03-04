from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='frontend/public/static', template_folder='frontend/public/templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)