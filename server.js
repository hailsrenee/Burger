
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
var port = 3000;
app.listen(port);

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'tuckerbug',
    database: 'burgers_db'
});

connection.connect(function(error){
    if(error)throw error;
    console.log('Connected as id: '+connection.threadId);
})

app.get('/',function(req,res){
    connection.query('SELECT * FROM burgers',function(err,data){
        res.render('index',{burgers:data});
    })
})

app.post('/burger/create', function(req,res){
    connection.query('INSERT INTO burgers (burger_name) VALUES (?);', [req.body.burger_name
    ], function(error,result) {
        if(error)throw error;
        res.redirect('/');
    })
})

app.post('/burger/eat/:id', function(req, res) {
    connection.query('UPDATE burgers SET devoured = ? Where id = ?;', [true, req.body.id],
     function(error,result){
         if (error)throw errror;
         res.redirect('/');
     })
})



