const puppeteer = require("puppeteer");

export default class Page {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async openBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: ["--start-maximized"],
    });
  }

  async openPage(uri = "http://localhost:8081/") {
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    this.page.goto(uri);
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async closePage() {
    this.page.close();
  }

  async waitForLoader() {
    await this.page.waitFor(10000);
  }

  async setElementProperty(selector, property, value) {
    await this.page.evaluate(
      (selector, property, value) => {
        document.querySelector(selector)[property] = value;
      },
      selector,
      property,
      value
    );
  }

  async getAllElements(selector) {
    return await this.page.evaluate((selector) => {
      let data = [];
      let elements = document.querySelectorAll(selector);
      for (var element of elements) data.push(element);
      return data;
    }, selector);
  }

  async getAllElementsProperty(selector, property) {
    return await this.page.evaluate(
      (selector, property) => {
        let data = [];
        let elements = document.querySelectorAll(selector);
        for (var element of elements) data.push(element[property]);
        return data;
      },
      selector,
      property
    );
  }

  async createNote(description, color, type) {
    await this.page.click(".note_form_popup_trigger");
    await this.page.click("textarea#description");
    await this.page.type("textarea#description", description);

    await this.setElementProperty("input#noteColor", "value", color);

    await this.page.click(`#${type}`);

    await this.page.click(".note_form__btn");
  }

  async createNoteWithDescription(description) {
    await this.page.click(".note_form_popup_trigger");
    await this.page.click("textarea#description");
    await this.page.type("textarea#description", description);

    await this.page.click(".note_form__btn");
  }

  async getLastCreatedNoteProperty(property) {
    return await this.page.evaluate((property) => {
      const notes = document.querySelectorAll("[data-id]");
      return [...notes].reduce((note, note2) =>
        note.dataset.id > note2.dataset.id ? note : note2
      )[property];
    }, property);
  }

  async getLastCreatedNoteData(data) {
    return await this.page.evaluate((data) => {
      const notes = document.querySelectorAll("[data-id]");
      return [...notes].reduce((note, note2) =>
        note.dataset.id > note2.dataset.id ? note : note2
      ).dataset[data];
    }, data);
  }

  async getAllNotesElements() {
    return await this.getAllElements("[data-id]");
  }

  async getAllNotesDescriptions() {
    return await this.getAllElementsProperty(
      ".note .note__description",
      "textContent"
    );
  }
}
