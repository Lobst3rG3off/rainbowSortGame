const rainbowApp = {};

rainbowApp.list = document.getElementById("list");
rainbowApp.isRight = "Not In Order!";

rainbowApp.genRandom = () => {
  const orderedRainbow = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
  ];
  rainbowApp.base = orderedRainbow.slice();
  rainbowApp.randomized = orderedRainbow.sort(() => Math.random() - 0.5);

  // recursion to account if the randomization returns the original array
  if (rainbowApp.randomized.join("") === rainbowApp.base.join("")) {
    rainbowApp.genRandom();
  }
};

rainbowApp.renderItems = () => {
  document.getElementById("isRight").innerText = rainbowApp.isRight;
  rainbowApp.list.innerText = "";
  rainbowApp.randomized.forEach(item => {
    const node = document.createElement("li");
    node.draggable = true;
    node.style.backgroundColor = item;
    node.addEventListener("drag", rainbowApp.setDragging);
    node.addEventListener("dragover", rainbowApp.setDraggedOver);
    node.addEventListener("drop", rainbowApp.compare);
    node.innerText = item;
    rainbowApp.list.appendChild(node);
  });
};

rainbowApp.compare = () => {
  const index1 = rainbowApp.randomized.indexOf(rainbowApp.dragging);
  const index2 = rainbowApp.randomized.indexOf(rainbowApp.draggedOver);
  rainbowApp.randomized.splice(index1, 1);
  rainbowApp.randomized.splice(index2, 0, rainbowApp.dragging);

  rainbowApp.isRight =
    rainbowApp.randomized.join("") === rainbowApp.base.join("")
      ? "You Did It!"
      : "Not In Order!";

  rainbowApp.renderItems();
};

rainbowApp.setDraggedOver = e => {
  e.preventDefault();
  rainbowApp.draggedOver = Number.isNaN(parseInt(e.target.innerText, 10))
    ? e.target.innerText
    : parseInt(e.target.innerText, 10);
};

rainbowApp.setDragging = e => {
  rainbowApp.dragging = Number.isNaN(parseInt(e.target.innerText, 10))
    ? e.target.innerText
    : parseInt(e.target.innerText, 10);
};

rainbowApp.init = () => {
  rainbowApp.genRandom();
  rainbowApp.renderItems();
};

rainbowApp.init();
