export default class FormUtil {
  extractData(form) {
    return [...form.elements].reduce((data, element) => {
      if (
        (element.type === "radio" && element.checked) ||
        (element.name && element.value && element.type !== "radio")
      ) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }

  populateData(form, data) {
    const elements = [...form.elements];

    const isRadioWithSameValue = (el, value) =>
      el.type === "radio" && el.value === value;

    for (let key of Object.keys(data)) {
      const element = elements.find(
        (el) =>
          isRadioWithSameValue(el, data[key]) ||
          (el.name === key && el.type !== "radio")
      );
      if (element) {
        if (element.type === "radio") {
          element.checked = true;
        } else {
          element.value = data[key];

          if (element.type === "color") {
            form.style.backgroundColor = data[key];
          }
        }
      }
    }
  }

  resetForm(form) {
    form.reset();
    [...form.elements].forEach((element) => {
      if (element.type === "hidden") {
        element.value = "";
      }
    });
  }
}
