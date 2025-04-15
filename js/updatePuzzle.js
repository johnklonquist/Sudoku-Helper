function updatePuzzle(selectedElementId) {
  let selectedElement = document.getElementById(selectedElementId);
  selectedElement.classList.remove("liveOption");
  selectedElement.classList.add("removeOption");
  let parentCellId = selectedElement.parentElement.id;
  let choice = true;
  if (selectedElement.classList.contains("hint") == true) {
    choice = false;
    selectedElement.classList.remove("hint");
  }
  let selectedNumber = selectedElement.innerHTML;

  //update puzzle log
  let messageVerb = choice == true ? "selected" : "forced";

  puzzleLogMessage =
    "Number " + selectedNumber + " " + messageVerb + " on cell " + parentCellId;
  updatePuzzleLog(puzzleLogMessage);
  let selectedCellData = [[parentCellId, selectedNumber]];

  let selectedCellChilren = selectedElement.parentElement.children;
  let cellNumbers = [];
  for (let i = 1; i < selectedCellChilren.length; i++) {
    if (selectedCellChilren[i].classList.contains("liveOption") == true) {
      cellNum = selectedCellChilren[i].innerHTML;
      cellNumbers.push(cellNum);
      selectedCellChilren[i].classList.remove("liveOption", "possible");
      selectedCellChilren[i].classList.add("removeOption");
    }
  }
  selectedCellData.push(cellNumbers);

  /*
  puzzleLogMessage =
    "Cell: " +
    parentCellId +
    " Options Removed: " +
    selectedCellData[1].toString();
  updatePuzzleLog(puzzleLogMessage);
  */
  let selectedCellClassStr = selectedElement.className;

  let selectedCellClasses = selectedCellClassStr.split(" ");

  let groupTargetClassesTxt =
    selectedCellClasses[0] + " " + selectedCellClasses[3];

  let affectedGroupElements = document.getElementsByClassName(
    groupTargetClassesTxt
  );

  let rowTargetClassesTxt =
    selectedCellClasses[1] + " " + selectedCellClasses[3];
  let affectedRowElements =
    document.getElementsByClassName(rowTargetClassesTxt);
  let columnTargetClassesTxt =
    selectedCellClasses[2] + " " + selectedCellClasses[3];
  let affectedColumnElements = document.getElementsByClassName(
    columnTargetClassesTxt
  );

  let affectedCellData = [];
  updateElements(affectedGroupElements);
  updateElements(affectedRowElements);
  updateElements(affectedColumnElements);

  /*
  puzzleLogMessage =
    "Option: " +
    selectedNumber +
    " Removed from cells: " +
    affectedCellData.toString();

  updatePuzzleLog(puzzleLogMessage);
  */
  selectedCellData.push(affectedCellData);
  selectedCellData.push(choice);
  selectedCellData.push([]); //empty array for placeing future impossible choices created by this selection
  selectionsArray.push(selectedCellData);

  selectedCellChilren[0].innerHTML = selectedNumber;
  selectedCellChilren[0].classList.remove("unknown");
  selectedCellChilren[0].classList.add("answer", messageVerb);
  selectedCellChilren[0].id = "answer" + parentCellId;
  function updateElements(elements) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains("liveOption") == true) {
        let cellIdNum = elements[i].parentElement.id;
        elements[i].classList.remove("liveOption", "possible");
        elements[i].classList.add("removeOption");
        affectedCellData.push(cellIdNum);
      }
    }
  }
  allHints();
  /*
  if (document.getElementsByClassName("liveOption").length > 0) {
    //randomSelection();
  } else {
    //puzzle compleated
    let puzzleEnd = new Date();
    let puzzleCompleationTime = puzzleEnd - puzzleBuildStart;
    updatePuzzleLog("Puzzle Compleated in " + puzzleCompleationTime);
    console.log("who still clicking");
  }
    */
} // END FUNCTION: updatePuzzle
