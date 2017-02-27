const server = require('../db.json');
const r = require('rethinkdbdash')(server);

// Set up db
var created = r.dbCreate('retro').run();

/* Create sprints table */
created.then(_ => r.db('retro').tableCreate('sprints', {primaryKey: 'name'}).run())
  .then(_ => r.table('sprints').indexCreate('end').run())
  .then(result => console.log(result))
  .catch(err => console.log(err));

/* Create comments table */
created.then(_ => r.db('retro').tableCreate('comments').run())
  .then(_ => r.table('comments').indexCreate('sprint').run())
  .then(result => console.log(result))
  .catch(err => console.log(err));
