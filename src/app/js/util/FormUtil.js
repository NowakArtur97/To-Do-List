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
    for (let key of Object.keys(data)) {
      const element = elements.find((el) => el.name === key);
      if (element) {
        element.value = data[key];
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
