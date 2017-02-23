const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/sprint/:sprintName', sendIndex);
router.get('/create', sendIndex);


function sendIndex(req, res){
  const options = {
    root: path.join(__dirname , '/public')
  }

  res.sendFile('index.html', options, function(err){
    if(err) console.log(err);
  });
}
module.exports = router;
