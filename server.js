const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/WebshopIPWRCFrontend'));
app.get('/*',function (req,res) {
  res.sendfile(path.join(__dirname+'/dist/WebshopIPWRCFrontend/index.html'));
});
app.listen(process.env.PORT || 8080);

console.log('server started on port', process.env.PORT || 8080)

console.log("hallo server");
