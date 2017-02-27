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
 * /sprint
 * GET: Gets the information for a given sprint
 * POST: Creates a new sprint with the given information
 */
router.route('/sprint')
  .get(function(req, res){
    const name = req.query.name;

    r.table('sprints').filter({name}).pluck('name', 'start', 'end').run()
    .then(result => {
      if(result.length > 0)
        res.json(result);
      else
        res.status(400).send('Can\'t find that sprint!')
    })
    .catch(err => res.status(500).send(err));
  })

  .post(function(req, res){
    const start = moment(req.body.start);
    const end = moment(req.body.end);

    if(start.isValid() && end.isValid()){
      if(end.isAfter(start)){
        r.table('sprints').insert(req.body).run()
          .then(_ => res.status(200).end())
          .catch(err => res.status(500).send(err));
      }
      else{
        res.status(400).send('End date must be after start date');
      }
    }
    else res.status(400).send('Invalid date');
  });

/*
 * /comments
 * GET: Gets all the comments for a given sprints
 * POST: Adds comments to the given sprint
 */
 router.route('/comments')
   .get(function(req, res){
     const name = req.query.name;

     r.table('comments').filter({name}).pluck('name', 'comments', 'user').run()
     .then(result => res.json(result))
     .catch(err => res.status(500).send(err));
   })

   .post(function(req, res){
     const user = req.body.user;
     const types = req.body.types;
     const time = moment();

     for(let type of types){
       type.sprint = req.body.sprint;
       type.user = user;
     }
     r.table('comments').insert(types).run()
      .then(_ => res.status(200).end())
      .catch(err => res.status(500).send(err));
   });

module.exports = router;
