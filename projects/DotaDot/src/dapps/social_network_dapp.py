# dapps/social_network_dapp.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/post', methods=['POST'])
def create_post():
    data = request.json
    # Logic to create a post
    return jsonify({"status": "Post created", "post_id": post_id})

@app.route('/like', methods=['POST'])
def like_post():
    data = request.json
    # Logic to like a post
    return jsonify({"status": "Post liked", "post_id": data['post_id']})

if __name__ == '__main__':
    app.run(debug=True)
