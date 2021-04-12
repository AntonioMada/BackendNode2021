// Assignment est le "modèle mongoose", il est connecté à la base de données
let Matiere = require("../model/matiere");
let Assignment = require("../model/assignment");
let MatiereView = require("../model/matiereview");


// Récupérer tous les matieres (GET), AVEC PAGINATION
function getMatieres(req, res) {
  
    Matiere.find(
    (err, matieres) => {
      if (err) {
        res.send(err);
      }
      res.send(matieres);
    }
  );
}

// Récupérer un assignment par son id (GET)
function getMatiere(req, res) {
  let matiereId = req.params.id;

  Matiere.findOne({ id: matiereId }, (err, matiere) => {
    if (err) {
      res.send(err);
    }
    res.json(matiere);
  });
}
module.exports = {
  getMatieres,
  getMatiere
  
};
