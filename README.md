# project Enjoy Your Flight
### HBO-ICT deeltijd eerstejaars CS + SE

Project: Enjoy your flight.

Groep:  Jeffrey  - 500889236
        Annette  - 500890018
        Avi      - 500888767

Instructions: 
...

install node from browser..
install nodemon -> npm i nodemon

Start server -> npm run devStart

Link landingpage -> localhost:3000/earth

configure DB connectie: 
        db_config.js -> set username, password
        create DB named -> EYF
# keep in mind -> db_config.js wordt niet meegenomen naar de repo
# Mocht je een authenticatie foutmelding krijgen deze line in je db uitvoeren ->
#       use mysql;
#       update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';