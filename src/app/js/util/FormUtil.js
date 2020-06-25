export default class FormUtil {
  extractData(form) {
    return [...form.elements].reduce((data, element) => {
      if (element.name && element.value) {
        data[element.name] = element.value;
      }
      return data;
    }, {});
  }
}
