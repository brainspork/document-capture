const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/document-capture'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/document-capture/index.html'));});
app.listen(process.env.PORT || 8080);