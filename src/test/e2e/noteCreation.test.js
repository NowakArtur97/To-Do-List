import Page from "../testUtil/Page";

const page = new Page();
const uri = "http://localhost:8081/";

beforeEach(async () => {
  await page.openBrowser(uri);
}, 15000);

afterEach(async () => {
  await page.closeBrowser();
}, 15000);

test("should create note", async () => {
  const noteDescriptionExpected = "note description";

  await page.waitForLoader();
  await page.createNoteWithDescription(noteDescriptionExpected);

  let notesDescriptions = await page.getAllNotesDescriptions();

  expect(notesDescriptions).toContain(noteDescriptionExpected);
}, 15000);
