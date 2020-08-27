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

test("should create and change note status", async () => {
  await page.waitForLoader();

  const noteIdExpected = (await page.getAllNotesElements()).length + 1;
  const noteDescriptionExpected = "to do";
  const noteStatusExpected = "inactive";
  const noteColorExpected = "#1444e1";
  const noteTypeExpected = "dumbbell";

  await page.createNote(
    noteDescriptionExpected,
    noteColorExpected,
    noteTypeExpected
  );

  await page.changeNoteStatus(noteIdExpected);

  const noteIdActual = +(await page.getLastCreatedNoteData("id"));
  const notesDescriptions = await page.getLastCreatedNoteProperty(
    "textContent"
  );
  const noteStatusActual = await page.getLastCreatedNoteData("status");
  const noteColorActual = await page.getLastCreatedNoteData("noteColor");
  const noteRotationActual = await page.getLastCreatedNoteData("rotation");

  expect(noteIdActual).toBe(noteIdExpected);
  expect(notesDescriptions).toContain(noteDescriptionExpected);
  expect(noteColorActual).toBe(noteColorExpected);
  expect(noteStatusActual).toBe(noteStatusExpected);
  expect(noteRotationActual).not.toBeNaN();
}, 25000);

test("should create and change note status from incative to active", async () => {
  await page.waitForLoader();

  const noteIdExpected = (await page.getAllNotesElements()).length + 1;
  const noteDescriptionExpected = "to do";
  const noteStatusExpected = "active";
  const noteColorExpected = "#1444e1";
  const noteTypeExpected = "dumbbell";

  await page.createNote(
    noteDescriptionExpected,
    noteColorExpected,
    noteTypeExpected
  );

  await page.changeNoteStatus(noteIdExpected);
  await page.changeNoteStatus(noteIdExpected);

  const noteIdActual = +(await page.getLastCreatedNoteData("id"));
  const notesDescriptions = await page.getLastCreatedNoteProperty(
    "textContent"
  );
  const noteStatusActual = await page.getLastCreatedNoteData("status");
  const noteColorActual = await page.getLastCreatedNoteData("noteColor");
  const noteRotationActual = await page.getLastCreatedNoteData("rotation");

  expect(noteIdActual).toBe(noteIdExpected);
  expect(notesDescriptions).toContain(noteDescriptionExpected);
  expect(noteColorActual).toBe(noteColorExpected);
  expect(noteStatusActual).toBe(noteStatusExpected);
  expect(noteRotationActual).not.toBeNaN();
}, 25000);
