$(document).ready(function () {
    localStorage.clear();
    var player1 ;
    var player2 ;
    var grid;

    $("#startGame").on("click", function () {
        var colorChosenp1 = $("#p1 li .chosen").data('color');
        var colorChosenp2 = $("#p2 li .chosen").data('color');
        var rows = $("#numrows").val();
        var cols = $("#numcols").val();
        if (cols < 7){
            cols = 7;
        }
        var largura = (parseInt(cols) * 100) + 43;
        $("#playerTurn").css("width", ""+largura+"px");
        $(".controls").removeClass("hide");
        $("#gameButtons").removeClass("hide");


        var p1name = $("#p1name").val();
        var p2name = $("#p2name").val();
        if (p1name === null || p1name == ""){
            p1name = "Player 1";
        }
        if (p2name === null || p2name == ""){
            p2name = "Player 2";
        }

        $("#spanP1").html(p1name);
        $("#spanP1").css("color", colorChosenp1);
        $("#spanP2").html(p2name);
        $("#spanP2").css("color", colorChosenp2);

        player1 = new player(p1name, colorChosenp1);
        player2 = new player(p2name, colorChosenp2);
        grid = new connect4(rows, cols, '#myGrid', colorChosenp1, colorChosenp2);
        $("#btnStartGame").addClass("hide");
        $("#startMenu").addClass("hide");
        changePlayer();
        //$("#startMenu").remove();

    });

    $("#newGame").on("click", function () {
        location.reload();
    });


    /*console.log(player1.name);
    console.log(player1.color);
    console.log(player2.name);
    console.log(player2.color);*/


    var y = 50;

    $.fn.connect4 = function() {

        var wdt = grid.columns * 100;
        var hgt = grid.rows * 100;
        var canvas = '<canvas id="myCanvas" width="'+wdt+'" height="'+hgt+'" style="border: 1px solid black;"></canvas>';
        $("#yourspace").prepend(canvas);
        //grid.createCanvas;
        //$.fn.drawCircles(grid.rows, grid.columns);
        var w;

        for (w=1; w<= grid.rows; w++){

            drawColumns(grid.columns, y);
            y += 100;
        }
    };

    //$.fn.connect4();

    function drawColumns(columns){
        var i;
        var x = 50;
        for (i=1; i<=columns; i++){

            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");

            ctx.beginPath();
            ctx.arc(x, y, 50, 0, 2 * Math.PI);
            ctx.stroke();

            x += 100;
        }
    };

    //var turn = localStorage.getItem('turn');

    function changePlayer() {
        if (localStorage.getItem('turn') == 1){
            var txt = player1.name + "'s turn!";
            $("#playerTurn").text(txt);
            $("#playerTurn").removeClass("background-color");
            $("#playerTurn").css("background-color", player1.color);

        } else {
            var txt = player2.name + "'s turn!";
            $("#playerTurn").text(txt);
            $("#playerTurn").removeClass("background-color");
            $("#playerTurn").css("background-color", player2.color);
        }
    }
    $("#myGrid").on("click", ".col.empty", function () {
        var game = localStorage.getItem('gameover');
        if ( game == 'false'){

            if (localStorage.getItem('turn') == 1){
                localStorage.setItem('turn', 2) ;
            } else {
                localStorage.setItem('turn', 1) ;
            }
            changePlayer();
        } else {

        }

        playAudio();
    });
    //changePlayer();

    var x = document.getElementById("myAudio");

    function playAudio() {
        x.play();
    }

    $('#restart').click(function () {
        grid.restart();
    });

    //get cursor coordinates

    /*function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("x: " + x + " y: " + y);
    };

    const canvas = document.querySelector('div');
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e);
    });*/
    $("#colorp1").on("click", "li", function () {
        var color = $(this).children().data('color');
        var list = $(this).parent().children();

        for (let i = 0; i <= list.length - 1; i++){
            var target = list[i].childNodes[1];
            target.classList.remove('chosen');
            //console.log(target);
        }
        $(this).children().addClass('chosen');
        var list2 = $("#colorp2").children();

        for (let j = 0; j <= list2.length - 1; j++){
            var target2 = list2[j];
            target2.classList.remove('cantTarget1');
            //console.log(target);
        }
        $("#p2"+color).parent().addClass('cantTarget1');


    });

    $("#colorp2").on("click", "li", function () {
        var color = $(this).children().data('color');
        var list = $(this).parent().children();
        //console.log(list);
        for (let i = 0; i <= list.length - 1; i++){
            var target = list[i].childNodes[1];
            target.classList.remove('chosen');
            //console.log(target);
        }
        $(this).children().addClass('chosen');

        var list2 = $("#colorp1").children();

        for (let j = 0; j <= list2.length - 1; j++){
            var target2 = list2[j];
            target2.classList.remove('cantTarget2');
            //console.log(target);
        }
        $("#p1"+color).parent().addClass('cantTarget2');
    });
    //console.log($("#p1red").data('color'));
});