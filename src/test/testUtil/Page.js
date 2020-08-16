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

  async getAllElements(selector) {
    return await this.page.evaluate((selector) => {
      return document.querySelectorAll(selector);
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

  async createNoteWithDescription(description) {
    await this.page.click(".note_form_popup_trigger");
    await this.page.click("textarea#description");
    await this.page.type("textarea#description", description);
    await this.page.click(".note_form__btn");
  }

  async getAllNotesElements() {
    return await this.getAllElements(".note");
  }

  async getAllNotesDescriptions() {
    return await this.getAllElementsProperty(
      ".note .note__description",
      "textContent"
    );
  }
}
