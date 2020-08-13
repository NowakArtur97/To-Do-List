const puppeteer = require("puppeteer");

export default class PuppeteerUtil {
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

  async closeBrowser() {
    await this.browser.close();
  }

  async openNewPage() {
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async goTo(uri) {
    this.page.goto(uri);
  }

  async waitFor(time) {
    await this.page.waitFor(time);
  }

  async clickElement(elementSelector) {
    await this.page.click(elementSelector);
  }

  async typeText(elementSelector, text) {
    await this.page.type(elementSelector, text);
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
