const r = require('rethinkdb');
const server = require('../db.json');

r.connect(server)
.then(conn => r.dbDrop('retro').run(conn))
.then(result => console.log(result));
