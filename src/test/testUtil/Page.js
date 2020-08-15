const puppeteer = require("puppeteer");

export default class Page {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async openBrowser(uri) {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: ["--start-maximized"],
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    this.page.goto(uri);
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async waitForLoader() {
    await this.page.waitFor(10000);
  }

  async createNoteWithDescription(description) {
    await this.page.click(".note_form_popup_trigger");
    await this.page.click("textarea#description");
    await this.page.type("textarea#description", description);
    await this.page.click(".note_form__btn");
  }

  async getAllNotesDescriptions() {
    return await this.page.evaluate(() => {
      let data = [];
      let elements = document.querySelectorAll(".note .note__description");
      for (var element of elements) data.push(element["textContent"]);
      return data;
    });
  }
}
