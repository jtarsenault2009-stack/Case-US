// ==========================================
// CASE: US
// MAIN GAME SCRIPT
// ==========================================


// ==========================================
// CUSTOMIZE THESE
// ==========================================

// NAME REQUIRED TO ENTER
const correctName = "IZABELLA";


// MEMORY PUZZLE ORDER
// 1 = A
// 2 = B
// 3 = C
// 4 = D

const correctSequence = [1, 2, 3, 4];


// TERMINAL PASSWORD
const terminalPassword = "love";


// FINAL ANSWER
const finalAnswer = "love";


// ==========================================
// VARIABLES
// ==========================================

const screens = document.querySelectorAll(".screen");

let memorySequence = [];

let filesOpened = [];

let terminalFinished = false;


// ==========================================
// SCREEN SYSTEM
// ==========================================

function showScreen(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(id);

  if (!nextScreen) {
    return;
  }

  nextScreen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  glitchEffect();
}


// ==========================================
// GLITCH EFFECT
// ==========================================

function glitchEffect() {

  document.body.classList.add("glitch");

  setTimeout(() => {
    document.body.classList.remove("glitch");
  }, 250);
}


// ==========================================
// RED ERROR FLASH
// ==========================================

function errorFlash() {

  const flash = document.getElementById("flash");

  flash.classList.remove("active");

  void flash.offsetWidth;

  flash.classList.add("active");
}


// ==========================================
// INTRO
// ==========================================

function beginInvestigation() {

  showScreen("login");

}


// ==========================================
// IDENTITY
// ==========================================

function verifyName() {

  const input =
    document.getElementById("nameInput");

  const message =
    document.getElementById("nameMessage");

  const enteredName =
    input.value.trim().toLowerCase();

  if (enteredName === "") {

    message.textContent =
      "IDENTITY REQUIRED.";

    errorFlash();

    return;
  }


  if (
    enteredName ===
    correctName.toLowerCase()
  ) {

    message.textContent =
      "IDENTITY VERIFIED.";

    setTimeout(() => {

      showScreen("puzzle");

    }, 1000);

  } else {

    message.textContent =
      "IDENTITY NOT RECOGNIZED.";

    input.value = "";

    errorFlash();
  }
}


// ==========================================
// MEMORY PUZZLE
// ==========================================

function chooseMemory(number) {

  const message =
    document.getElementById("puzzleMessage");

  const progress =
    document.getElementById("puzzleProgress");


  const currentPosition =
    memorySequence.length;


  // WRONG ANSWER
  if (
    number !==
    correctSequence[currentPosition]
  ) {

    message.textContent =
      "INCORRECT. MEMORY SEQUENCE RESET.";

    progress.textContent = "";

    memorySequence = [];

    errorFlash();

    setTimeout(() => {

      message.textContent = "";

    }, 1200);

    return;
  }


  // CORRECT ANSWER

  memorySequence.push(number);


  progress.textContent =
    `SEQUENCE: ${memorySequence.length} / ${correctSequence.length}`;


  message.textContent =
    "MEMORY ACCEPTED.";


  // FINISHED

  if (
    memorySequence.length ===
    correctSequence.length
  ) {

    message.textContent =
      "SEQUENCE COMPLETE. ACCESS GRANTED.";

    setTimeout(() => {

      showScreen("evidence");

    }, 1200);
  }
}


// ==========================================
// EVIDENCE FILES
// ==========================================

function openFile(fileNumber) {

  const output =
    document.getElementById("fileOutput");


  const files = {

    "001":
`FILE_001

DATE: CLASSIFIED

STATUS: ARCHIVED

A beginning was recorded here.

The first clue is hidden
in what happened first.`,

    "002":
`FILE_002

TYPE: PHOTOGRAPH

STATUS: PROTECTED

A memory was recovered.

Some moments are worth
keeping forever.`,

    "003":
`FILE_003

SUBJECT: TWO PEOPLE

STATUS: ACTIVE

Two people.
One story.

The investigation continues.`,

    "004":
`FILE_004

SECURITY LEVEL: CLASSIFIED

STATUS: ACTIVE

You found the evidence.

But the most important clue
has not been unlocked yet.`

  };


  if (!files[fileNumber]) {

    output.textContent =
      "FILE CORRUPTED.";

    return;
  }


  output.textContent =
    files[fileNumber];


  if (!filesOpened.includes(fileNumber)) {

    filesOpened.push(fileNumber);

  }


  // Require all four files

  if (filesOpened.length === 4) {

    const terminalButton =
      document.getElementById("terminalButton");

    terminalButton.disabled = false;

    terminalButton.classList.remove(
      "lockedButton"
    );

    terminalButton.textContent =
      "ACCESS TERMINAL";
  }
}


// ==========================================
// TERMINAL ACCESS
// ==========================================

function goToTerminal() {

  if (filesOpened.length < 4) {

    return;
  }

  showScreen("terminal");

  startTerminal();

}


// ==========================================
// TERMINAL TYPING
// ==========================================

function startTerminal() {

  const terminal =
    document.getElementById("terminalText");

  const inputArea =
    document.getElementById("terminalInputArea");


  inputArea.classList.add("hidden");


  terminal.innerHTML = "";


  const lines = [

    "> INITIALIZING DATABASE...",
    "> CONNECTION ESTABLISHED.",
    "> SECURITY LEVEL: CLASSIFIED",
    "> FILES FOUND: 006",
    "> MEMORY ARCHIVE FOUND.",
    "> CROSS-REFERENCING EVIDENCE...",
    "> CONNECTION FOUND.",
    "> FINAL CLUE: HIDDEN.",
    "> AWAITING PASSWORD..."

  ];


  let lineIndex = 0;


  function typeLine() {

    if (lineIndex >= lines.length) {

      inputArea.classList.remove("hidden");

      document
        .getElementById("codeInput")
        .focus();

      return;
    }


    const line =
      document.createElement("p");


    line.className =
      "terminalLine";


    terminal.appendChild(line);


    const text =
      lines[lineIndex];


    let characterIndex = 0;


    const typing =
      setInterval(() => {

        line.textContent +=
          text[characterIndex];

        characterIndex++;


        if (
          characterIndex >=
          text.length
        ) {

          clearInterval(typing);

          lineIndex++;

          setTimeout(
            typeLine,
            180
          );
        }

      }, 25);

  }


  typeLine();
}


// ==========================================
// TERMINAL PASSWORD
// ==========================================

function checkCode() {

  const input =
    document.getElementById("codeInput");

  const message =
    document.getElementById("codeMessage");


  const code =
    input.value.trim().toLowerCase();


  if (
    code ===
    terminalPassword.toLowerCase()
  ) {

    message.textContent =
      "DECRYPTION COMPLETE.";

    terminalFinished = true;


    setTimeout(() => {

      showScreen("memories");

    }, 1100);

  } else {

    message.textContent =
      "ACCESS DENIED.";

    input.value = "";

    errorFlash();
  }
}


// ==========================================
// FINAL QUESTION
// ==========================================

function checkFinalAnswer() {

  const input =
    document.getElementById("finalAnswer");

  const message =
    document.getElementById("finalMessage");


  const answer =
    input.value.trim().toLowerCase();


  if (
    answer ===
    finalAnswer.toLowerCase()
  ) {

    message.textContent =
      "ANSWER ACCEPTED.";


    setTimeout(() => {

      showScreen("reveal");

      startFinalReveal();

    }, 1200);

  } else {

    message.textContent =
      "INCORRECT. ACCESS REMAINS LOCKED.";

    input.value = "";

    errorFlash();
  }
}


// ==========================================
// FINAL REVEAL
// ==========================================

function startFinalReveal() {

  const title =
    document.querySelector(".glitchTitle");


  title.classList.add("finalGlitch");


  setTimeout(() => {

    title.classList.remove("finalGlitch");

  }, 1200);
}


// ==========================================
// ENTER KEY
// ==========================================

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key !== "Enter") {
      return;
    }


    const activeScreen =
      document.querySelector(
        ".screen.active"
      );


    if (!activeScreen) {
      return;
    }


    if (
      activeScreen.id ===
      "login"
    ) {

      verifyName();

    }


    else if (
      activeScreen.id ===
      "terminal"
    ) {

      checkCode();

    }


    else if (
      activeScreen.id ===
      "final"
    ) {

      checkFinalAnswer();

    }

  }
);
