from flask import Flask, request, jsonify
import model

from flask_cors import CORS

# Enable all CORS requests
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello():
    # Get JSON data from the incoming request
    data = request.get_json()
    
    # Do something with the data if needed (e.g., manipulate, process, etc.)
    result = model.compute(data)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)