var passSave;
var pass;
var global;
var turn = "white";
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
    startTurn();
}

//freeplay
function freeplay() {
    document.getElementById("start").style.zIndex = -2;
    document.getElementById("start").style.visibility = "hidden";
    for (var i = 0; i <= 63; i++) {
        document.getElementById(tiles[i]).addEventListener("click", go2);
    }
}

function go(event) {
    console.log("GOGOGOGOGOO")
    global = event.target.id
    pass;
    passSave = pass;
    
    //change back to normal board colors:
    defaultColor();
    
    //get info of peice clicked (color, type, grid id):
    var info = details(event.target);

    //get grids peice can move to
    var x = whatFun(info[1]);
    console.log(x);
    pass = peices[x](info[2]);
    console.log(pass)
    
    //removes event listeners for highlighted tiles
    removeEvents(passSave)
    addEvents(pass)

}

function removeEvents(passSave) {
    if (passSave != undefined) {
        passSave.forEach(element => {
            document.getElementById(element).removeEventListener("click", move);
        }); 
    }
}

function addEvents(pass) {
    pass.forEach(element => {
        document.getElementById(element).style.backgroundColor = "#ffc933"
        document.getElementById(element).addEventListener("click", move);
    }); 
}

function move(event) {
    document.getElementById(event.target.id).innerText = document.getElementById(global).innerText;
    document.getElementById(global).innerText = "";
    defaultColor();
    removeEvents(pass)
    removeStartTurn()
    if (turn == "white") {
        turn = "black";
    } else if (turn == "black") {
        turn = "white";
    }
    startTurn();
    
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

function startTurn() {
    console.log(turn)
    tiles.forEach(element => {
        var info = details(document.getElementById(element));
        if (info == undefined) {
        } else if (info[0] == turn) {
            document.getElementById(info[2]).addEventListener("click", go);
        }
    });
}

function removeStartTurn() {
    tiles.forEach(element => {
        var info = details(document.getElementById(element));
        if (info == undefined) {
        } else if (info[0] == turn) {
            document.getElementById(info[2]).removeEventListener("click", go);
        }
    });
    document.getElementById(global).removeEventListener("click", go);
}

//parameter: event.target
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
        var x = another(place, 8);
        if (x[0] == "none") {
            array.push(x[2]);
            x = another(place, 16);
            //this is weird?
            if (x[0] == "none" && ![8, 9, 10, 11, 12, 13, 14, 15].every((item) => {return item!=x[3]})) {
                array.push(x[2]);   
            }
        }
        x = another(place, 9);
        console.log(right(x))
        if (x[0] == "black" && right(x)) {
            array.push(x[2]);
        }
        x = another(place, 7);
        if (x[0] == "black" && left(x)) {
            array.push(x[2]);
        }
        return array;
    },
    function rookW(place) {
        console.log("White Rook")
        console.log(place)
        return north(place, 8)
        
        //document.getElementById(tiles[another(current, 8)[4]])
        

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
    
    function pawnB(place) {
        console.log("Black Pawn")
        var array = [];
        var x = another(place, -8);
        if (x[0] == "none") {
            array.push(x[2]);
            x = another(place, -16);
            //this is weird?
            if (x[0] == "none" && ![48, 49, 50, 51, 52, 53, 54, 55].every((item) => {return item!=x[3]})) {
                array.push(x[2]);   
            }
        }
        x = another(place, -7);
        if (x[0] == "white" && right(x)) {
            array.push(x[2]);
        }
        x = another(place, -9);
        if (x[0] == "white" && left(x)) {
            array.push(x[2]);
        }
        return array;
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

function north(place, move) {
    var array = [];
    var current = place;  
    while (true) {
        if (another(current, move)[0] == "none" && toppom(another(current, move))) {
            var x = another(current, 8);
            array.push(x[2]);
            current = x[2]
        } else if (another(current, move)[0] == "black" && toppom(another(current, move))) {
            var x = another(current, move);
            array.push(x[2]);
            break;
        } else break;
    }
    return array;

}

function another(place, x) {
    var push = details(document.getElementById(tiles[tiles.indexOf(place) + x]));
    push.push(tiles.indexOf(place));
    push.push(tiles.indexOf(place) + x);
    return push;
}

function left(x) {
    return [0, 8, 16, 24, 32, 40, 48, 56].every((item) => {return item!=x[3]})
}
function right(x) {
    return [7, 15, 23, 31, 39, 47, 55, 63].every((item) => {return item!=x[3]})
}
function bottom(x) {
    return [0, 1, 2, 3, 4, 5, 6, 7].every((item) => {return item!=x[3]})
}
function toppom(x) {
    //return x[3] < 64
    return [56, 57, 58, 59, 60, 61, 62, 63].every((item) => {return item!=x[3]})
}