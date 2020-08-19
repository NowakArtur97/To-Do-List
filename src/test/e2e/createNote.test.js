import Page from "../testUtil/Page";

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

test("should create note", async () => {
  await page.waitForLoader();

  const noteIdExpected = +(await page.getAllNotesElements()).length + 1;
  const noteDescriptionExpected = "to do";
  const noteStatusExpected = "active";
  const noteColorExpected = "#cbfafa";
  const noteTypeExpected = "dumbbell";

  await page.createNote(
    noteDescriptionExpected,
    noteColorExpected,
    noteTypeExpected
  );

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

test("should create note with only description", async () => {
  const noteDescriptionExpected = "note description";

  await page.waitForLoader();
  await page.createNoteWithDescription(noteDescriptionExpected);

  const notesDescriptions = await page.getAllNotesDescriptions();

  expect(notesDescriptions).toContain(noteDescriptionExpected);
}, 15000);

test("should not create note with empty description", async () => {
  const notesAmountExpected = await page.getAllNotesElements().length;

  await page.waitForLoader();
  await page.createNoteWithDescription("");

  const notesAmountActual = await page.getAllNotesElements().length;

  expect(notesAmountActual).toBe(notesAmountExpected);
}, 15000);

test("should not create note with blank description", async () => {
  const notesAmountExpected = await page.getAllNotesElements().length;

  await page.waitForLoader();
  await page.createNoteWithDescription("     ");

  const notesAmountActual = await page.getAllNotesElements().length;

  expect(notesAmountActual).toBe(notesAmountExpected);
}, 15000);
