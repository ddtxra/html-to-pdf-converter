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

function getOptions(params, url) {
    var options = {}
    options.remoteURL = url;
    if (!params.paperWidth) options.paperWidth = '13.33'; else options.paperWidth = params.paperWidth;
    if (!params.paperHeight) options.paperHeight = '16';  else options.paperHeight = params.paperHeight;
    if (!params.paperWidth) options.paperWidth = '13.33'; else options.paperWidth = params.paperWidth;
    if (!params.marginTop) options.marginTop = '0'; else options.marginTop = params.marginTop;
    if (!params.marginBottom) options.marginBottom = '0'; else options.marginBottom = params.marginBottom;
    if (!params.marginLeft) options.marginLeft = '0'; else options.marginLeft = params.marginLeft;
    if (!params.marginRight) options.marginRight = '0'; else options.marginRight = params.marginRight;
    if (!params.waitTimeout) options.waitTimeout = '30'; else options.waitTimeout = params.waitTimeout;

    return options;
}
  
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


var path = "/pdf/";
app.get(path + '**', (req, res) => {
    //res.setHeader('Content-disposition', 'inline; filename="print.pdf"');
    res.setHeader('Content-type', 'application/pdf');
    var url = req.originalUrl.substr(path.length);
    var params = getOptions(req.query, url);
    console.log("Calling rendering url with " + JSON.stringify(params));
    var filename = __dirname + "/document.pdf";
    var stream = request.post({url:render_url, formData: params}).pipe(fs.createWriteStream(filename))
    stream.on('finish', () =>{
          fs.readFile(filename, function (err,data){
              if(req.query.forceDownload){
		var filenameForDownload = "document.pdf"
		if(req.query.filenameForDownload) {
			filenameForDownload = req.query.filenameForDownload;
		}
		res.setHeader('Content-disposition', 'attachment; filename=' + filenameForDownload);
                console.log("Sending data as download");
	      }else {
		res.contentType("application/pdf");
                console.log("Sending data in browser");
	      }
              res.send(data);
          })
    });
});
  
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

