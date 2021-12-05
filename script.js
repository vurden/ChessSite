var peice;
var who = [];
var who2 = [];
var tiles = [
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", 
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", 
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
]
document.getElementById("next").addEventListener("click", startGame);
document.getElementById("next2").addEventListener("click", freeplay);


//start game
function startGame() {
    document.getElementById("start").style.zIndex = -2;
    document.getElementById("start").style.visibility = "hidden";
    whiteTurn();
}

//freeplay
function freeplay() {
    document.getElementById("start").style.zIndex = -2;
    document.getElementById("start").style.visibility = "hidden";
    for (var i = 0; i <= 63; i++) {
        document.getElementById(tiles[i]).addEventListener("click", go2);
    }
}

function go2() {
    
}

//On peice click:
function go(event) {
    who2 = who;
    who = [];
    
    //change back to normal board colors:
    defaultColor();
    
    //get info of peice clicked (color, type, grid id):
    var info = details(event.target);
    console.log(info);
    
    //get grids peice can move to
    var x = whatFun(info[1]);
    peices[x](info[2]);

    
}

function pawn(color, place) {
    peice = place;
    //white
    if (color == "white") {
        console.log(tiles.indexOf(place));
        var x = tiles.indexOf(place) + 8;
        who.push(tiles[x]);
        if (peice.substr(peice.length - 1) == "2") {
            who.push(tiles[x]);
        }
    }
    addEvents();
}
function addEvents() {
    who2.forEach(element => {
        document.getElementById(element).removeEventListener("click", move);
    });
    who.forEach(element => {
        document.getElementById(element).style.backgroundColor = "#ffc933"
        document.getElementById(element).addEventListener("click", move);
    }); 
}

function move(event) {
    console.log(`${peice} to ${event.target.id}`)
    document.getElementById(peice).innerText = "";
    document.getElementById(event.target.id).innerText = "♙";
    who2.forEach(element => {
        document.getElementById(element).removeEventListener("click", move);
    });
}

function defaultColor() {
    var allB = document.getElementsByClassName('grid-b');
    for (var i = 0; i < allB.length; i++) {
        allB[i].style.backgroundColor = 'lightslategrey';
    }
    var allW = document.getElementsByClassName('grid-w');
    for (var i = 0; i < allW.length; i++) {
        allW[i].style.backgroundColor = 'whitesmoke';
    }
}

function whiteTurn() {
    tiles.forEach(element => {
        var info = details(document.getElementById(element));
        if (info == undefined) {
        } else if (info[0] == "white") {
            document.getElementById(info[2]).addEventListener("click", go);
        }
    });
}

//input 
function details(event) {
    var x = event.innerText;
    if (x == "♟" || x == "♜" || x =="♞" || x == "♝" || x == "♚" || x == "♛") {
        //[TEAM, PEICE, LOCATION]
        var array = ["black", x, event.id];
        return array;
    } else if (x == "♙" || x == "♖" || x =="♘" || x == "♗" || x == "♔" || x == "♕") {
        var array = ["white", x, event.id];
        return array;
    } else {
        var array = ["none", x, event.id]
        return array;
    }
}

function whatFun(x) {
    if (x == "♙") {
        return 0
    } else if (x == "♖") {
        return 1
    } else if (x == "♘") {
        return 2
    } else if (x == "♗") {
        return 3
    } else if (x == "♔") {
        return 4
    } else if (x == "♕") {
        return 5
    } else if (x == "♟") {
        return 6
    } else if (x == "♜") {
        return 7
    } else if (x == "♞") {
        return 8
    } else if (x == "♝") {
        return 9
    } else if (x == "♚") {
        return 10
    } else if (x == "♛") {
        return 11
    }
}

const peices = [
    function pawnW(place) {
        var array = [];
        console.log("White Pawn");
        var x = details(document.getElementById(tiles[tiles.indexOf(place) + 8]));
        if (x[0] == "none") {
            array.push(x[2]);
            x = details(document.getElementById(tiles[tiles.indexOf(place) + 8]));
            if (x[0] == "none") {
                array.push(x[2]);   
            }
            console.log(array);
        }
    },
    function rookW() {
        console.log("White Rook")
    },
    function knightW() {
        console.log("White Knight")
    },function bishopW() {
        console.log("White Bishop")
    },function kingW() {
        console.log("White King")
    },function queenW() {
        console.log("White Queen")
    },
    
    function pawnB() {
        console.log("Black Pawn")
    },function rookB() {
        console.log("Black Rook")
    },function knightB() {
        console.log("Black Knight")
    },function bishopB() {
        console.log("Black Bishop")
    },function kingB() {
        console.log("Black King")
    },function queenB() {
        console.log("Black Queen")
    },

]

function diagonal(place, team) {}

function available(x, color) {
    if (x == undefined){
        return "none";
    } else if (x[0] == "white") {
        return "white";
    } else return "black";
}