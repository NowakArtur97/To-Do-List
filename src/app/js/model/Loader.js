import DOMClasses from "../dom/DOMClasses";

export default class Loader {
  constructor() {
    this.LOADER_ANIMATION_DURATION = 4600;
  }

  init() {
    const loaderContainer = document.createElement("div");
    loaderContainer.classList.add(DOMClasses.loader.container);

    const loader = document.createElement("div");
    loader.classList.add(DOMClasses.loader.main);

    const blueItem = document.createElement("div");
    blueItem.classList.add(DOMClasses.loader.item);
    blueItem.classList.add(DOMClasses.loader.blueItem);

    const yellowItem = document.createElement("div");
    yellowItem.classList.add(DOMClasses.loader.item);
    yellowItem.classList.add(DOMClasses.loader.yellowItem);

    const redItem = document.createElement("div");
    redItem.classList.add(DOMClasses.loader.item);
    redItem.classList.add(DOMClasses.loader.redItem);

    const purpleItem = document.createElement("div");
    purpleItem.classList.add(DOMClasses.loader.item);
    purpleItem.classList.add(DOMClasses.loader.purpleItem);

    const loadingText = document.createElement("p");
    loadingText.classList.add(DOMClasses.loader.text);
    loadingText.innerText = "Loading........";

    blueItem.appendChild(loadingText);
    yellowItem.appendChild(loadingText.cloneNode(true));
    redItem.appendChild(loadingText.cloneNode(true));
    purpleItem.appendChild(loadingText.cloneNode(true));

    loader.appendChild(blueItem);
    loader.appendChild(yellowItem);
    loader.appendChild(redItem);
    loader.appendChild(purpleItem);

    loaderContainer.appendChild(loader);
    document.body.appendChild(loaderContainer);

    setTimeout(() => loaderContainer.remove(), this.LOADER_ANIMATION_DURATION);
  }
}
