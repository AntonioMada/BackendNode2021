// Assignment est le "modèle mongoose", il est connecté à la base de données
let Assignment = require("../model/assignment");
const {ObjectId} = require('mongodb');

let MatiereView = require("../model/matiereview");
let Matiere = require("../model/matiere");
const { Int32 } = require("bson");
const matiere = require("../model/matiere");
/* Version sans pagination */
// Récupérer tous les assignments (GET)
/*
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/
async function getAssignmentsMatiere(req, res) {
  try{
    let tab = [];
    const assignments = await Assignment.find();
    for(let i=0; i < assignments.length; i++){
        const element = assignments[i];
        const matiere = await Matiere.findOne({ id: element.id_matiere});
        tab.push(new MatiereView(element.id,element.dateDeRendu,element.nom,element.rendu,element.auteur,element.id_matiere,matiere.nom,matiere.nom_prof,matiere.Image,element.note,element.remarques));
    }
    console.log(tab.length);
    res.json(tab);
  }
  catch (e) {
    console.log(e);
    res.status(500);
    res.json(e);
  }
}

// Récupérer tous les assignments (GET), AVEC PAGINATION
function getAssignments(req, res) {
  var aggregateQuery = Assignment.aggregate();
  
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}
function getAssignmentsRendu(req, res) {
  var aggregateQuery = Assignment.aggregate(([
    {$match:{rendu:true}},
    { $lookup: {from: "matieres", localField: "id_matiere", foreignField: "id", as: "matiere"} }
  ]));
  
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

function getAssignmentsNonRendu(req, res) {
  var aggregateQuery = Assignment.aggregate(([
    {$match:{rendu:false}},
    { $lookup: {from: "matieres", localField: "id_matiere", foreignField: "id", as: "matiere"} }
  ]));
  
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}
// Récupérer un assignment par son id (GET)
// function getAssignment(req, res) {
//   let assignmentId = req.params.id;

//   Assignment.findOne({ id: assignmentId }, (err, assignment) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(assignment);
//   });
// }

function getAssignment(req, res) {
  var assignmentId = Number(req.params.id);
  console.log("Id de l'assignment :"+assignmentId);
  
  Assignment.aggregate(
    [
      { $match:
        {
          id : assignmentId
        } 
      },{ $lookup: {from: "matieres", localField: "id_matiere", foreignField: "id", as: "matiere"} },
      {$limit :1}
    ],
    (err, assignment) => {
      if (err) {
        res.send(err);
      }
      res.send(assignment[0]);
    }
  );
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.id_matiere = req.body.id_matiere;
  assignment.nom = req.body.nom;
  assignment.auteur = req.body.auteur;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;
  assignment.note = req.body.note;
  assignment.remarques = req.body.remarques;
  assignment.matiere = ObjectId(req.body.matiere);

  console.log("POST assignment reçu :");
  console.log(assignment);
  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

//maj bdd
function populatedb(req, res) {
  console.log("populating db...");
  res.json({ message: "Database populated" });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsRendu,
  getAssignmentsNonRendu,getAssignmentsMatiere
};
