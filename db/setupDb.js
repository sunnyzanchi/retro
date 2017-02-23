const r = require('rethinkdbdash');
const server = require('../db.json');

// Set up db
r.dbCreate('retro').run()
  .then(_ => r.db('retro').tableCreate('sprints').run())
  .then(_ => r.table('sprints').indexCreate('end').run())
    .then(result => console.log(result))
    .catch(err => console.log(err));
