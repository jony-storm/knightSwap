// 11_23_2023_21_11_43
let chessBoard = [
  ["B", "B", "B", "B", "B", "B", "B", "B"],
  ["B", "B", "B", "B", "B", "B", "B", "B"],
  ["B", "B", "B", "B", "B", "B", "B", "B"],
  ["B", "B", "B", "", "", "B", "B", "B"],
  ["W", "W", "W", "", "", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W"],
];
let curPos = [0, 0];
let chessPiece = "";

let contents = "";
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let color = 1 - Math.pow(-1, i + 1 + (j + 1)) ? "white" : "black";
    contents += `<div class='check ${color}'></div>`;
  }
}
container.innerHTML = contents;

function drawKnight() {
  let checks = document.getElementsByClassName("check");
  let checkIndx = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (chessBoard[i][j] === "B") {
        checks[
          checkIndx
        ].innerHTML = `<div><img class="${i}${j}" src="black-knight.svg"/></div>`;
      } else if (chessBoard[i][j] === "W") {
        checks[
          checkIndx
        ].innerHTML = `<div><img class="${i}${j}" src="white-knight.svg"/></div>`;
      } else {
        checks[checkIndx].innerHTML = `<div class="${i}${j}"></div>`;
      }
      checkIndx += 1;
    }
  }
}

drawKnight();

function moveKnight(x, y) {
  let tempPos = [curPos[0], curPos[1]]; // tree shaked
  chessBoard[x][y] = chessBoard[tempPos[0]][tempPos[1]];
  curPos = [x, y];
  chessBoard[tempPos[0]][tempPos[1]] = "";
  drawKnight();
  // console.log(chessBoard);
}

function currectMove(x, y) {
  let possibleMove = [
    [curPos[0] + 2, curPos[1] + 1],
    [curPos[0] + 2, curPos[1] - 1],
    [curPos[0] - 2, curPos[1] + 1],
    [curPos[0] - 2, curPos[1] - 1], // x first
    [curPos[0] + 1, curPos[1] + 2],
    [curPos[0] - 1, curPos[1] + 2],
    [curPos[0] + 1, curPos[1] - 2], // corrected
    [curPos[0] - 1, curPos[1] - 2],
  ];

  for (let i = 0; i < possibleMove.length; i++) {
    if (possibleMove[i][0] === x && possibleMove[i][1] === y) {
      return true;
    }
  }
  return false;
}

container.onclick = function (evt) {
  // return console.log(evt);
  let selectedPos = evt.target.className.split("").map((e) => parseInt(e));
  console.log("this is selpos");
  console.log(selectedPos);
  if (chessBoard[selectedPos[0]][selectedPos[1]] == "") {
    // if clicked in emtpy cell
    console.log("this works too");
    if (chessPiece !== "") {
      // if chesspice previously selected
      if (currectMove(selectedPos[0], selectedPos[1])) {
        // valid destination for move
        moveKnight(selectedPos[0], selectedPos[1]);
      }
    }
  } else {
    curPos = selectedPos;
    chessPiece = chessBoard[curPos[0]][curPos[1]];
  }
  console.log(evt.target.className);
};
