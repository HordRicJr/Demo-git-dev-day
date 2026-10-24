const questions = [
  {
    question: "Quelle planète est surnommée la planète rouge ?",
    answers: ["Vénus", "Mars", "Jupiter", "Mercure"],
    correct: 1,
    explanation: "Mars doit sa couleur rouge à l'oxyde de fer présent à sa surface.",
  },
  {
    question: "Combien de planètes compte notre système solaire ?",
    answers: ["7 planètes", "8 planètes", "9 planètes", "10 planètes"],
    correct: 1,
    explanation: "Notre système solaire compte huit planètes depuis le reclassement de Pluton en planète naine.",
  },
  {
    question: "Quelle est l'étoile la plus proche de la Terre ?",
    answers: ["Sirius", "Proxima du Centaure", "Le Soleil", "Véga"],
    correct: 2,
    explanation: "Le Soleil est bien une étoile, et la plus proche de notre planète.",
  },
  {
    question: "Quel est le plus grand océan de la Terre ?",
    answers: ["L'océan Atlantique", "L'océan Indien", "L'océan Arctique", "L'océan Pacifique"],
    correct: 3,
    explanation: "L'océan Pacifique couvre à lui seul près d'un tiers de la surface de la Terre.",
  },
  {
    question: "Quelle planète est célèbre pour ses magnifiques anneaux ?",
    answers: ["Saturne", "Neptune", "Mars", "Vénus"],
    correct: 0,
    explanation: "Saturne possède un vaste système d'anneaux composé surtout de glace et de roches.",
  },
  {
    question: "Comment s'appelle la galaxie où se trouve notre système solaire ?",
    answers: ["Andromède", "La Voie lactée", "Le Grand Nuage", "Orion"],
    correct: 1,
    explanation: "Notre système solaire se trouve dans la Voie lactée, une galaxie spirale.",
  },
  {
    question: "Quel astronaute a été le premier humain à marcher sur la Lune ?",
    answers: ["Youri Gagarine", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"],
    correct: 2,
    explanation: "Neil Armstrong a posé le premier le pied sur la Lune, le 21 juillet 1969 (UTC).",
  },
  {
    question: "Quelle planète est la plus grande de notre système solaire ?",
    answers: ["Saturne", "Jupiter", "Neptune", "La Terre"],
    correct: 1,
    explanation: "Jupiter est la géante gazeuse et la plus grande planète du système solaire.",
  },
];

const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const questionCount = document.querySelector("#question-count");
const questionKicker = document.querySelector("#question-kicker");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const scoreElement = document.querySelector("#score");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const nextButton = document.querySelector("#next-button");
const nextLabel = document.querySelector("#next-label");

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[currentQuestion];
  const displayNumber = String(currentQuestion + 1).padStart(2, "0");

  questionCount.innerHTML = `${displayNumber} <span>/ ${String(questions.length).padStart(2, "0")}</span>`;
  questionKicker.textContent = `QUESTION ${displayNumber}`;
  questionText.textContent = question.question;
  feedback.textContent = "";
  nextButton.disabled = true;
  nextLabel.textContent =
    currentQuestion === questions.length - 1 ? "VOIR MON RÉSULTAT" : "QUESTION SUIVANTE";
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion));
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  answersContainer.replaceChildren();

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    const letter = document.createElement("span");
    button.type = "button";
    button.className = "answer-button";
    button.setAttribute("aria-label", `${String.fromCharCode(65 + index)}. ${answer}`);
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);
    button.append(letter, document.createTextNode(answer));
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.append(button);
  });

  answered = false;
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const question = questions[currentQuestion];
  const answerButtons = [...answersContainer.querySelectorAll("button")];
  const isCorrect = selectedIndex === question.correct;

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add("correct");
  });

  if (isCorrect) {
    score += 1;
    scoreElement.textContent = String(score);
    feedback.textContent = `Bonne réponse ! ${question.explanation}`;
  } else {
    answerButtons[selectedIndex].classList.add("incorrect");
    feedback.textContent = `Pas tout à fait. ${question.explanation}`;
  }

  nextButton.disabled = false;
  nextButton.focus();
}

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  progressTrack.setAttribute("aria-valuenow", String(questions.length));
  progressFill.style.width = "100%";
  document.querySelector("#final-score").textContent = String(score);

  let title;
  let message;
  if (score === questions.length) {
    title = "Un vrai génie cosmique !";
    message = "Sans faute ! L'univers n'a plus aucun secret pour toi.";
  } else if (score >= 5) {
    title = "Bravo, cosmonaute !";
    message = "Tu connais déjà très bien l'espace. Encore quelques découvertes et tu seras astronaute !";
  } else if (score >= 3) {
    title = "Belle exploration !";
    message = "Tu as de bonnes bases. L'univers a encore plein de merveilles à te faire découvrir.";
  } else {
    title = "Prêt·e pour le décollage ?";
    message = "Chaque mission est l'occasion d'apprendre. Repars explorer les étoiles !";
  }

  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-message").textContent = message;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    showResults();
    return;
  }
  renderQuestion();
  answersContainer.querySelector("button")?.focus();
});

document.querySelector("#restart-button").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreElement.textContent = "0";
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  renderQuestion();
  answersContainer.querySelector("button")?.focus();
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
renderQuestion();
