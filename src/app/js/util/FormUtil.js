export default class FormUtil {
  extractData(form) {
    return [...form.elements].reduce((data, element) => {
      if (element.name && element.value) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }

  populateData(form, data) {
    const elements = [...form.elements];
    for (let key of Object.keys(data)) {
      const element = elements.filter((el) => el.name === key)[0];
      if (element) {
        element.value = data[key];
      }
    }
  }
}
