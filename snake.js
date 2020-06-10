function loadimage() {
    dead = new Audio();
    eat = new Audio();
    up = new Audio();
    down = new Audio();
    left = new Audio();
    right = new Audio();
    down.src = "down.mp3";
    left.src = "left.mp3";
    dead.src = "dead.mp3";
    eat.src = "eat.mp3";
    up.src = "up.mp3";
    right.src = "right.mp3";
    ground = new Image();
    ground.src = "img/ground.png";

}

function init() {
    console.log("init");
    canvas = document.getElementById('canvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    Score = 5;
    game_over = false;
    food = getRandomFood();
    snake = {
        length: 5,
        color: "aqua",
        cells: [],
        darection: "right",
        creatsnake: function() {
            for (var i = this.length; i >= 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawsnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.strokStyle = "white";
                pen.lineWidth = 4;
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);

                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
            }
        },

        updatesnake: function() {
            var newheadx = this.cells[0].x;
            var newheady = this.cells[0].y;


            if (food.X == newheadx && food.Y == newheady) {
                food = getRandomFood();
                Score = Score + 1;
                eat.play();

            } else {

                this.cells.pop();
            }

            if (this.darection == "right") {
                right.play();
                X = newheadx + 1;
                Y = newheady;
            } else if (this.darection == "left") {
                left.play();
                X = newheadx - 1;
                Y = newheady;
            } else if (this.darection == "down") {
                down.play();
                X = newheadx;
                Y = newheady + 1;
            } else {
                up.play();
                X = newheadx;
                Y = newheady - 1;
            }
            console.log(this.cells[0].x);
            for (let i = 0; i < this.cells.length; i++) {
                if (X == this.cells[i].x && Y == this.cells[i].y) {
                    dead.play();
                    setTimeout(function() { alert("Gameover"); }, 1000);

                }
            }
            this.cells.unshift({ x: X, y: Y });
            console.log(this.cells[0].x);

            var last_x = Math.round(W / 10);
            var last_y = Math.round(H / 10);

            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                dead.play();
                game_over = true;
                alert("GameOver");

            }



        }

    };
    snake.creatsnake();
}
document.addEventListener('keydown', function(e) {

    console.log(e);
    if (e.key == 'ArrowUp') {
        snake.darection = "up";
    }
    if (e.key == 'ArrowDown') {
        snake.darection = "down";
    }
    if (e.key == 'ArrowLeft') {

        snake.darection = "left";
    }
    if (e.key == 'ArrowRight') {
        snake.darection = "right";
    }


});






function draw() {


    pen.clearRect(0, 0, W, H);
    snake.drawsnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.X * 10, food.Y * 10, 10, 10);
    pen.fillStyle = "white";
    pen.font = "14px Roboto";
    pen.fillText("Score " + Score, 10, 10);
}


function update() {

    snake.updatesnake();

}

function getRandomFood() {
    var foodx = Math.round((Math.random() * W - 10) / 10);
    var foody = Math.round((Math.random() * H - 10) / 10);
    foodcolors = ["red", "aqua", "coral", "orchid"];
    var i = Math.round((Math.random() * foodcolors.length));
    var food = {
        X: foodx,
        Y: foody,
        color: foodcolors[i]
    }
    return food;
}

function loop() {
    draw();
    update();
    if (game_over == true) {
        clearInterval(f);
    }
}
loadimage();
init();

var f = setInterval(loop, 100);