const floatingButton = document.querySelector('#floating-button');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.close');

floatingButton.addEventListener('click', () => {
  modal.classList.add('open');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('open');
    modal.classList.remove('closing');
  }, 300);
});

let isMouseDown = false;
let offsetX, offsetY;
let lastMouseX;

floatingButton.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isMouseDown = true;
  offsetX = floatingButton.offsetLeft - e.clientX;
  offsetY = floatingButton.offsetTop - e.clientY;
  lastMouseX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  floatingButton.style.left = e.clientX + offsetX + 'px';
  floatingButton.style.top = e.clientY + offsetY + 'px';

  let dx = e.clientX - lastMouseX;
  let rotationDirection = dx > 0 ? 1 : -1;
  floatingButton.style.transform = `rotate(${rotationDirection * 180}deg)`;

  lastMouseX = e.clientX;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});
