// Assignment est le "modèle mongoose", il est connecté à la base de données
let User = require("../model/user");

const jwt = require('jsonwebtoken');
const {secret} = require('../config.json');

/* Version sans pagination */
// Récupérer tous les assignments (GET)

function getUsers(req, res){
    User.find((err, users) => {
        if(err){
            res.send(err)
        }

        res.send(user);
    });
}
function login(req, res) {
    let name = req.body.name;
    let password = req.body.password;
    console.log(name)
    console.log(password)
    User.findOne({ name:name , password:password }, (err, user) => {
      if (err) {
            res.send(err);
      }
      if (user == null) {
          res.status(203).send("There was a problem registering the user.")
      }else{
        console.log(user);
        
        let token = jwt.sign({user}, secret, { expiresIn: '2000s'})
       
        res.status(200).json({"token": token});
        }
    });
}
function Checklogin(req, res) {
  
    console.log('token');
    let token = req.body.token;
    console.log(token);
    if (!token) return res.status(203).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secret, function(err, decoded) {
        if (err) return res.status(203).send({ auth: false, message: 'Failed to authenticate token.'});

        User.findOne({ id:decoded.user.id }, (err, user) => {
            
            if (err) return res.status(203).send("There was a problem finding the user.");

            if (user == null) {
                res.status(203).send(user);
            }
              res.status(200).send(user);
          });
      });

  
}
module.exports = {
    getUsers,
    login,
    Checklogin
};
