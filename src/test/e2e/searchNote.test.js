import each from 'jest-each';

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

test("should find note by description", async () => {
  const noteDescriptionExpected = "note description";

  await page.waitForLoader();
  await page.createNoteWithDescription(noteDescriptionExpected);
  await page.closeNotePopup();
  await page.searchNoteByDescription(noteDescriptionExpected);

  const notesDescriptions = await page.getAllNotesDescriptions();
  const numberOfNotesActual = (await page.getAllNotesElements()).length;

  expect(notesDescriptions).toContain(noteDescriptionExpected);
  expect(numberOfNotesActual).toBe(1);
}, 25000);

each(["dumbbell", "handshake", "birthday-cake", "book", "shopping-cart"]).test(
  "should find note by type (with %s type)",
  async (noteTypeExpected) => {
    const notesExpectedAmount = 2;

    await page.waitForLoader();
    await page.createNote("to do", "#1444e1", noteTypeExpected);
    await page.closeNotePopup();
    await page.searchNoteByType(noteTypeExpected);
    await page.waitForLoader();

    const notesTypeActual = await page.getAllNotesTypes();
    const numberOfNotesActual = (await page.getAllNotesElements()).length;

    expect(notesTypeActual).toContain(noteTypeExpected);
    expect(numberOfNotesActual).toBe(notesExpectedAmount);
  },
  125000
);
