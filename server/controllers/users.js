const User = require('../models/User')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const jwt = require('jsonwebtoken');

require('dotenv').config();
const keyz = process.env.KEY_SCRT;

function createUser(req,res){
  var hash = bcrypt.hashSync(req.body.password, salt);
   User.create({
     username   : req.body.username,
     email      : req.body.email,
     password   : hash
   }).then(dataUser => {
     res.send(dataUser)
   }).catch(error => {
     res.send(error)
   })
}

function getAllUser(req,res){
  User.find({}).then(dataUser=>{
    res.send(dataUser)
  }).catch(error=>{
    res.send(error)
  })
}

function getSingleUser(req,res){
  User.findById({'_id':req.params.id})
  .then(dataUser=>{
    res.send(dataUser)
  }).catch(error=>{
    res.send(error)
  })
}

function deleteUser(req,res){
  User.remove({"_id":req.params.id})
  .then(dataUser=>{
    res.send("terhapus")
  }).catch(error=>{
    res.send(error)
  })
}

function updateUser (req,res){
  let hash;
  if (req.body.password) {
    hash = bcrypt.hashSync(req.body.password, 8);
  }
  User.find({_id:req.params.id})
  .then(dataUser => {
    if (!hash) {
      hash = dataUser[0].password
    } User.update({_id: dataUser[0]}, {
      $set: {
        username: req.body.username || dataUser[0].username,
        email: req.body.email || dataUser[0].email,
        password: req.body.password || dataUser[0].password,
        updated_at: new Date()
      }
    }).then(dataUpdate => {
      res.send(dataUpdate)
    }).catch(err=>{
      res.send(err)
    })
  }).catch(err => {
    res.send(err)
  })
}

function signin(req, res) {
  User.findOne({email:req.body.email}).then(dataUser => {
    console.log('==>>',dataUser);
        if (bcrypt.compareSync(req.body.password, dataUser.password)) {
           let token = jwt.sign({email: dataUser.email, userid: dataUser._id}, keyz, {expiresIn:'1h'})
           console.log('success');
           res.send({user_id: dataUser._id, user_name: dataUser.name, token: token})
      } else {
        console.log('failed');
        res.send('wrong password')
      }
  }).catch(error => {
    res.send(error)
    console.log('====>>error');
  })
}

module.exports = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  signin
}
