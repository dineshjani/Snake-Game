function init() {
    console.log("init");
    canvas = document.getElementById('canvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    box = {
        x: 10,
        y: 10,
        w: 20,
        h: 20,
        v: 5
    };

}

function draw() {
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "white";
    pen.fillRect(box.x, box.y, box.w, box.h);
}

function update() {
    box.x = box.x + box.v;
    if (box.x >= W || box.x <= 0) {
        box.v = box.v * -1;
    }
}

function loop() {
    draw();
    update();
}
init();
loop();
setInterval(loop, 100);