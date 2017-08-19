var express = require('express');
var router = express.Router();
var Todo = require('../todos/models');

router.route('/')
  .get(function (req, res) {
    Todo.find(function (err, todos) {
      if (err) {
        res.send(err);
      }
      res.json(todos);
    })
  })

  .post(function (req, res) {
    if (req.body.task == '') {
      res.status(400);
      return false;
    }

    var todo = new Todo({ task: req.body.task });

    todo.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.status(201).json({ message: 'created' });
    });
  });

router.route('/:id')
    .patch(function (req, res) {
      Todo.update({_id: req.params.id}, {done: req.body.done}, function (err, raw) {
        if (err) {
          res.send(err);
        }

        res.status(200).json({ message: 'updated ' + raw.nModified + ' row(s)' });
      })

  })
  .delete(function (req, res) {
      Todo.findByIdAndRemove({_id: req.params.id}, {}, function (err, raw) {
        if (err) {
          res.send(err);
        }
        res.status(200).json({ message: 'removed ' + raw.nModified + ' row(s)' });
      })
  })

module.exports = router;
