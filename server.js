// Require the following npm packages inside of the server.js file:
//    * express

// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'));
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var port = 3306;
app.listen(port);

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tuckerbug',
    database: 'burgers_db'
});

connection.connect(function(error){
    if(error)throw error;
    console.log('Connected as id: '+connection.threadId);
})

app.get('/',function(req,res){
    connection.query('SELECT * FROM burger_name',function(err,data){
        res.render('index',{burger_name:data});
    })
})

app.post('/create', function(req,res){
    connection.query('INSERT INTO burgers (burger_name) VALUES (?);', [req.body.burger_name
    ], function(error,res) {
        if(error)throw error;
        res.redirect('/');
    })
})

app.post('/eat/:id', function(req, res) {
    connection.query('UPDATE burgers SET devoured = ? Where id = ?;', [req.body.burger_name, req.body.id],
     function(error,res){
         if (error)throw errror;
         res.redirect('/');
     })
})



