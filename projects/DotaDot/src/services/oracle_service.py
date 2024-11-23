# services/oracle_service.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# A simple in-memory cache to store oracle responses
oracle_cache = {}

@app.route('/get_data_from_oracle', methods=['GET'])
def get_data_from_oracle():
    # Get the URL of the oracle from the query parameters
    oracle_url = request.args.get('url')
    
    if not oracle_url:
        return jsonify({"status": "error", "message": "Oracle URL is required"}), 400

    # Check if the data is already cached
    if oracle_url in oracle_cache:
        return jsonify({"status": "success", "data": oracle_cache[oracle_url], "source": "cache"}), 200

    try:
        # Make a request to the oracle
        response = requests.get(oracle_url)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Store the response in the cache
            oracle_cache[oracle_url] = response.json()
            return jsonify({"status": "success", "data": oracle_cache[oracle_url], "source": "oracle"}), 200
        else:
            return jsonify({"status": "error", "message": "Failed to retrieve data from oracle", "status_code": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/clear_cache', methods=['DELETE'])
def clear_cache():
    """Endpoint to clear the oracle cache."""
    oracle_cache.clear()
    return jsonify({"status": "success", "message": "Cache cleared"}), 200

if __name__ == '__main__':
    app.run(debug=True)
