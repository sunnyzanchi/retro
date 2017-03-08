const server = require('../db.json');
const r = require('rethinkdbdash')(server);

r.dbDrop('retro').run()
.then(result => console.log(result))
// This lets the script exit after the db has been dropped
.then(_ => r.getPoolMaster().drain());
