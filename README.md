# Burger


### Overview
An app that allows users to input the name of a burger they would like to eat and then devour it! Uses Node, Express, Handlebars, and MySql.


### How it Works
Uses 3 basic CRUD functions:
  1. READ all entries from the MySQL database and display them to the DOM using Handlebars.
  2. UPDATE a selected burger by clicking "Eat It", which...
    * hits an `/burger/eat/:id` route in Express to change its "devoured" status in the MySQL database
    * re-routes the webpage back to the index, where the burger is now in the devoured column (via Handlebars)
  3. CREATE a new burger using the "Place Order" form, which...
    * hits a `/burger/create` route in Express to insert a new burger into the MySQL database
    * re-routes the webpage back to the index, where the burger is now ready to be eaten column (via Handlebars)
