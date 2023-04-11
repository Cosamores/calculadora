const floatingButton = document.querySelector('#floating-button');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('.close');

function toggleModal() {
  if (isButtonDragged) {
    isButtonDragged = false;
    return;
  }
  
  if (modal.classList.contains('open')) {
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('open');
      modal.classList.remove('closing');
    }, 300);
  } else {
    modal.classList.add('open');
  }
}

floatingButton.addEventListener('click', toggleModal);
floatingButton.addEventListener('touchend', (e) => {
  if (!isMouseDown) return;
  toggleModal();
  e.preventDefault();
});

closeModal.addEventListener('click', toggleModal);

let isMouseDown = false;
let isButtonDragged = false;
let offsetX, offsetY;
let lastMouseX;

function handlePointerDown(e) {
  e.preventDefault();
  isMouseDown = true;
  let clientX = e.clientX || e.touches[0].clientX;
  let clientY = e.clientY || e.touches[0].clientY;
  offsetX = floatingButton.offsetLeft - clientX;
  offsetY = floatingButton.offsetTop - clientY;
  lastMouseX = clientX;
}
function handlePointerMove(e) {
  if (!isMouseDown) return;

  let clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
  let clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

  if (!clientX || !clientY) return;

  isButtonDragged = true;

  let newLeft = clientX + offsetX;
  let newTop = clientY + offsetY;

  // Limit the button's movement to the window's dimensions
  newLeft = Math.max(0, Math.min(window.innerWidth - floatingButton.offsetWidth, newLeft));
  newTop = Math.max(0, Math.min(window.innerHeight - floatingButton.offsetHeight, newTop));

  floatingButton.style.left = newLeft + 'px';
  floatingButton.style.top = newTop + 'px';

  let dx = clientX - lastMouseX;
  let rotationDirection = dx > 0 ? 1 : -1;
  floatingButton.style.transform = `rotate(${rotationDirection * 180}deg)`;

  lastMouseX = clientX;
}


function handlePointerUp() {
  isMouseDown = false;
}

floatingButton.addEventListener('mousedown', handlePointerDown);
floatingButton.addEventListener('touchstart', handlePointerDown);
document.addEventListener('mousemove', handlePointerMove);
document.addEventListener('touchmove', handlePointerMove);
document.addEventListener('mouseup', handlePointerUp);
document.addEventListener('touchend', handlePointerUp);
