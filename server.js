var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var walks = require('./routes/walks');
var port = 3000;

var app = express();

var distDir = __dirname + "/dist/";
//View Engine: permet de configurer express
//ejs system template
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder: angular
app.use(express.static(distDir));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', walks);
app.get('/walk/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || port, function () {
    console.log("App now running on port", port);
});