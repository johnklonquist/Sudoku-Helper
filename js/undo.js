function undo() {
  //check if selectionsArray has length
  if (selectionsArray.length == 0) {
    return;
  }

  undoArray = selectionsArray.pop();
  let isMoveAChoice = undoArray[3];
  startCell = document.getElementById("answer" + undoArray[0][0]);
  //console.log("startCell.id: " + undoArray[0][0] + " " + startCell);
  startCell.innerHTML = "";
  startCell.className = "unknown answer";
  updatePuzzleLog(
    "Number " + undoArray[0][1] + " unselected from cell " + undoArray[0][0]
  );
  let undoElement = document.getElementById(
    "cel" + undoArray[0][0] + "num" + undoArray[0][1]
  );
  undoElement.classList.remove("removeOption");
  undoElement.classList.add("liveOption");
  for (a = 0; a < undoArray[1].length; a++) {
    let divId = "cel" + undoArray[0][0] + "num" + undoArray[1][a];

    document.getElementById(divId).classList.remove("removeOption");
    document.getElementById(divId).classList.add("liveOption", "possible");
  }
  for (a = 0; a < undoArray[2].length; a++) {
    divId = "cel" + undoArray[2][a] + "num" + undoArray[0][1];
    document.getElementById(divId).classList.remove("removeOption");
    document.getElementById(divId).classList.add("liveOption", "possible");
  }
  for (a = 0; a < undoArray[4].length; a++) {
    divId = undoArray[4][a];
    //console.log(divId);
    document.getElementById(divId).classList.remove("removeOption");
    document.getElementById(divId).classList.add("liveOption", "possible");
  }

  //The following section removes all old hints from number cells

  if (isMoveAChoice == false) {
    undo();
  }

  while (document.getElementsByClassName("hint").length > 0) {
    document.getElementsByClassName("hint")[0].classList.remove("hint");
  }
}
