const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");

const audioUpload = document.getElementById("audioUpload");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

let audio = new Audio();
let notes = []; // chart data

// Draw lanes
function drawLanes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}

// Audio upload
audioUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        audio.src = URL.createObjectURL(file);
    }
});

// Play / Pause
playBtn.addEventListener("click", () => {
    audio.play();
});

pauseBtn.addEventListener("click", () => {
    audio.pause();
});

canvas.addEventListener("click", function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lane = x < canvas.width / 2 ? 0 : 1;

    const note = {
        lane: lane,
        y: y
    };

    notes.push(note);
    drawNotes();
});

function drawNotes() {
    drawLanes();

    ctx.fillStyle = "cyan";

    notes.forEach(note => {
        const laneX = note.lane === 0 ? 0 : canvas.width / 2;
        ctx.fillRect(laneX + 20, note.y - 5, canvas.width / 2 - 40, 10);
    });
}

// Initial draw
drawLanes();

