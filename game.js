const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = { x: 50, y: 250, width: 20, height: 20, dy: 0 };
let gravity = 0.6;
let jump = -10;

let pipes = [];
let pipeWidth = 40;
let pipeGap = 120;
let frame = 0;
let score = 0;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    });
}

function generatePipes() {
    if (frame % 90 === 0) {
        let top = Math.random() * (canvas.height - pipeGap - 40) + 20;
        pipes.push({ x: canvas.width, top: top, bottom: top + pipeGap });
    }
}

function updatePipes() {
    pipes.forEach(pipe => pipe.x -= 2);
    if (pipes.length && pipes[0].x + pipeWidth < 0) {
        pipes.shift();
        score++;
        document.getElementById('score').textContent = score;
    }
}

function checkCollision() {
    for (let pipe of pipes) {
        if (bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)) {
            return true;
        }
    }
    if (bird.y + bird.height > canvas.height || bird.y < 0) return true;
    return false;
}

function gameLoop() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.dy += gravity;
    bird.y += bird.dy;

    generatePipes();
    updatePipes();

    drawPipes();
    drawBird();

    if (checkCollision()) {
        alert('Oyun Bitti! Skorunuz: ' + score);
        bird.y = 250;
        bird.dy = 0;
        pipes = [];
        score = 0;
        document.getElementById('score').textContent = score;
        frame = 0;
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    if (e.code === 'Space') bird.dy = jump;
});

gameLoop();
