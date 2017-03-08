const express = require('express');
const router = express.Router();
const moment = require('moment');

const server = require('./db.json');
const r = require('rethinkdbdash')(server);

/* Gets a list of all sprints */
router.get('/sprints', function(req, res){
  r.table('sprints')
    .orderBy({index: 'end'})
    .pluck('name', 'start', 'end')
    .run()
  .then(result => res.json(result))
  .catch(err => res.status(500).send(err));
});

/*
 * /sprints/:name
 * GET: Gets the information for a given sprint
 * PUT: Creates a new sprint with the given information
 */
router.route('/sprints/:name')
  .get(function(req, res){
    const name = req.params.name;

    const meta = r.table('sprints')
      .filter({name})
      .pluck('name', 'start', 'end')
      .run();

    const comments = r.table('comments')
      .filter({sprint: name})
      .pluck('comment', 'type')
      .run();

    Promise.all([meta, comments])
    .then(function(values){
      const [meta, comments] = values;

      if(meta.length === 0) return res.status(404).send('Can\'t find that sprint');

      return res.json({meta: meta[0], comments});
    })
    .catch(err => res.status(500).send(err));
  })

  .put(function(req, res){
    const start = moment(req.body.start);
    const end = moment(req.body.end);

    if(!start.isValid() || !end.isValid()) return res.status(400).send('Invalid date');
    if(!end.isAfter(start)) return res.status(400).send('End date must be after start date');
    let data = {
      start: start.toDate(),
      end: end.toDate(),
      name: req.params.name
    };
    r.table('sprints').insert(data, {conflict: 'error'}).run()
      .then(_ => res.status(201).end())
      .catch(err => res.status(500).send(err));
  });

/*
 * /sprints/:name/comments
 * GET: Gets all the comments for a given sprints
 * POST: Adds comments to the given sprint
 */
router.route('/sprints/:name/comments')
  .get(function(req, res){
     const name = req.params.name;

     r.table('comments').filter({name}).pluck('name', 'comments', 'user').run()
     .then(result => res.json(result))
     .catch(err => res.status(500).send(err));
   })

  .post(async function(req, res){
    const name = req.params.name;

    const [{end}] = await r.table('sprints')
      .filter({name})
      .pluck('end')
      .run();

    if(moment(end).diff(moment(), 'days') < -7)
      return res.status(403).send('Cannot add comments more than a week after sprint has ended!');

    const comments = req.body;

    const time = new Date;
    for(let comment of comments){
      comment.time = time;
      comment.name = name;
    }

    r.table('comments').insert(comments).run()
      .then(_ => res.status(201).end())
      .catch(err => res.status(500).send(err));
  });

module.exports = router;
