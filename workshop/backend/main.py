import json
from flask import Flask, request
from flask_cors import CORS, cross_origin

from utils import build_code_file_path
from setup import setup
from executions import simple_execution
from config import PORT


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=['GET'])
@cross_origin()
def hello_world():
    """
    Checks if we can communicate with the python backend
    """
    return json.dumps({"status": "Pyhon backend up and healthy!"})


@cross_origin()
@app.route("/run", methods=['POST'])
def run():
    """
    Run code
    """
    app.logger.info("Enter /run")
    app.logger.info(f"Request json is {request.json}")
    if request.json is None:
        return json.dumps({"stdout": None, "stderr": "Request does not have any code to run."})
    code = request.json['code']
    file_path = build_code_file_path("cpp")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)
    app.logger.info(f"Created temporary file {file_path}")

    # copy file to container
    output = simple_execution(app, file_path)
    return json.dumps(output)


if __name__ == "__main__":
    setup()
    app.run(host="0.0.0.0", port=PORT)
