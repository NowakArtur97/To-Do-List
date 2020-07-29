import DOMClasses from "../dom/DOMClasses";
import DOMElements from "../dom/DOMElements";
import Status from "../state/Status";
import ObserverManager from "../observer/ObserverManager";

export default class CorkBoard {
  constructor(notePopUp, noteForm, noteFilterService) {
    this.notePopUp = notePopUp;
    this.noteForm = noteForm;
    this.noteFilterService = noteFilterService;
    this.events = new ObserverManager("delete", "changeStatus");
    this.isTapped = false;

    this.addEventListeners();
    this.setCorkBoardSize();
  }

  addEventListeners() {
    DOMElements.board.addEventListener(
      "dblclick",
      this.showFormForUpdate.bind(this),
      {
        capture: true,
      }
    );
    DOMElements.board.addEventListener(
      "touchstart",
      this.showFormForUpdateOnMobile.bind(this),
      {
        capture: true,
      }
    );
    DOMElements.board.addEventListener("click", this.triggerAction.bind(this));
    DOMElements.board.addEventListener("click", this.filterByType.bind(this));
    window.addEventListener("resize", this.setCorkBoardSize.bind(this));
  }

  setCorkBoardSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  showFormForUpdate(e) {
    const noteEl = e.target.closest(`.${DOMClasses.note.main}`);

    if (noteEl && noteEl.dataset.status === Status.ACTIVE) {
      this.notePopUp.showPopUp();
      DOMElements.noteFormSubmitBtn.innerText = "Update note";
      this.noteForm.populateForm(noteEl);
    }
  }

  showFormForUpdateOnMobile(e) {
    if (!this.isTapped) {
      this.isTapped = setTimeout(() => {
        this.isTapped = null;
      }, 200);
    } else {
      clearTimeout(this.isTapped);
      this.isTapped = null;
      this.showFormForUpdate(e);
    }
  }

  triggerAction(e) {
    const targetClassList = e.target.classList;
    const parentTargetClassList = e.target.parentElement.classList;
    const isChangeStatusBtn = targetClassList.contains(
      DOMClasses.note.changeStatusBtn
    );
    const isDeleteBtn =
      targetClassList.contains(DOMClasses.note.deleteBtn) ||
      parentTargetClassList.contains(DOMClasses.note.deleteBtn);

    if (isChangeStatusBtn || isDeleteBtn) {
      const noteEl = e.target.closest(`.${DOMClasses.note.main}`);
      const event = isDeleteBtn ? "delete" : "changeStatus";
      this.events.notify(event, noteEl);
    }
  }

  filterByType(e) {
    const statusIconEl = e.target;
    const iconClassList = statusIconEl.classList;
    if (
      iconClassList.contains(DOMClasses.note.icon) ||
      iconClassList.contains(DOMClasses.noteSearch.icon)
    ) {
      const type = e.target.dataset.value;
      this.noteFilterService.filterTasks(type, "type");
    }
  }
}
