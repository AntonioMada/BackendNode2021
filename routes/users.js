// Assignment est le "modèle mongoose", il est connecté à la base de données
let User = require("../model/user");

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
        console.log("tsy mety a")
      }else{
        console.log("mety a")
        console.log(user);
        res.send(user);
        }
    });
}
function Checklogin(name,password) {
  
    User.findOne({ name:name , password:password }, (err, user) => {
      if (user == null) {
       console.log("login incorrect");
      }
      else{
        console.log(user);}
    });
}
module.exports = {
    getUsers,
    login,
    Checklogin
};
