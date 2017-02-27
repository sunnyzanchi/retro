const server = require('../db.json');
const r = require('rethinkdbdash')(server);

r.dbDrop('retro').run()
.then(result => console.log(result));
