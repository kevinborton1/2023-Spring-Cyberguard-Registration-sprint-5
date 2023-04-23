
let draggableList = document.querySelector("#draggable-list");
let dropzone = document.querySelector("#dropzone");

draggableList.addEventListener("dragstart", function (event) {
  event.dataTransfer.setData("text/plain", event.target.textContent);
});

dropzone.addEventListener("dragover", function (event) {
  event.preventDefault();
});

dropzone.addEventListener("drop", function (event) {
  event.preventDefault();
  let item = event.dataTransfer.getData("text/plain");
  dropzone.textContent = item;
});
