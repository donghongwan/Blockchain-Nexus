from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def dashboard():
    # Load sustainability metrics from a JSON file or database
    with open('sustainability_metrics.json') as f:
        metrics = json.load(f)
    return render_template('dashboard.html', metrics=metrics)

if __name__ == '__main__':
    app.run(debug=True)
