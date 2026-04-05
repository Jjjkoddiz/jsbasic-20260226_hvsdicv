import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._currentSlide = 0;
    this._elem = null;
    this._render();
    this._initCarousel();
    this._addEventListeners();
  }

  _render() {
    this._elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    const inner = this._elem.querySelector(".carousel__inner");

    for (let slide of this.slides) {
      const slideElem = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      inner.append(slideElem);
    }
  }

  _initCarousel() {
    const inner = this._elem.querySelector(".carousel__inner");
    const leftArrow = this._elem.querySelector(".carousel__arrow_left");
    const rightArrow = this._elem.querySelector(".carousel__arrow_right");
    const slidesCount = this.slides.length;

    const update = () => {
      const slideWidth =
        this._elem.querySelector(".carousel__slide").offsetWidth;
      const offset = -this._currentSlide * slideWidth;
      inner.style.transform = `translateX(${offset}px)`;

      if (this._currentSlide === 0) {
        leftArrow.style.display = "none";
      } else {
        leftArrow.style.display = "";
      }

      if (this._currentSlide === slidesCount - 1) {
        rightArrow.style.display = "none";
      } else {
        rightArrow.style.display = "";
      }
    };

    rightArrow.addEventListener("click", () => {
      if (this._currentSlide < slidesCount - 1) {
        this._currentSlide++;
        update();
      }
    });

    leftArrow.addEventListener("click", () => {
      if (this._currentSlide > 0) {
        this._currentSlide--;
        update();
      }
    });

    update();

    window.addEventListener("resize", () => {
      update();
    });
  }

  _addEventListeners() {
    this._elem.addEventListener("click", (event) => {
      const button = event.target.closest(".carousel__button");
      if (!button) return;

      const slide = button.closest(".carousel__slide");
      if (!slide) return;

      const slideId = slide.dataset.id;
      const customEvent = new CustomEvent("product-add", {
        detail: slideId,
        bubbles: true,
      });
      this._elem.dispatchEvent(customEvent);
    });
  }

  get elem() {
    return this._elem;
  }
}
