function buildPuzzle() {
  puzzle = document.getElementById('puzzle');

  // use event delegation, rather than adding event listeners to each number.
  puzzle.addEventListener('click', function (event) {
    let target = event.target;
    if (target.classList.contains('number')) {
      let idTxt = target.id;
      updatePuzzle(idTxt);
    }
  });

  //reset puzzle
  while (puzzle.children.length > 0) {
    puzzle.removeChild(puzzle.lastChild);
  }
  selectionsArray = [];
  let grpNum = 1;
  let celNum = 1;

  //reset puzzle log
  document.getElementById('puzzleLog').innerHTML = '';

  puzzleBuildStart = new Date();

  //build puzzle grid

  for (grpRow = 0; grpRow < 3; grpRow++) {
    /*Groups are constructed from top to bottom,
    left to right and from the inner-most element out.


    */
    for (grpCol = 0; grpCol < 3; grpCol++) {
      let grpDiv = document.createElement(`div`);
      grpDiv.className = 'group';
      grpDiv.style.position = 'absolute';
      let idTxt = 'grp' + grpNum;
      grpDiv.id = idTxt;

      let divTop = grpRow * 300;
      grpDiv.style.top = divTop + 'px';
      let divLeft = grpCol * 300;
      grpDiv.style.left = divLeft + 'px';

      for (celRow = 0; celRow < 3; celRow++) {
        let realRow = grpRow * 3 + celRow + 1;
        for (celCol = 0; celCol < 3; celCol++) {
          let realCol = grpCol * 3 + celCol + 1;

          let celDiv = document.createElement(`div`);
          celDiv.className = 'cell';
          celDiv.style.position = 'absolute';
          let idTxt = celNum;
          celDiv.id = idTxt;

          let celTop = celRow * 100;
          celDiv.style.top = celTop + 'px';
          let celLeft = celCol * 100;
          celDiv.style.left = celLeft + 'px';

          let answerDiv = document.createElement('div');
          answerDiv.className = 'unknown';
          celDiv.appendChild(answerDiv);

          let numNum = 1;
          for (numRow = 0; numRow < 3; numRow++) {
            for (numCol = 0; numCol < 3; numCol++) {
              let numDiv = document.createElement(`div`);
              numDiv.className =
                'grp' +
                grpNum +
                ' row' +
                realRow +
                ' col' +
                realCol +
                ' num' +
                numNum +
                ' cel' +
                celNum +
                ' number liveOption possible';
              numDiv.style.position = 'absolute';

              let idTxt = 'cel' + celNum + 'num' + numNum;
              numDiv.id = idTxt;
              numDiv.innerHTML = numNum;
              numNum++;
              let numTop = numRow * 33;
              numDiv.style.top = numTop + 'px';
              let numLeft = numCol * 33;
              numDiv.style.left = numLeft + 'px';

              // no longer necessary, cause of event deligation
              // numDiv.addEventListener('click', function (event) {
              //   updatePuzzle(idTxt);
              // });

              celDiv.appendChild(numDiv);
            } //END LOOP: numRow
          } //END LOOP: numRow
          grpDiv.appendChild(celDiv);
          celNum++;
        } //END LOOP: celCol
      } //END LOOP: celRow
      puzzle.appendChild(grpDiv);
      grpNum++;
    } //END LOOP: grpCol
  } //END LOOP: grpRow
  let puzzleBuildEnd = new Date();
  let puzzleBuildTime = puzzleBuildEnd - puzzleBuildStart;

  updatePuzzleLog(
    'Puzzle built on ' +
      puzzleBuildStart.toLocaleString() +
      ' in ' +
      puzzleBuildTime +
      'ms.'
  );

  console.log('who still clicking');
}
