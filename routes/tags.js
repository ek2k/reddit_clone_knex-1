const express = require("express")
const router = express.Router();
const knex = require("../db/knex")

router.get('/', (req,res) => {
  knex('tags').then((tags) =>{
    res.render("tags/index", {tags})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/new', (req,res) => {
  res.render("tags/new")
})

router.get('/:id', (req,res) => {
  knex('tags').where({id: req.params.id}).first().then((tag) =>{
    res.render("tags/show", {tag})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.get('/:id/edit', (req,res) => {
  knex('tags').where({id: req.params.id}).first().then((tag) =>{
    res.render("tags/edit", {tag})
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.post('/', (req,res) => {
  // UPDATE POST_TAGS TABLE
  knex('tags').insert(req.body.tag).then(() =>{
    res.redirect('/tags')
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.patch('/:id', (req,res) => {
  knex('tags').where({id:req.params.id}).update(req.body.tag).then(() =>{
    res.redirect('/tags')
  }).catch((err) =>{
    res.render("error", {err})
  });
});

router.delete('/:id', (req,res) => {
  knex('tags').where({id:req.params.id}).del().then(() =>{
    res.redirect('/tags')
  }).catch((err) =>{
    res.render("error", {err})
  });
});


module.exports = router;