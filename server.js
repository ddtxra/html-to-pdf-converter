'use strict';

const fs = require('fs');
const request = require('request');
const express = require('express');
var path = require('path');

var render_url =  "http://renderer:3000/convert/url"

// Constants
const PORT = 8855;
const HOST = '0.0.0.0';

// App
const app = express();

function setDefaultValueForParams(query) {
  if(!query.paperWidth) query.paperWidth = '13.33'
  if(!query.paperHeight) query.paperHeight = '16'
  if(!query.paperWidth) query.paperWidth = '13.33'
  if(!query.marginTop) query.marginTop = '0'
  if(!query.marginBottom) query.marginBottom = '0'
  if(!query.marginLeft) query.marginLeft = '0'
  if(!query.marginRight) query.marginRight = '0'
  if(!query.waitTimeout) query.waitTimeout = '30'
  return query;
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/pdf', (req, res) => {
  //res.setHeader('Content-disposition', 'inline; filename="print.pdf"');
  res.setHeader('Content-type', 'application/pdf');
  var params = setDefaultValueForParams(req.query);
  console.log("Calling rendering url with " + JSON.stringify(params));
  request.post({url:render_url, formData: params}).pipe(res)
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

