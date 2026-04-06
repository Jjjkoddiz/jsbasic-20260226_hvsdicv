function initCarousel() {
  const carouselInner = document.querySelector(".carousel__inner");
  const rightArrow = document.querySelector(".carousel__arrow_right");
  const leftArrow = document.querySelector(".carousel__arrow_left");

  const slides = Array.from(document.querySelectorAll(".carousel__slide"));
  const slidesCount = slides.length;

  const slideWidth = slides[0].offsetWidth;

  let currentSlideIndex = 0;

  function updateCarousel() {
    const offset = -slideWidth * currentSlideIndex;
    carouselInner.style.transform = `translateX(${offset}px)`;

    if (currentSlideIndex === 0) {
      leftArrow.style.display = "none";
    } else {
      leftArrow.style.display = "";
    }

    if (currentSlideIndex === slidesCount - 1) {
      rightArrow.style.display = "none";
    } else {
      rightArrow.style.display = "";
    }
  }

  rightArrow.addEventListener("click", () => {
    if (currentSlideIndex < slidesCount - 1) {
      currentSlideIndex++;
      updateCarousel();
    }
  });

  leftArrow.addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateCarousel();
    }
  });

  updateCarousel();
}
