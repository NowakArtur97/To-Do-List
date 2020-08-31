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

each(["dumbbell", "handshake", "birthday-cake", "book", "shopping-cart"]).test(
  "should find note by type (%s) using search option",
  async (noteTypeExpected) => {
    await page.waitForLoader();
    const notesExpectedAmount =
      Math.floor((await page.countNumberOfElements("[data-id]")) / 5) + 1;

    await page.createNote("to do", "#1444e1", noteTypeExpected);
    await page.searchNoteByType(noteTypeExpected);
    await page.waitForLoader();

    const notesTypeActual = await page.getAllNotesTypes();
    const numberOfNotesActual = await page.countNumberOfElements("[data-id]");

    for (let i = 0; i < notesTypeActual.length; i++) {
      expect(notesTypeActual[i]).toBe(noteTypeExpected);
    }
    expect(numberOfNotesActual).toBe(notesExpectedAmount);
  },
  125000
);

each(["dumbbell", "handshake", "birthday-cake", "book", "shopping-cart"]).test(
  "should find note by type (%s) by clicking note type",
  async (noteTypeExpected) => {
    await page.waitForLoader();
    const notesExpectedAmount =
      Math.floor((await page.countNumberOfElements("[data-id]")) / 5) + 1;
    await page.createNote("to do", "#1444e1", noteTypeExpected);
    await page.searchNoteByTypeUsingNote(noteTypeExpected);
    await page.waitForLoader();

    const notesTypeActual = await page.getAllNotesTypes();
    const numberOfNotesActual = await page.countNumberOfElements("[data-id]");

    for (let i = 0; i < notesTypeActual.length; i++) {
      expect(notesTypeActual[i]).toBe(noteTypeExpected);
    }

    expect(numberOfNotesActual).toBe(notesExpectedAmount);
  },
  125000
);

test("should find note by description", async () => {
  const noteDescriptionExpected = "note description";

  await page.waitForLoader();
  await page.createNoteWithDescription(noteDescriptionExpected);
  await page.searchNoteByDescription(noteDescriptionExpected);

  const numberOfNotesActual = await page.countNumberOfElements("[data-id]");
  const notesDescriptions = await page.getAllNotesDescriptions();

  expect(numberOfNotesActual).toBe(1);
  expect(notesDescriptions).toContain(noteDescriptionExpected);
}, 25000);

test("should show all notes after canceling searching", async () => {
  const noteDescriptionExpected = "note description";

  await page.waitForLoader();
  await page.createNoteWithDescription(noteDescriptionExpected);

  const numberOfNotesExpected = await page.countNumberOfElements("[data-id]");

  await page.searchNoteByDescription(noteDescriptionExpected);
  await page.cancelSearching();

  const numberOfNotesActual = await page.countNumberOfElements("[data-id]");

  expect(numberOfNotesActual).toBe(numberOfNotesExpected);
}, 25000);

test("should not show any notes if none were found", async () => {
  const noteDescriptionExpected = "content of the not found note";

  await page.waitForLoader();
  await page.searchNoteByDescription(noteDescriptionExpected);

  const numberOfNotesActual = await page.countNumberOfElements("[data-id]");

  expect(numberOfNotesActual).toBe(0);
}, 25000);
