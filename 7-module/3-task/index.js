export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.render();
    this.addEventListeners();
    this.update(this.value);
  }

  render() {
    const slider = document.createElement("div");
    slider.classList.add("slider");

    const thumb = document.createElement("div");
    thumb.classList.add("slider__thumb");
    const valueSpan = document.createElement("span");
    valueSpan.classList.add("slider__value");
    thumb.appendChild(valueSpan);
    slider.appendChild(thumb);

    const progress = document.createElement("div");
    progress.classList.add("slider__progress");
    slider.appendChild(progress);

    const stepsContainer = document.createElement("div");
    stepsContainer.classList.add("slider__steps");
    for (let i = 0; i < this.steps; i++) {
      const stepSpan = document.createElement("span");
      if (i === this.value) {
        stepSpan.classList.add("slider__step-active");
      }
      stepsContainer.appendChild(stepSpan);
    }
    slider.appendChild(stepsContainer);

    return slider;
  }

  addEventListeners() {
    this.elem.addEventListener("click", (event) => this.onClick(event));
  }

  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let newValue = Math.round(approximateValue);
    newValue = Math.min(Math.max(0, newValue), this.steps - 1);

    if (newValue === this.value) return;

    this.value = newValue;
    this.update(this.value);
    this.dispatchEvent();
  }

  update(value) {
    const valueSpan = this.elem.querySelector(".slider__value");
    valueSpan.textContent = value;

    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step, index) => {
      if (index === value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });

    const segments = this.steps - 1;
    let leftPercents = segments === 0 ? 0 : (value / segments) * 100;

    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  dispatchEvent() {
    const event = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  }
}
