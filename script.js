const ramos = {
  "Bases Morfológicas I": [],
  "Biología Molecular I": [],
  "Electivo (1)": [],
  "Bases conceptuales de la Enfermería": [],
  "GIS I": [],
  "Bases Morfológicas II": ["Bases Morfológicas I"],
  "Biología Molecular II": ["Biología Molecular I"],
  "Fundamentos Biológicos I": [],
  "Enfermería en el proceso y crecimiento del niño y adolescente": ["Bases conceptuales de la Enfermería"],
  "GIS II": ["GIS I"],
  "Fundamentos Biológicos II": ["Fundamentos Biológicos I"],
  "Electivo (2)": [],
  "Enfermería en el proceso y crecimiento del adulto": ["Enfermería en el proceso y crecimiento del niño y adolescente"],
  "GIS III": ["GIS II"],
  "Fundamentos Biológicos III": ["Fundamentos Biológicos II"],
  "Enfermería Básica": ["Enfermería en el proceso y crecimiento del adulto"],
  "GIS IV": ["GIS III"],
  "Enfermería en el adulto I": ["Fundamentos Biológicos III", "Enfermería Básica"],
  "Gestión en enfermería I": ["GIS IV"],
  "Enfermería en el adulto II": ["Enfermería en el adulto I"],
  "Gestión en enfermería II": ["Gestión en enfermería I"],
  "Enfermería materno infantil y adolescente I": ["Enfermería en el adulto II"],
  "Diseño de investigación en enfermería I": ["Gestión en enfermería II"],
  "Enfermería materno infantil y adolescente II": ["Enfermería materno infantil y adolescente I"],
  "Enfermería en emergencias médico quirúrgicas": ["Enfermería materno infantil y adolescente I"],
  "Diseño de investigación en enfermería II": ["Diseño de investigación en enfermería I"]
};

const semestres = {
  1: ["Bases Morfológicas I", "Biología Molecular I", "Electivo (1)", "Bases conceptuales de la Enfermería", "GIS I"],
  2: ["Bases Morfológicas II", "Biología Molecular II", "Fundamentos Biológicos I", "Enfermería en el proceso y crecimiento del niño y adolescente", "GIS II"],
  3: ["Fundamentos Biológicos II", "Electivo (2)", "Enfermería en el proceso y crecimiento del adulto", "GIS III"],
  4: ["Fundamentos Biológicos III", "Enfermería Básica", "GIS IV"],
  5: ["Enfermería en el adulto I", "Gestión en enfermería I"],
  6: ["Enfermería en el adulto II", "Gestión en enfermería II"],
  7: ["Enfermería materno infantil y adolescente I", "Diseño de investigación en enfermería I"],
  8: ["Enfermería materno infantil y adolescente II", "Enfermería en emergencias médico quirúrgicas", "Diseño de investigación en enfermería II"]
};

const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

function estaDisponible(ramo) {
  const requisitos = ramos[ramo] || [];
  return requisitos.every(req => estado[req]);
}

function renderMalla() {
  const mallaDiv = document.getElementById("malla");
  mallaDiv.innerHTML = "";

  for (let [num, listaRamos] of Object.entries(semestres)) {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = `<h2>Semestre ${num}</h2>`;

    listaRamos.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo;

      if (estado[ramo]) {
        div.classList.add("aprobado");
      } else if (!estaDisponible(ramo)) {
        div.classList.add("locked");
      }

      div.addEventListener("click", () => {
        if (!div.classList.contains("locked")) {
          estado[ramo] = !estado[ramo];
          guardarEstado();
          renderMalla();
        }
      });

      semestreDiv.appendChild(div);
    });

    mallaDiv.appendChild(semestreDiv);
  }
}

renderMalla();
