import PuppeteerUtil from "./PuppeteerUtil";

export default class Page {
  constructor() {
    this.puppeteerUtil = new PuppeteerUtil();
  }

  async openBrowser(uri) {
    await this.puppeteerUtil.openBrowser();
    await this.puppeteerUtil.openNewPage();
    await this.puppeteerUtil.goTo(uri);
  }

  async closeBrowser() {
    await this.puppeteerUtil.closeBrowser();
  }

  async waitForLoader() {
    await this.puppeteerUtil.waitFor(10000);
  }

  async createNoteWithDescription(description) {
    await this.puppeteerUtil.clickElement(".note_form_popup_trigger");
    await this.puppeteerUtil.clickElement("textarea#description");
    await this.puppeteerUtil.typeText("textarea#description", description);
    await this.puppeteerUtil.clickElement(".note_form__btn");
  }

  async getAllNotesDescriptions() {
    return await this.puppeteerUtil.getAllNotesDescriptions();
  }
}
