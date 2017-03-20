const express = require('express');
const router = express.Router();
const moment = require('moment');

const server = require('./db.json');
const r = require('rethinkdbdash')(server);

/* Gets a list of all sprints */
router.get('/sprints', async function(req, res){
  const sprints = await r.table('sprints')
                          .orderBy({index: 'end'})
                          .pluck('name', 'start', 'end')
                          .run();
  return res.json(sprints);
});

/*
 * /sprints/:name
 * GET: Gets the information for a given sprint
 * PUT: Creates a new sprint with the given information
 */
router.route('/sprints/:name')
  .get(async function(req, res){
    const name = req.params.name;

    const pMeta = r.table('sprints')
                    .filter({name})
                    .pluck('name', 'start', 'end')
                    .run();

    const pComments = r.table('comments')
                        .filter({name})
                        .pluck('comment', 'type')
                        .run();

    const [meta, comments] = await Promise.all([pMeta, pComments]);
    if(meta.length === 0)
      return res.status(404).send('Can\'t find that sprint');

    return res.json({meta: meta[0], comments});
  })

  .put(async function(req, res){
    const start = moment(req.body.start);
    const end = moment(req.body.end);

    if(!start.isValid() || !end.isValid()) return res.status(400).send('Invalid date');
    if(!end.isAfter(start)) return res.status(400).send('End date must be after start date');

    let data = {
      start: start.toDate(),
      end: end.toDate(),
      name: req.params.name
    };

    await r.table('sprints')
            .insert(data, {conflict: 'error'})
            .run();

    return res.status(201).end();
  });

/*
 * /sprints/:name/comments
 * GET: Gets all the comments for a given sprints
 * POST: Adds comments to the given sprint
 */
router.route('/sprints/:name/comments')
  .get(async function(req, res){
     const name = req.params.name;

     const comments = await r.table('comments')
                              .filter({name})
                              .pluck('name', 'comment', 'user')
                              .run()

    return res.json(comments);
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

    await r.table('comments')
            .insert(comments)
            .run();

    return res.status(201).end();
  });

module.exports = router;
