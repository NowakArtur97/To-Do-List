import Page from '../testUtil/Page';

const page = new Page();
const uri = "http://localhost:8081/";

beforeAll(async () => {
  await page.openBrowser();
}, 30000);

beforeEach(async () => {
  await page.openPage(uri);
}, 15000);

afterEach(async () => {
  await page.closePage();
}, 15000);

afterAll(async () => {
  await page.closeBrowser();
}, 30000);

test("should delete one note", async () => {
  await page.waitForLoader();

  const numberOfNotesExpected = (await page.getAllNotesElements()).length - 1;
  const noteToDeleteIdExpected = 1;

  await page.deleteNoteById(noteToDeleteIdExpected);

  const numberOfNotesActual = (await page.getAllNotesElements()).length;

  expect(numberOfNotesActual).toBe(numberOfNotesExpected);
}, 25000);
