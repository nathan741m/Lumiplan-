let db = JSON.parse(localStorage.getItem("busDB")) || [];
let current = localStorage.getItem("currentLine");

/* LOGIN */
function login() {
    let code = document.getElementById("code").value.trim();
    if(code === "1953") location.href = "menu.html";
}

/* MENU */
if(document.getElementById("lines")) {
    renderLines();
}

function renderLines() {
    let container = document.getElementById("lines");
    container.innerHTML = "";

    db.forEach((l, i) => {
        let btn = document.createElement("button");
        btn.innerText = l.line + " - " + l.destination;
        btn.onclick = () => {
            localStorage.setItem("currentLine", i);
            location.href = "settings.html";
        };
        container.appendChild(btn);
    });
}

function createLine() {
    db.push({
        line: "001",
        destination: "Destination",
        direction: "Direction",
        stops: ["A", "B"],
        index: 0
    });
    save();
    renderLines();
}

/* SETTINGS */
if(document.getElementById("line")) loadSettings();

function loadSettings() {
    let l = db[current];

    document.getElementById("line").value = l.line;
    document.getElementById("destination").value = l.destination;
    document.getElementById("direction").value = l.direction;
    document.getElementById("index").value = l.index;

    renderStops();
}

function renderStops() {
    let container = document.getElementById("stops");
    container.innerHTML = "";

    db[current].stops.forEach((s, i) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <input value="${s}" onchange="db[current].stops[${i}] = this.value">
        `;
        container.appendChild(div);
    });
}

function addStop() {
    db[current].stops.push("New stop");
    renderStops();
}

function saveLine() {
    let l = db[current];

    l.line = document.getElementById("line").value;
    l.destination = document.getElementById("destination").value;
    l.direction = document.getElementById("direction").value;
    l.index = parseInt(document.getElementById("index").value);

    save();
    alert("Saved");
}

function save() {
    localStorage.setItem("busDB", JSON.stringify(db));
}

function goDisplay() {
    location.href = "display.html";
}

/* DISPLAY */
if(document.getElementById("top")) renderDisplay();

function renderDisplay() {
    let l = db[current];

    document.getElementById("top").innerText =
        l.line + " " + l.destination + "\n" + l.direction;

    let stopsDiv = document.getElementById("stops");
    stopsDiv.innerHTML = "";

    let width = 100 / (l.stops.length - 1);

    l.stops.forEach((s, i) => {
        let div = document.createElement("div");
        div.className = "stop";
        div.style.left = (i * width) + "%";
        div.innerHTML = `<div>${s}</div><div class="dot"></div>`;
        stopsDiv.appendChild(div);
    });

    document.getElementById("triangle").style.left =
        (l.index * width) + "%";

    let next = l.stops[l.index + 1] || "TERMINUS";

    document.getElementById("next").innerText =
        "Prochain arrêt : " + next;
}
