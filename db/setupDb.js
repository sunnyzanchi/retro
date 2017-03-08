const server = require('../db.json');
const r = require('rethinkdbdash')(server);

// Set up db
const created = r.dbCreate('retro').run();

/* Create sprints table */
const sprints = created.then(_ => r.db('retro').tableCreate('sprints', {primaryKey: 'name'}).run())
  .then(_ => r.table('sprints').indexCreate('end').run())
  .then(result => console.log(result))
  .catch(err => console.log(err));

/* Create comments table */
const comments = created.then(_ => r.db('retro').tableCreate('comments').run())
  .then(_ => r.table('comments').indexCreate('sprint').run())
  .then(result => console.log(result))
  .catch(err => console.log(err));

// This lets the script exit after the tables have been created
Promise.all([sprints, comments])
.then(_ => r.getPoolMaster().drain());
