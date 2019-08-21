/* model.js */

export default class Model {
  constructor() {
    this.fontLabels = []; /* Font labels */
    this.addedFontsLabels = []; /* Added fonts labels */
  }

  /**
   * Set array with font labels.
   *
   * @param {Object} fontNodes - HTML Collection of <option> elements
   * @returns {Number}
   */
  setFontLabels(fontNodes) {
    /* Store font labels */
    for (const font of fontNodes) {
      this.fontLabels.push(font.label);
    }

    return this.fontLabels.length;
  }

  /**
   * @returns {Array}
   */
  getFontLabels() {
    return this.fontLabels;
  }

  /**
   * Set array with labels of added fonts.
   *
   * @param   {Object}  list  - NodeList that contains font labels
   * @returns {Array}         - List of labels of added fonts
   */
  setAddedFontsList(list) {
    this.addedFontsLabels = [];

    for (const li of list) {
      /* Label is in li.firstChild.textContent */
      this.addedFontsLabels.push(li.firstChild.textContent);
    }

    return this.addedFontsLabels;
  }
}
