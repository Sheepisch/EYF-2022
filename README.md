# project Enjoy Your Flight
### HBO-ICT deeltijd eerstejaars CS + SE

Project: Enjoy your flight.

Groep:  Jeffrey  - 500889236
        Romeo    - 
        marien   - 
        Alana    - 
        Annette  - 500890018
        Avi      - 500888767

Instructions: 
...

install node from browser..

Start server -> npm run devStart
install nodemon -> npm i nodemon
Link landingpage -> localhost:3000/src/earth-page/earth.html

configure DB connectie: 
        db_config.js -> set username, password
        create DB named -> EYF
# keep in mind -> db_config.js wordt niet meegenomen naar de repo
# Mocht je een authenticatie foutmeling krijgen deze line in je db uitvoeren ->
#       use mysql;
#       update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';