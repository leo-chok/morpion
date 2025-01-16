// Variable pour garder trace du tour actuel
let tour = "joueur";
let scoreJoueur = 0;
let scoreOrdi = 0;

function effacerMessage() {
  document.querySelector(".message").textContent = "";
}


function joueurAddScore (){
scoreJoueur += 1;
document.querySelector(".scoreJoueur").textContent = scoreJoueur;
}

function ordiAddScore (){
scoreOrdi += 1;
document.querySelector(".scoreOrdi").textContent = scoreOrdi;
}

// Fonction pour gérer les clics sur les cellules
function clicSurCellule(event) {
  // Vérifier si c'est le tour du joueur
  if (tour === "joueur") {
    // Récupérer la cellule cliquée
    let cellule = event.target;

    // Vérifier si la cellule est déjà occupée
    if (cellule.textContent === "") {
      // Mettre le symbole du joueur (X) dans la cellule
      cellule.textContent = "X";

      // Vérifier si le joueur a gagné
      if (verifierGagne("joueur")) {
        joueurAddScore();
        document.querySelector(".message").textContent = "Le joueur a gagné !";
        setTimeout(effacerMessage, 2000);
        setTimeout(restart, 2000);
      } else {
        if (verifierNul()) {
          document.querySelector(".message").textContent =
            "Personne ne gagne !";
          setTimeout(effacerMessage, 2000);
          setTimeout(restart, 2000);
        } else {
          // Changer le tour à l'ordinateur
          tour = "ordinateur";
          let reflexionTime =
            Math.floor(Math.random() * (2000 - 200 + 1)) + 200;
          setTimeout(tourOrdi, reflexionTime);
        }
      }
    }
  }
}

// Fonction pour le tour de l'ordinateur
function tourOrdi() {
  // Sélectionner une cellule libre au hasard
  let cellules = document.querySelectorAll(".cellule");
  let cellulesLibres = Array.from(cellules).filter(
    (cellule) => cellule.textContent === ""
  );
  let celluleAleatoire =
    cellulesLibres[Math.floor(Math.random() * cellulesLibres.length)];

  // Mettre le symbole de l'ordinateur (O) dans la cellule
  celluleAleatoire.textContent = "O";

  // Vérifier si l'ordinateur a gagné
  if (verifierGagne("ordinateur")) {
    ordiAddScore ();
    document.querySelector(".message").textContent = "L'ordinateur a gagné !";
    setTimeout(restart, 2000);
  } else {
    if (verifierNul()) {
      document.querySelector(".message").textContent = "Personne ne gagne !";
      setTimeout(effacerMessage, 2000);
      setTimeout(restart, 2000);
    } else {
      // Changer le tour à joueur
      tour = "joueur";
    }
  }
}

// Fonction pour vérifier si un joueur a gagné
function verifierGagne(joueur) {
  let cellules = document.querySelectorAll(".cellule");
  let symbole = joueur === "joueur" ? "X" : "O";

  // Vérifier les lignes
  for (let i = 0; i < 3; i++) {
    let ligne = [
      cellules[i * 3].textContent,
      cellules[i * 3 + 1].textContent,
      cellules[i * 3 + 2].textContent,
    ];
    if (ligne.every((cellule) => cellule === symbole)) {
      return true;
    }
  }

  // Vérifier les colonnes
  for (let i = 0; i < 3; i++) {
    let colonne = [
      cellules[i].textContent,
      cellules[i + 3].textContent,
      cellules[i + 6].textContent,
    ];
    if (colonne.every((cellule) => cellule === symbole)) {
      return true;
    }
  }

  // Vérifier les diagonales
  let diagonale1 = [
    cellules[0].textContent,
    cellules[4].textContent,
    cellules[8].textContent,
  ];
  let diagonale2 = [
    cellules[2].textContent,
    cellules[4].textContent,
    cellules[6].textContent,
  ];
  if (
    diagonale1.every((cellule) => cellule === symbole) ||
    diagonale2.every((cellule) => cellule === symbole)
  ) {
    return true;
  }

  return false;
}

// Fonction pour vérifier si c'est une partie nulle
function verifierNul() {
  let cellules = document.querySelectorAll(".cellule");
  let cellulesRemplies = Array.from(cellules).every(
    (cellule) => cellule.textContent !== ""
  );
  return cellulesRemplies;
}

// Fonction pour redémarrer le jeu
function restart() {
  let cellules = document.querySelectorAll(".cellule");
  cellules.forEach((cellule) => (cellule.textContent = ""));
  tour = "joueur";
}

// Ajouter un événement de clic sur les cellules
document
  .querySelectorAll(".cellule")
  .forEach((cellule) => cellule.addEventListener("click", clicSurCellule));
