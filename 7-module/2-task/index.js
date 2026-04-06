import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.title = "";
    this.bodyNode = null;
    this.element = null;
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  _handleKeydown(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }

  setTitle(title) {
    this.title = title;
    if (this.element) {
      this._updateTitle();
    }
  }

  setBody(node) {
    this.bodyNode = node;
    if (this.element) {
      this._updateBody();
    }
  }

  _updateTitle() {
    const titleElem = this.element.querySelector(".modal__title");
    if (titleElem) {
      titleElem.textContent = this.title;
    }
  }

  _updateBody() {
    const bodyElem = this.element.querySelector(".modal__body");
    if (bodyElem) {
      bodyElem.innerHTML = "";
      if (this.bodyNode) {
        bodyElem.appendChild(this.bodyNode);
      }
    }
  }

  _createModalElement() {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const overlay = document.createElement("div");
    overlay.classList.add("modal__overlay");

    const container = document.createElement("div");
    container.classList.add("modal__container");

    const header = document.createElement("div");
    header.classList.add("modal__header");

    const titleElem = document.createElement("div");
    titleElem.classList.add("modal__title");
    titleElem.textContent = this.title;

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("modal__close");
    closeBtn.textContent = "✕";

    header.appendChild(titleElem);
    header.appendChild(closeBtn);

    const bodyElem = document.createElement("div");
    bodyElem.classList.add("modal__body");
    if (this.bodyNode) {
      bodyElem.appendChild(this.bodyNode);
    }

    container.appendChild(header);
    container.appendChild(bodyElem);
    modal.appendChild(overlay);
    modal.appendChild(container);

    return modal;
  }

  open() {
    if (this.element) return;

    this.element = this._createModalElement();
    document.body.appendChild(this.element);
    document.body.classList.add("is-modal-open");

    const closeButton = this.element.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());

    document.addEventListener("keydown", this._handleKeydown);
  }

  close() {
    if (!this.element) return;

    document.body.classList.remove("is-modal-open");

    document.removeEventListener("keydown", this._handleKeydown);

    this.element.remove();
    this.element = null;
  }
}
