function allHints() {
  /*If there is only one option for a number in any group, row or column
  (that number must belong to that cell)
  return hintlist array
  */
  for (let group = 1; group < 10; group++) {
    for (let number = 1; number < 10; number++) {
      let groupElements = document.getElementsByClassName(
        "grp" + group + " num" + number + " liveOption"
      );
      if (groupElements.length == 1) {
        groupElements[0].classList.add("hint");
        /*UPDATE_PUZZLE_LOG_start
        puzzleLogMessage =
          "Cell: " +
          groupElements[0].parentElement.id +
          " only option for " +
          number +
          " in group " +
          group;
        updatePuzzleLog(puzzleLogMessage);
  UPDATE_PUZZLE_LOG_END*/
      }
      let rowElements = document.getElementsByClassName(
        "row" + group + " num" + number + " liveOption"
      );
      if (rowElements.length == 1) {
        rowElements[0].classList.add("hint");
        /*UPDATE_PUZZLE_LOG_start
        puzzleLogMessage =
          "Cell: " +
          rowElements[0].parentElement.id +
          " only option for " +
          number +
          " in row " +
          group;
        updatePuzzleLog(puzzleLogMessage);
  UPDATE_PUZZLE_LOG_END*/
      }
      let colElements = document.getElementsByClassName(
        "col" + group + " num" + number + " liveOption"
      );
      if (colElements.length == 1) {
        colElements[0].classList.add("hint");
        /*UPDATE_PUZZLE_LOG_start
        puzzleLogMessage =
          "Cell: " +
          colElements[0].parentElement.id +
          " only option for " +
          number +
          " in column " +
          group;
        updatePuzzleLog(puzzleLogMessage);
        UPDATE_PUZZLE_LOG_END*/
      }
    }
  }

  //If there is only one option left in any cell, that option must be the answer
  for (let cell = 1; cell < 82; cell++) {
    cellElements = document.getElementsByClassName(
      "cel" + cell + " liveOption"
    );

    if (cellElements.length == 1) {
      cellElements[0].classList.add("hint");
      let hintNumberStr = cellElements[0].id + "";
      /*UPDATE_PUZZLE_LOG_start
      puzzleLogMessage =
        "Cell: " + cell + " has one option: " + hintNumberStr.slice(-1);
      updatePuzzleLog(puzzleLogMessage);
  UPDATE_PUZZLE_LOG_END*/
    }
  }
  //console.log(checkWork());
  if (checkWork()[0] == false) {
    puzzleLogMessage = "Check work FAILED: " + checkWork()[1];
    updatePuzzleLog(puzzleLogMessage);
    undo();

    let problemCellId = "cel" + undoArray[0][0] + "num" + undoArray[0][1];
    let problemCellElement = document.getElementById(problemCellId);
    problemCellElement.classList.remove("liveOption");
    problemCellElement.classList.add("removeOption");
    let lastSelection = selectionsArray[selectionsArray.length - 1];
    lastSelection[4].push(problemCellId);
  } else {
    //autopilot
    /*
    puzzleLogMessage = "Check work PASSED";
    updatePuzzleLog(puzzleLogMessage);
    */
    //HINT_AUTOCOMPLEATE_start
    while (document.getElementsByClassName("hint").length > 0) {
      document.getElementsByClassName("hint")[0].click();
    }

    //HINT_AUTOCOMPLEATE_end
  }
}
function checkWork() {
  //CheckWork function finds out if any of the groups, rows, or columns
  //have the same number hinted to more than once, then checks if any cell
  //has more than one hint, signaling a problem
  for (let group = 1; group < 10; group++) {
    for (let number = 1; number < 10; number++) {
      let groupElements = document.getElementsByClassName(
        "grp" + group + " num" + number + " possible"
      );

      if (groupElements.length == 0) {
        return [false, "No possible: " + number + " in group: " + group];
      }
      let rowElements = document.getElementsByClassName(
        "row" + group + " num" + number + " possible"
      );

      if (rowElements.length == 0) {
        return [false, "No possible: " + number + " in row: " + group];
      }

      let columnElements = document.getElementsByClassName(
        "col" + group + " num" + number + " possible"
      );

      if (columnElements.length == 0) {
        return [false, "No possible: " + number + " in column: " + group];
      }

      let groupHintElements = document.getElementsByClassName(
        "grp" + group + " num" + number + " liveOption hint"
      );

      if (groupHintElements.length > 1) {
        return [false, "Conflict between: " + number + " in group: " + group];
      }

      let rowHintElements = document.getElementsByClassName(
        "row" + group + " num" + number + " liveOption hint"
      );

      if (rowHintElements.length > 1) {
        return [false, "Conflict between: " + number + " in row: " + group];
      }
      let colHintElements = document.getElementsByClassName(
        "col" + group + " num" + number + " liveOption hint"
      );

      if (colHintElements.length > 1) {
        return [false, "Conflict between: " + number + " in column: " + group];
      }
    }
  }
  for (let cell = 1; cell < 82; cell++) {
    let cellElements = document.getElementsByClassName(
      "cel" + cell + " possible"
    );

    if (cellElements.length == 0) {
      return [false, "No possible: " + number + " in cell: " + cell];
    }

    let cellHintElements = document.getElementsByClassName(
      "cel" + cell + " liveOption hint"
    );
    //console.log("cel" + cell + " liveOption hint" + cellElements.length);
    if (cellHintElements.length > 1) {
      return [false, "Conflict in cell: " + cell];
    }
  }
  return [true, 0];
}
