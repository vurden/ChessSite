//npm start

var passSave;
var pass;
var global;
var turn = "white";
var opposite = "black";
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
    global = event.target.id
    pass;
    passSave = pass;
    
    //change back to normal board colors:
    defaultColor();
    
    //get info of peice clicked (color, type, grid id):
    var info = details(event.target);

    //get grids peice can move to
    var x = whatFun(info[1]);
    pass = peices[x](info[2]);
    
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
        opposite = "white";
    } else if (turn == "black") {
        turn = "white";
        opposite = "black";
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
        if (x[0] == "black") {
            array.push(x[2]);
        }
        x = another(place, 7);
        if (x[0] == "black") {
            array.push(x[2]);
        }
        return array;
    },
    function rookW(place) {
        console.log("White Rook")
        var array = [];
        array = north(place, 8, array)
        array = north(place, -8, array)
        array = north(place, 1, array)
        array = north(place, -1, array)
        return array;
    },
    function knightW(place) {
        console.log("White Knight")
        var array = [];
        array = north(place, 6, array, true)
        array = north(place, 10, array, true)
        array = north(place, 15, array, true)
        array = north(place, 17, array, true)
        array = north(place, -6, array, true)
        array = north(place, -10, array, true)
        array = north(place, -15, array, true)
        array = north(place, -17, array, true)
        return array;
    },function bishopW(place) {
        console.log("White Bishop")
        var array = [];
        array = north(place, 9, array)
        array = north(place, 7, array)
        array = north(place, -7, array)
        array = north(place, -9, array)
        return array;
    },function kingW(place) {
        console.log("White King")
        var array = [];
        array = north(place, 9, array, true)
        array = north(place, 7, array, true)
        array = north(place, -7, array, true)
        array = north(place, -9, array, true)
        array = north(place, 8, array, true)
        array = north(place, -8, array, true)
        array = north(place, -1, array, true)
        array = north(place, 1, array, true)
        return array;
    },function queenW(place) {
        console.log("White Queen")
        var array = [];
        array = north(place, 9, array)
        array = north(place, 7, array)
        array = north(place, -7, array)
        array = north(place, -9, array)
        array = north(place, 8, array)
        array = north(place, -8, array)
        array = north(place, -1, array)
        array = north(place, 1, array)
        return array;
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
        if (x[0] == "white") {
            array.push(x[2]);
        }
        x = another(place, -9);
        if (x[0] == "white") {
            array.push(x[2]);
        }
        return array;
    },function rookB(place) {
        console.log("Black Rook")
        var array = [];
        array = north(place, 8, array)
        array = north(place, -8, array)
        array = north(place, 1, array)
        array = north(place, -1, array)
        return array;
        
    },function knightB(place) {
        console.log("Black Knight")
        var array = [];
        array = north(place, 6, array, true)
        array = north(place, 10, array, true)
        array = north(place, 15, array, true)
        array = north(place, 17, array, true)
        array = north(place, -6, array, true)
        array = north(place, -10, array, true)
        array = north(place, -15, array, true)
        array = north(place, -17, array, true)
        return array;
    },function bishopB(place) {
        console.log("Black Bishop")
        var array = [];
        array = north(place, 9, array)
        array = north(place, 7, array)
        array = north(place, -7, array)
        array = north(place, -9, array)
        return array;
    },function kingB(place) {
        console.log("Black King")
        var array = [];
        array = north(place, 9, array, true)
        array = north(place, 7, array, true)
        array = north(place, -7, array, true)
        array = north(place, -9, array, true)
        array = north(place, 8, array, true)
        array = north(place, -8, array, true)
        array = north(place, -1, array, true)
        array = north(place, 1, array, true)
        return array;
    },function queenB(place) {
        console.log("Black Queen")
        var array = [];
        array = north(place, 9, array)
        array = north(place, 7, array)
        array = north(place, -7, array)
        array = north(place, -9, array)
        array = north(place, 8, array)
        array = north(place, -8, array)
        array = north(place, -1, array)
        array = north(place, 1, array)
        return array;
    },

]

function north(place, move, array, king) {
    var current = place;  
    while (true) {
        if (another(current, move)[0] == "none") {
            var x = another(current, move);
            array.push(x[2]);
            current = x[2]
            if (tiles.indexOf(current) > 56) {break;}
        } else if (another(current, move)[0] == opposite) {
            var x = another(current, move);
            array.push(x[2]);
            break;
        } else break;
        if (king == true) {break;}
    }
    return array;

}

function another(place, x) {
    if (tiles.indexOf(place) + x > 63) {
        return ["na"];
    } else if (tiles.indexOf(place) + x < 0) {
        return ["na"];
    } else if (x == 9 || x == -7 || x == 1 || x == 17 || x == -15) {
        if (right(tiles.indexOf(place))) {
            return ["na"];
        }
    } else if (x == 7 || x == -9 || x == -1 || x == 15 || x == -17) {
        if (left(tiles.indexOf(place))) {
            return ["na"];
        }
    } else if (x == 10 || x == -6) {
        if (right2x(tiles.indexOf(place))) {
            return ["na"];
        }
    } else if (x == 6 || x == -10) {
        if (left2x(tiles.indexOf(place))) {
            return ["na"];
        }
    }
    var push = details(document.getElementById(tiles[tiles.indexOf(place) + x]));
    push.push(tiles.indexOf(place));
    push.push(tiles.indexOf(place) + x);
    return push;
}

function left(x) {
    return ![0, 8, 16, 24, 32, 40, 48, 56].every((item) => {return item!=x})
}
function right(x) {
    return ![7, 15, 23, 31, 39, 47, 55, 63].every((item) => {return item!=x})
}
function left2x(x) {
    return ![0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57].every((item) => {return item!=x})
}
function right2x(x) {
    return ![6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63].every((item) => {return item!=x})
}

var minSec = [15, 00];
var timer = 0;
document.getElementById("change").addEventListener("click", time);
function time() {
    if (timer == 0) {
        document.getElementById("bclock").innerText = "Black 15:00";
        document.getElementById("wclock").innerText = "White 15:00";
        timer++;
        minSec[0] = 15;
        minSec[1] = 00;
    } else if (timer == 1) {
        document.getElementById("bclock").innerText = "Black 30:00";
        document.getElementById("wclock").innerText = "White 30:00";
        timer++;
        minSec[0] = 30;
        minSec[1] = 00;
    } else if (timer == 2) {
        document.getElementById("bclock").innerText = "Black 45:00";
        document.getElementById("wclock").innerText = "White 45:00";
        timer++;
        minSec[0] = 45;
        minSec[1] = 00;
    } else if (timer == 3) {
        document.getElementById("bclock").innerText = "Black 60:00";
        document.getElementById("wclock").innerText = "White 60:00";
        timer++;
        minSec[0] = 60;
        minSec[1] = 00;
    } else if (timer == 4) {
        document.getElementById("bclock").innerText = "Black 90:00";
        document.getElementById("wclock").innerText = "White 90:00";
        timer = 0;
        minSec[0] = 90;
        minSec[1] = 00;
    }
}

document.getElementById("timer").addEventListener("click", timeStart);
function timeStart() {
    var wmin = minSec[0];
    var wsec = minSec[1];
    var bmin = minSec[0];
    var bsec = minSec[1];
    var int = setInterval(function() {
        if (turn == "white") {
            document.getElementById("wclock").innerHTML = "&nbsp&nbspWhite&nbsp&nbsp " + wmin + ":" + wsec;
            if (wsec == 0) {
                wmin --;
                wsec = 60;
                if (wmin == -1) {
                    document.getElementById("end").style.zIndex = 2;
                    document.getElementById("endb").style.visibility = "visible";
                    clearInterval(int);
                } 
            }
            wsec--;
        } else {
            document.getElementById("bclock").innerHTML = "&nbsp&nbspBlack&nbsp&nbsp " + bmin + ":" + bsec;
            if (bsec == 0) {
                bmin --;
                bsec = 60;
                if (bmin == -1) {
                    document.getElementById("endw").style.visibility= "visible";
                    document.getElementById("end").style.zIndex = 2;
                    clearInterval(int);
                } 
            }
            bsec--;
        }
    }, 1000);
}