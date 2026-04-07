import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.leftArrow = this.elem.querySelector(".ribbon__arrow_left");
    this.rightArrow = this.elem.querySelector(".ribbon__arrow_right");

    this.initEventListeners();
    this.updateArrows();
  }

  render() {
    const ribbon = document.createElement("div");
    ribbon.classList.add("ribbon");

    const leftArrow = document.createElement("button");
    leftArrow.classList.add("ribbon__arrow_left");
    leftArrow.innerHTML = "‹";
    ribbon.appendChild(leftArrow);

    const inner = document.createElement("div");
    inner.classList.add("ribbon__inner");

    this.categories.forEach((category, index) => {
      const link = document.createElement("a");
      link.href = "#";
      link.classList.add("ribbon__item");
      link.dataset.id = category.id;
      link.textContent = category.name;
      if (index === 0) {
        link.classList.add("ribbon__item_active");
      }
      inner.appendChild(link);
    });

    ribbon.appendChild(inner);

    const rightArrow = document.createElement("button");
    rightArrow.classList.add("ribbon__arrow_right");
    rightArrow.innerHTML = "›";
    ribbon.appendChild(rightArrow);

    return ribbon;
  }

  initEventListeners() {
    this.leftArrow.addEventListener("click", (event) => {
      event.preventDefault();
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.rightArrow.addEventListener("click", (event) => {
      event.preventDefault();
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonInner.addEventListener("scroll", () => this.updateArrows());

    this.elem.addEventListener("click", (event) => {
      const item = event.target.closest(".ribbon__item");
      if (!item) return;

      event.preventDefault();

      const activeItems = this.elem.querySelectorAll(".ribbon__item_active");
      activeItems.forEach((active) =>
        active.classList.remove("ribbon__item_active"),
      );

      item.classList.add("ribbon__item_active");

      const customEvent = new CustomEvent("ribbon-select", {
        detail: item.dataset.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(customEvent);
    });
  }

  updateArrows() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.leftArrow.classList.remove("ribbon__arrow_visible");
    } else {
      this.leftArrow.classList.add("ribbon__arrow_visible");
    }

    if (scrollRight < 1) {
      this.rightArrow.classList.remove("ribbon__arrow_visible");
    } else {
      this.rightArrow.classList.add("ribbon__arrow_visible");
    }
  }
}
