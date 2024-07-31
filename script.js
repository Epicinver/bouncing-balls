const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const ball = {
    x: 400,
    y: 300,
    radius: 10,
    dx: 1,
    dy: 1,
    speed: 1
};

const ring = {
    x: 400,
    y: 300,
    radius: 100
};

const audio = document.getElementById('backgroundMusic');
audio.play();

function drawRing() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBall() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    const dist = Math.sqrt((ball.x - ring.x) ** 2 + (ball.y - ring.y) ** 2);
    if (dist < ring.radius + ball.radius) {
        ball.radius += 1;
        ball.speed += 0.5;
        ball.dx = ball.speed * (ball.dx / Math.abs(ball.dx));
        ball.dy = ball.speed * (ball.dy / Math.abs(ball.dy));
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRing();
    drawBall();
    updateBall();
    requestAnimationFrame(update);
}

update();
