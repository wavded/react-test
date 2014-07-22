var flo = require('fb-flo')
var fs = require('fs')
var path = require('path')

var server = flo(__dirname+'/public', {
  port: 8888
}, function (filepath, cb) {
  var data = fs.readFileSync(path.join(__dirname,'/public/',filepath)).toString()
  cb({
    resourceURL: path.basename(filepath),
    contents: data
  })
})

server.on('ready', function () {
  console.log('flo listening on port 8888')
})
