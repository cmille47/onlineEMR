What i did:

1. created anaconda environment and installed python
2. created folder for front end and backend. In backend I create a server.py file for flask
3. in frontend, ran 'npx create-react-app' client which installed a whole host of packages and created client folder
4. installed flask: pip3 install flask
5. setup backend in server.py file. created basic members function for a members webpage accessible from localhost
6. removed some 'unncessary files': app.test.js, index.css, logo.svg.
6a. removed any mentions of those files from index.js file
7. added proxy line to package.json file
8. created app.js file
8a. look at app.js file for explanation  



INSTALLS:
pip3 install cx_Oracle or we can use sqllite, sqlalchemy, etc
pip3 install flask

4/23 changes:
I worked primarily on the dashboard. Added 2 cards. One will hold patient search option. Any character typed activates a flask backend api request. I defined a new api to handle this that returns some dummy results. This api is in the flask server file.

In addition, if the item in the dropdown is clicked, it will log the value in the console. Will use this feature to implement pulling up the specified patients data in the patient chart page. 

I also added a card that will be used to hold the view data button which will redirect to the querying page. This should be simple. 

One last thing, in the dashboard, I have not added much error checking/results validation. I will do this later once everything is working. 

Wait one more thing, I downloaded this package called axios using npm install axios. It makes doing api requests easier. I hpe this do not be an issue
