/* template.js */

import '../styles/styles.scss';

/**
 * @param {String} HTML representing a single element
 * @returns {Element}
 */
const htmlToElement = (htmlString) => {
  const template = document.createElement('template');
  let htmlElement = htmlString;
  htmlElement = htmlElement.trim(); /* Never return whitespace */
  template.innerHTML = htmlElement;
  return template.content.firstChild;
};

/**
 * Tag function that returns HTML element
 * ready for DOM.
 *
 * @param   {String}  literal - Template literal
 * @param   {Array}   cooked  - Cooked interpretation
 * @returns {Object}  --------- HTML element
 */
const html = (literal, ...cooked) => {
  let result = '';
  for (const [i, cook] of cooked.entries()) {
    const lit = literal[i];
    let cookJoin = cook;
    if (Array.isArray(cook)) {
      cookJoin = cook.join('');
    }
    result += lit;
    result += cookJoin;
  }
  result += literal[literal.length - 1];
  return htmlToElement(result);
};

/**
 * @returns {Object} - Main extension component
 */
const getComponent = () => html`
    <div class="gf-combobox-wrap">

      <div role="combobox"
           aria-expanded="false"
           aria-owns="gf-listbox"
           aria-haspopup="listbox"
           id="gf-combobox">

        <div class="gf-search-icon">
            <svg data-icon="search-medium" aria-hidden="true" focusable="false" width="15" height="15" viewBox="0 0 15 15">
                <path fill="#333" d="M10.03 8.97l-.16.16A4.95 4.95 0 0 0 11 6 5 5 0 0 0 1 6a5 5 0 0 0 5 5c1.19 0 2.27-.434 3.13-1.13l-.16.16 3.5 3.5 1.06-1.06-3.5-3.5zM6 9.5C4.07 9.5 2.5 7.93 2.5 6S4.07 2.5 6 2.5 9.5 4.07 9.5 6 7.93 9.5 6 9.5z"></path>
            </svg>
        </div>

        <input type="text"
               class="gf-search-input"
               placeholder="Type something"
               autocapitalize="off"
               autocomplete="off"
               autocorrect="off"
               spellcheck="false"
               aria-autocomplete="list"
               aria-controls="gf-listbox"
               aria-labelledby="gf-search-label"
               id="gf-input">

        <span></span>

        <div class="gf-dropdown"
             id="gf-listbox-arrow"
             tabindex="-1"
             role="button"
             aria-label="Show Google Fonts options">
        </div>

      </div>

      <ul aria-labelledby="gf-search-label"
          role="listbox"
          id="gf-listbox"
          class="gf-listbox">
          <li class="gf-listbox__item gf-listbox__message" id="gf-listbox__message">No fonts found</li>
      </ul>

      <div id="gf-wrap-shadow" class="gf-wrap-shadow"></div>

    </div>
  `;

/**
 * @returns {Object} - Listbox item
 */
const getListboxItem = (label = '', index = '') => html`
    <li class="gf-listbox__item is--visible" role="option" id="gf-r-${index}">${label}</li>
  `;

/**
 * @returns {Object} - Alert message
 */
const getAlertMessage = (message = 'Error.') => html`
    <div class="humane humane-jackedup-error gf-alert">${message}</div>
  `;

export {
  getComponent, getListboxItem, getAlertMessage,
};
