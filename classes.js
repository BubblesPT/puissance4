class player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    name() {
        return this.name;
    }

    color(){
        return this.color;
    }
}

class connect4 {
    constructor(rows, columns, selector, p1, p2) {
        if (rows < 6){
            rows = 6;
        }
        if (columns < 7){
            columns = 7;
        }
        this.rows = rows;
        this.columns = columns;
        this.selector = selector;
        this.player = p1;
        this.player1color = p1;
        this.player2color = p2;
        //this.playerName = 'default';
        this.isGameOver = false;
        this.createGrid();
        this.setupEventListeners();
        localStorage.setItem('turn', 1);
    }


    createGrid(){
        const $board = $(this.selector);
        $board.empty();
        this.isGameOver = false;
        localStorage.clear();
        localStorage.setItem('gameover', false);
        localStorage.setItem('turn', 1);
        this.player = this.player1color;
        for (let row = 0; row < this.rows; row++){

            const $row = $('<div>').addClass('row');

            for (let col = 0; col < this.columns; col++){

                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row);
                $row.append($col);

            }
            $board.append($row);
        }


    }

    setupEventListeners(){
        const $board = $(this.selector);
        const that = this;


        function findLastEmptyCell(col){
            const cells = $(`.col[data-col='${col}']`);
            for (let i = cells.length - 1; i >= 0; i--){
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')){
                    return $cell;
                }

            }
            return null;
        }

        $board.on("mouseenter", '.col.empty', function () {
            if (that.isGameOver) return;
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);

        });

        $board.on("mouseleave", '.col', function () {
            $('.col').removeClass(`next-${that.player}`);
        });

        $board.on("click", ".col.empty", function () {
            if (that.isGameOver) return;

            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player',that.player);

            const winner = that.checkForWinner($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
            if (winner){
                that.isGameOver = true;
                localStorage.setItem('gameover', true);
                alert(`GAME OVER! ${that.player} Player has won!`);
                if (that.player === that.player1color){

                    $("#countP1").html(parseInt($("#countP1").html(),10) + 1);
                } else {

                    $("#countP2").html(parseInt($("#countP2").html(),10) + 1);
                }
                $('.col.empty').removeClass('empty');
                return;
            }

            //that.player = (that.player === 'red') ? 'blue' : 'red';
            that.player = (that.player === that.player1color) ? that.player2color : that.player1color;
            $(this).trigger('mouseenter');

        });
    }

    checkForWinner(row, col){

        const that = this;

        function $getCell(i, j) {

            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while(i >=0 &&
                i < that.rows &&
                j >= 0 &&
                j < that.columns &&
                $next.data('player') === that.player
                ){
                total ++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i,j);

            }
            return total;
        }
        
        function checkWin(directionA, directionB) {
            const total = 1 +
                checkDirection(directionA) +
                checkDirection(directionB);

            if (total >= 4){
                return that.player;
            } else{
                return null;
            }
        }


        function checkDiagonalBLtoTR() {
            return checkWin({i: 1, j: -1}, {i: 1, j: 1});
        }

        function checkDiagonalTLtoBR() {
            return checkWin({i: 1, j: 1}, {i: -1, j: -1});
        }

        function checkVerticals() {
            return checkWin({i: -1, j: 0}, {i: 1, j: 0});
        }

        function checkHorizontals() {
            return checkWin({i: 0, j: -1}, {i: 0, j: 1});
        }

        return checkVerticals() ||
            checkHorizontals() ||
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR();

    }

    restart(){
        this.createGrid();
        localStorage.setItem('turn', 1);
    }

    /*rows() {
        return this.rows;
    }

    columns(){
        return this.columns;
    }*/
}