# dapps/education_dapp.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/create_course', methods=['POST'])
def create_course():
    data = request.json
    # Logic to create a new course
    return jsonify({"status": "Course created", "course_id": course_id})

@app.route('/enroll', methods=['POST'])
def enroll():
    data = request.json
    # Logic to enroll in a course
    return jsonify({"status": "Enrolled in course", "course_id": data['course_id']})

if __name__ == '__main__':
    app.run(debug=True)
