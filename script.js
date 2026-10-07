const screens = document.querySelectorAll(".screen");

let memorySequence = [];

const correctSequence = [1, 2, 3, 4];


// ================================
// SCREEN SYSTEM
// ================================

function showScreen(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(id);

  if (nextScreen) {
    nextScreen.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================================
// IDENTITY CHECK
// ================================

function verifyName() {

  const input = document.getElementById("nameInput");
  const message = document.getElementById("nameMessage");

  const name = input.value.trim();

  if (name === "") {

    message.textContent = "IDENTITY REQUIRED.";

    return;
  }

  message.textContent = "IDENTITY VERIFIED.";

  setTimeout(() => {

    showScreen("puzzle");

  }, 800);
}


// ================================
// MEMORY PUZZLE
// ================================

function chooseMemory(number) {

  memorySequence.push(number);

  const message = document.getElementById("puzzleMessage");

  const currentPosition =
    memorySequence.length - 1;

  if (
    memorySequence[currentPosition] !==
    correctSequence[currentPosition]
  ) {

    message.textContent =
      "INCORRECT. SEQUENCE RESETTING...";

    memorySequence = [];

    setTimeout(() => {

      message.textContent = "";

    }, 1000);

    return;
  }


  if (
    memorySequence.length ===
    correctSequence.length
  ) {

    message.textContent =
      "SEQUENCE ACCEPTED.";

    setTimeout(() => {

      showScreen("evidence");

    }, 900);
  }
}


// ================================
// EVIDENCE FILES
// ================================

function openFile(fileNumber) {

  const output =
    document.getElementById("fileOutput");


  const files = {

    "001":
`FILE_001

DATE: CLASSIFIED

NOTE:
Something important started here.

STATUS:
ARCHIVED.`,

    "002":
`FILE_002

PHOTO: CLASSIFIED

NOTE:
This memory was saved
for a reason.

STATUS:
PROTECTED.`,

    "003":
`FILE_003

LOCATION: CLASSIFIED

NOTE:
Two people.
One story.

STATUS:
ACTIVE.`,

    "004":
`FILE_004

STATUS: ACTIVE

NOTE:
Keep looking.

There is more to this case
than you think.`
  };


  output.textContent =
    files[fileNumber] ||
    "FILE CORRUPTED.";
}


// ================================
// TERMINAL
// ================================

const terminalText =
document.querySelector(".terminal");


// ================================
// PASSWORD
// ================================

function checkCode() {

  const input =
    document.getElementById("codeInput");

  const message =
    document.getElementById("codeMessage");

  const code =
    input.value.trim().toLowerCase();


  const acceptedCodes = [

    "love",
    "us",
    "together"

  ];


  if (
    acceptedCodes.includes(code)
  ) {

    message.textContent =
      "DECRYPTION COMPLETE.";

    setTimeout(() => {

      showScreen("memories");

    }, 900);

  } else {

    message.textContent =
      "ACCESS DENIED.";

    input.value = "";

  }
}


// ================================
// FINAL ANSWER
// ================================

function submitFinalAnswer() {

  showScreen("reveal");

}


// ================================
// ENTER KEY SUPPORT
// ================================

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


    if (activeScreen.id === "login") {

      verifyName();

    }


    if (activeScreen.id === "terminal") {

      checkCode();

    }

  }
);
