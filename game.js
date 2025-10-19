const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const TRACK_WIDTH = 200;
const TRACK_X_START = (canvas.width - TRACK_WIDTH) / 2;

let obstacles = [];

function drawTrack() {
    ctx.fillStyle = '#666'; // Road color
    ctx.fillRect(TRACK_X_START, 0, TRACK_WIDTH, canvas.height);
}

function spawnObstacle() {
    const obstacle = {
        width: 20,
        height: 20,
        x: TRACK_X_START + Math.random() * (TRACK_WIDTH - 20),
        y: -20, // Start above the canvas
        speed: 3
    };
    obstacles.push(obstacle);
}

function updateAndDrawObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        
        // Move obstacle down
        obstacle.y += obstacle.speed;

        // Remove if it's off-screen
        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            continue;
        }

        // Draw the obstacle
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function gameLoop() {
    // Clear the whole canvas (for the grass background)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the track
    drawTrack();

    // Update and draw obstacles
    updateAndDrawObstacles();

    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Start spawning obstacles every second
setInterval(spawnObstacle, 1000);

// Start the game loop
requestAnimationFrame(gameLoop);