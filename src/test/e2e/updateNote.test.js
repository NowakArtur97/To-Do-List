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

test("should create and update note", async () => {
  await page.waitForLoader();

  const noteIdExpected = (await page.getAllNotesElements()).length + 1;

  const updatedNoteDescriptionExpected = "updated task";
  const updatedNoteStatusExpected = "active";
  const updatedNoteColorExpected = "#0215f6";
  const updatedNoteTypeExpected = "book";

  await page.createNote("to do", "#1444e1", "dumbbell");

  await page.updateNote(
    noteIdExpected,
    updatedNoteDescriptionExpected,
    updatedNoteColorExpected,
    updatedNoteTypeExpected
  );

  const noteIdActual = +(await page.getLastCreatedNoteData("id"));
  const notesDescriptionActual = await page.getLastCreatedNoteProperty(
    "textContent"
  );
  const noteStatusActual = await page.getLastCreatedNoteData("status");
  const noteColorActual = await page.getLastCreatedNoteData("noteColor");
  const noteRotationActual = await page.getLastCreatedNoteData("rotation");

  expect(noteIdActual).toBe(noteIdExpected);
  expect(notesDescriptionActual).toContain(updatedNoteDescriptionExpected);
  expect(noteColorActual).toBe(updatedNoteColorExpected);
  expect(noteStatusActual).toBe(updatedNoteStatusExpected);
  expect(noteRotationActual).not.toBeNaN();
}, 25000);

each(["", "     "]).test(
  "should not update note without description",
  async (invalidNoteDescription) => {
    await page.waitForLoader();

    const noteIdExpected = (await page.getAllNotesElements()).length + 1;

    const noteDescriptionExpected = "task";
    const noteStatusExpected = "active";
    const noteColorExpected = "#132114";
    const noteTypeExpected = "handshake";

    const updatedNoteColor = "#0215f6";
    const updatedNoteType = "book";

    await page.createNote(
      noteDescriptionExpected,
      noteColorExpected,
      noteTypeExpected
    );

    await page.updateNote(
      noteIdExpected,
      invalidNoteDescription,
      updatedNoteColor,
      updatedNoteType
    );

    const noteIdActual = +(await page.getLastCreatedNoteData("id"));
    const notesDescriptionActual = await page.getLastCreatedNoteProperty(
      "textContent"
    );
    const noteStatusActual = await page.getLastCreatedNoteData("status");
    const noteColorActual = await page.getLastCreatedNoteData("noteColor");
    const noteRotationActual = await page.getLastCreatedNoteData("rotation");

    expect(noteIdActual).toBe(noteIdExpected);
    expect(notesDescriptionActual).toContain(noteDescriptionExpected);
    expect(noteColorActual).toBe(noteColorExpected);
    expect(noteStatusActual).toBe(noteStatusExpected);
    expect(noteRotationActual).not.toBeNaN();
  },
  25000
);
