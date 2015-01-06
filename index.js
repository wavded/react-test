require('./flo')

var mach = require('mach')
var app = mach.file({ root: './public', index: true })
mach.serve(app, 3000);