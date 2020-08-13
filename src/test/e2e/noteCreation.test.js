import Page from "../testUtil/Page";

const page = new Page();
const uri = "http://localhost:8081/";

beforeEach(async () => {
  await page.openBrowser(uri);
}, 10000);

afterEach(async () => {
  await page.closeBrowser();
}, 10000);

test("should create note", async () => {
  const noteDescriptionExpected = "note description";

  await page.waitForLoader();
  await page.createNoteWithDescription(noteDescriptionExpected);

  let notesDescriptions = await page.getAllNotesDescriptions();

  expect(notesDescriptions).toContain(noteDescriptionExpected);
}, 60000);
