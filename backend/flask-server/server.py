from flask import Flask, jsonify, request
import cx_Oracle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

search_results = [
    {'id': 1, 'name': 'John Doe', 'dob': '01/01/1990'},
    {'id': 2, 'name': 'Lebron James', 'dob': '12/30/1984'},
    {'id': 3, 'name': 'Jeff Bezos', 'dob': '01/12/1964'},
    {'id': 4, 'name': 'Jesus Christ', 'dob': '12/25/0000'},
    {'id': 5, 'name': 'Michael Jordan', 'dob': '02/17/1963'},
]


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    results = []

    # Simple search algorithm that returns the first 5 items that contain the query in their name
    for item in search_results:
        if query.lower() in item['name'].lower():
            results.append(item)
            if len(results) == 5:
                break

    # return jsonify(results)

    return jsonify(search_results)



# example of getting data from database for login
@app.route('/login_info', methods=['POST']) 
def login_info():
    print('login_info')
    data = request.json
    username = data['username']
    password = data['password']
    print(username, password)

    # conn = cx_Oracle.connect('FILL IN USERNAME/PASSWORD@HOST_INFO HERE')
    # cur = conn.cursor()
    # cur.execute('SELECT * FROM table_name WHERE username = :username AND password = :password', username=username, password=password)
    # result = cur.fetchall()
    # cur.close()
    # conn.close()
    response = jsonify({'success': True})
    
    # if result:
    #     response = jsonify({'success': True})
    # else:
    #     response = jsonify({'success': False})


    return response

if __name__=='__main__':
    app.run(debug=True)



