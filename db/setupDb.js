const server = require('../db.json');
const r = require('rethinkdbdash')(server);

// Set up db
var db = r.dbCreate('retro').run();

db.then(_ => r.db('retro').tableCreate('sprints').run())
  .then(_ => r.table('sprints').indexCreate('end').run())
    .then(result => console.log(result))
    .catch(err => console.log(err));

db.then(_ => r.db('retro').tableCreate('comments').run())
  .then(_ => r.table('comments').indexCreate('sprint').run())
  .then(result => console.log(result))
  .catch(err => console.log(err));
