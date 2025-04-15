let selectionsArray = [];
let puzzleBuildStart;
let undoArray = [];
let puzzleLogMessage = "";

function updatePuzzleLog(message) {
  let puzzleLogElement = document.getElementById("puzzleLog");
  puzzleLogElement.innerHTML += "<li>" + message + "</li>";
}
function randomSelection() {
  let activeElementList = document.getElementsByClassName("liveOption");
  //console.log(activeElementList.length + " activeElements");
  if (activeElementList.length > 0) {
    let randomElementIndex = Math.floor(
      Math.random() * activeElementList.length
    );
    // console.log("randomElementIndex: " + randomElementIndex);
    let randomElement = activeElementList[randomElementIndex];
    randomElement.click();
  }
}
function solvePuzzle() {
  while (document.getElementsByClassName("liveOption").length > 0) {
    randomSelection();
  }
  let puzzleEnd = new Date();
  let puzzleCompleationTime = puzzleEnd - puzzleBuildStart;
  updatePuzzleLog("Puzzle Compleated in " + puzzleCompleationTime);
}
