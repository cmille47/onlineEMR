from flask import Flask, jsonify, request
import cx_Oracle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# example of getting data from database for login
@app.route('/login_info', methods=['POST']) 
def login_info():
    data = request.json
    username = data['username']
    password = data['password']

    conn = cx_Oracle.connect('FILL IN USERNAME/PASSWORD@HOST_INFO HERE')
    cur = conn.cursor()
    cur.execute('SELECT * FROM table_name WHERE username = :username AND password = :password', username=username, password=password)
    result = cur.fetchall()
    cur.close()
    conn.close()
    
    if result:
        response = jsonify({'success': True})
    else:
        response = jsonify({'success': False})


    return response

# members API route
@app.route('/members')
def members():
    return {"members": ['member1', 'member2', 'member3']}

@app.route('/')
def index():
    return 'hello world'

if __name__=='__main__':
    app.run(debug=True)



