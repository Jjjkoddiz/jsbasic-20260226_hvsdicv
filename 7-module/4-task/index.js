export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._dragging = false;
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this.render();
    this.initEventListeners();
    this.setValue(value);
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");

    this.thumb = document.createElement("div");
    this.thumb.classList.add("slider__thumb");
    this.thumb.ondragstart = () => false;

    this.thumbValue = document.createElement("span");
    this.thumbValue.classList.add("slider__value");
    this.thumb.appendChild(this.thumbValue);

    this.progress = document.createElement("div");
    this.progress.classList.add("slider__progress");

    this.stepsContainer = document.createElement("div");
    this.stepsContainer.classList.add("slider__steps");

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");
      this.stepsContainer.appendChild(step);
    }

    this.elem.appendChild(this.thumb);
    this.elem.appendChild(this.progress);
    this.elem.appendChild(this.stepsContainer);
  }

  initEventListeners() {
    this.thumb.addEventListener("pointerdown", this._onPointerDown.bind(this));
    this.elem.addEventListener("click", this._onClick.bind(this));
  }

  _onPointerDown(event) {
    event.preventDefault();
    this._dragging = true;
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this._onPointerMove);
    document.addEventListener("pointerup", this._onPointerUp);
  }

  _onPointerMove(event) {
    if (!this._dragging) return;
    event.preventDefault();

    const rect = this.elem.getBoundingClientRect();
    let leftRelative = (event.clientX - rect.left) / rect.width;
    leftRelative = Math.min(1, Math.max(0, leftRelative));
    const leftPercents = leftRelative * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const newValue = Math.round(approximateValue);
    if (this.value !== newValue) {
      this.value = newValue;
      this._updateDisplay();
    }
  }

  _onPointerUp(event) {
    if (!this._dragging) return;
    this._dragging = false;
    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this._onPointerMove);
    document.removeEventListener("pointerup", this._onPointerUp);

    this._updatePositionFromValue();
    this._emitChange();
  }

  _onClick(event) {
    if (event.target.closest(".slider__thumb")) return;

    const rect = this.elem.getBoundingClientRect();
    let leftRelative = (event.clientX - rect.left) / rect.width;
    leftRelative = Math.min(1, Math.max(0, leftRelative));
    const segments = this.steps - 1;
    const newValue = Math.round(leftRelative * segments);
    this.setValue(newValue);
    this._emitChange();
  }

  _updatePositionFromValue() {
    const segments = this.steps - 1;
    const percent = (this.value / segments) * 100;
    this.thumb.style.left = `${percent}%`;
    this.progress.style.width = `${percent}%`;
  }

  setValue(value) {
    if (value < 0) value = 0;
    if (value > this.steps - 1) value = this.steps - 1;
    this.value = value;
    this._updatePositionFromValue();
    this._updateDisplay();
  }

  _updateDisplay() {
    this.thumbValue.textContent = this.value;

    const steps = this.stepsContainer.querySelectorAll("span");
    steps.forEach((step, idx) => {
      if (idx === this.value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });
  }

  _emitChange() {
    const event = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  }
}
