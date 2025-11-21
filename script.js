const wrapper = document.getElementById("wrapper");
const carousel = document.getElementById("carousel");

// Duplica imágenes para tener loop infinito
function duplicate() {
  const original = Array.from(carousel.children);
  original.forEach(el => {
    const clone = el.cloneNode(true);
    carousel.appendChild(clone);
  });
}
duplicate();

// Scroll vertical del mouse → mueve horizontalmente
wrapper.addEventListener("wheel", (e) => {
  e.preventDefault();
  wrapper.scrollLeft += e.deltaY;
});

// Loop infinito: cuando llegas al final o al inicio, lo reinicias suavemente
function loopScroll() {
  const scrollWidth = carousel.scrollWidth;
  const wrapperWidth = wrapper.offsetWidth;

  wrapper.addEventListener("scroll", () => {
    if (wrapper.scrollLeft + wrapperWidth >= scrollWidth) {
      // al final
      wrapper.scrollLeft = wrapper.scrollLeft - scrollWidth / 2;
    } else if (wrapper.scrollLeft <= 0) {
      // al inicio
      wrapper.scrollLeft = scrollWidth / 2;
    }
  });
}

loopScroll();
