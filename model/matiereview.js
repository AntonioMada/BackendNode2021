class MatiereView {
    constructor(id,dateDeRendu, nom,rendu ,auteur ,id_matiere,nom_matiere,nom_prof,Image,note,remarques) {
      this.id = id;
      this.dateDeRendu = dateDeRendu;
      this.nom = nom;
      this.rendu = rendu;
      this.auteur = auteur;
      this.id_matiere = id_matiere;
      this.nom_matiere = nom_matiere;
      this.nom_prof = nom_prof;
      this.Image = Image;
      this.remarques = remarques;
      this.note = note;
    }
  }
  module.exports = MatiereView
