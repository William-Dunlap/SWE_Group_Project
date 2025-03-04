from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder='frontend/build', template_folder='frontend/build')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
