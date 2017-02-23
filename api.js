const express = require('express');
const router = express.Router();
const moment = require('moment');

const server = require('./db.json');
const r = require('rethinkdbdash')(server);

/* Gets a list of all sprints */
router.get('/sprints', function(req, res){
  r.table('sprints').pluck('name', 'start', 'end').run()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
});

/*
 * GET: Gets the information for a given sprint
 * POST: Creates a new sprint with the given information
 */
router.route('/sprint')
.get(function(req, res){
  const name = req.query.name;

  r.table('sprints').filter({name}).run()
  .then(result => {
    if(result.length > 0)
      res.json(result);
    else
      res.status(400).send('Can\'t find that sprint!')
  })
  .catch(err => res.status(500).send(err));
})
.post(function(req, res){
  if(moment(req.body.start).isValid() && moment(req.body.end).isValid()){
    r.table('sprints').insert(req.body).run()
      .then(_ => res.status(200).end());
  }
  else res.status(400).send('Invalid date!');
});

module.exports = router;
