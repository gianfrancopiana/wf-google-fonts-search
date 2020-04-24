/* view.js */

import { $on, simulateClick } from './util';

import {
  getComponent, getListboxItem, getAlertMessage,
} from './template';

export default class View {
  constructor() {
    /* DOM references */
    this.$observerTarget = document.querySelector('div.main-content div.loaded');
    this.$oldSelectWrap = document.querySelector('.section.googlefonts .select-wrap');
    this.$oldSelect = this.$oldSelectWrap.querySelector('select');
    this.$container = document.querySelector('.googlefonts .field.row').firstChild;
    this.$comboboxLabel = this.$container.firstChild;
    [this.$addBtnText] = [document.querySelector('.variants-wrapper .button.success').childNodes[1]];

    /* Create fragment */
    this.fragment = document.createDocumentFragment();
    this.fragment.appendChild(getComponent());

    /* Fragment references */
    this.$input = this.fragment.getElementById('gf-input');
    this.$combobox = this.fragment.getElementById('gf-combobox');
    this.$listbox = this.fragment.getElementById('gf-listbox');
    this.$shadow = this.fragment.getElementById('gf-wrap-shadow');
    this.$listboxMessage = this.fragment.getElementById('gf-listbox__message');

    /* Hide old component */
    this.$oldSelectWrap.style.display = 'none';

    /* Modify label */
    this.$comboboxLabel.textContent = 'Choose font from list:';
    this.$comboboxLabel.id = 'gf-search-label';
  }

  /**
   * @param {Function} handler - Called when fonts finish loading
   */
  observe(handler) {
    /* Callback function */
    const callback = (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          handler();
        }
      }
    };

    /* Create mutation observer */
    this.observer = new MutationObserver(callback);

    /* Start observing */
    this.observer.observe(this.$observerTarget, { attributes: true });
  }

  /**
   * Disconnect MutationObserver.
   */
  disconnectObserver() {
    this.observer.disconnect();
  }

  /**
   * Store array reference to font <option> nodes.
   *
   * @return {Object} - HTMLCollection of <option> elements
   */
  setFontList() {
    this.fontList = [...this.$oldSelect.children];
    this.fontList.splice(0, 1); /* Remove placeholder option */

    return this.fontList;
  }

  /**
   * @returns {Object} - NodeList with added fonts
   */
  static getAddedFonts() {
    return document.querySelectorAll('.name.ng-binding');
  }

  /**
   * Populate listbox with font labels.
   *
   * @param {Array} fontLabels
   */
  render(fontLabels) {
    /* Add fonts to listbox */
    for (const [index, fontLabel] of fontLabels.entries()) {
      const listboxItem = getListboxItem(fontLabel, index);
      this.$listbox.appendChild(listboxItem);
    }

    /* Add fragment to DOM */
    this.$container.insertBefore(this.fragment, this.$container.children[1]);
  }

  /**
  * @param {Function} handler - Called on synthetic event
  */
  bindSearch(handler) {
    $on(this.$input, 'input', ({ target }) => {
      const query = target.value;
      handler(query);
    });
  }

  /**
  * @param {Function} handler - Cunction called on synthetic event
  */
  bindFocus(handler) {
    /* Input focus in */
    $on(this.$input, 'focusin', ({ type, target }) => {
      handler(type, target);
    });

    /* Input focus out */
    $on(this.$input, 'focusout', ({ type }) => {
      handler(type);
    });
  }

  /**
  * @param {Function} handler - Called on synthetic event
  */
  bindSetActiveItem(handler) {
    /* Input key up */
    $on(this.$input, 'keydown', (e) => {
      handler(e);
    });
  }

  /**
   * Show message for empty search results.
   *
   * @param {Boolean} show
   */
  showSearchMessage(show = false) {
    this.$listboxMessage.style.display = show ? 'block' : 'none';
  }

  /**
   * Show or hide listbox.
   *
   * @param {Boolean} show
   */
  showListbox(show = true) {
    if (show) {
      /* Show */
      this.$combobox.setAttribute('aria-expanded', 'true');
      this.$listbox.style.display = 'block';
      this.$shadow.style.display = 'block';
      this.updateShadowHeight();
    } else {
      /* Hide */
      this.$combobox.setAttribute('aria-expanded', 'false');
      this.$listbox.scrollTop = 0;
      this.$listbox.style.display = 'none';
      this.$shadow.style.display = 'none';
    }
  }

  /**
   * Update $shadow height.
   */
  updateShadowHeight() {
    this.$shadow.style.height = `${this.$input.offsetHeight + this.$listbox.offsetHeight}px`;
  }

  /**
   * Reset listbox state.
   */
  resetListbox() {
    /* Remove focus */
    document.activeElement.blur();

    /* Clear input */
    this.$input.value = '';

    /* Restore children visibility */
    this.loopListbox((li) => {
      if (li.id !== 'gf-listbox__message') {
        li.classList.remove('is--hidden');
        li.classList.add('is--visible');
      }
    });

    /* Remove aria-activedescendant */
    this.$input.removeAttribute('aria-activedescendant');

    /* Hide search message */
    this.showSearchMessage(false);
  }

  /**
   * Change Button label.
   *
   * @param {String} buttonText - Font name
   */
  changeButtonLabel(buttonText = 'font') {
    this.$addBtnText.textContent = `Add ${buttonText}`;
  }

  /**
  * @param {Function} handler - Called on synthetic event
  */
  bindSelectFont(handler) {
    $on(this.$listbox, 'mousedown', ({ target }) => {
      /* Verify tag name */
      if (target.tagName === 'LI') {
        const targetIndex = target.id.slice(5);
        const targetName = target.textContent;

        handler(targetIndex, targetName);
      }
    });
  }

  /**
   * Select target <option> and click it.
   *
   * @param {Number} itemIndex
   */
  selectItem(itemIndex) {
    const item = this.fontList[itemIndex];

    /* Change attribute to selected */
    item.selected = true;

    /* Click */
    simulateClick(item);
  }

  /**
   * @returns {Object} - HTMLCollection of visible items
   */
  getVisibleItems() {
    return this.$listbox.getElementsByClassName('is--visible');
  }

  /**
   * Set focus to active item and previous item.
   *
   * @param {Object} prevItem
   * @param {Obejct} activeItem
   * @param {Number} activeIndex
   * @param {String} lastQuery
   */
  setItemFocus(prevItem, activeItem, activeIndex, lastQuery) {
    if (!prevItem && !activeItem) {
      return;
    }

    if (activeIndex === -1) {
      /* Set input value to last query */
      this.$input.value = lastQuery;

      /* Remove focus */
      this.addRemoveFocus(prevItem || activeItem);
    } else {
      /* Remove focus */
      if (prevItem) {
        this.addRemoveFocus(prevItem);
      }

      /* Add focus */
      if (activeItem) {
        this.addRemoveFocus(activeItem, 'add');
      }
    }
  }

  /**
   * Add or remove focus.
   *
   * @param {Object} item   - prevItem or activeItem
   * @param {String} action - 'add' or 'remove'
   */
  addRemoveFocus(item, action = 'remove') {
    if (action === 'add') {
      /* Add focus */
      this.$input.setAttribute('aria-activedescendant', `${item.id}`);
      item.classList.add('is--focused');
      item.setAttribute('aria-selected', 'true');

      /* Scroll active item into view */
      item.scrollIntoView(false);

      /* Set input value to focused item */
      this.$input.value = item.textContent;
    } else if (action === 'remove') {
      /* Remove focus */
      item.classList.remove('is--focused');
      item.setAttribute('aria-selected', 'false');
    }
  }

  /**
   * Loop through listbox children.
   *
   * @param {Function} loop
   */
  loopListbox(loop) {
    for (const li of this.$listbox.children) {
      loop(li);
    }
  }

  /**
   * Display temp warning message.
   *
   * @param {String} message
   */
  static displayAlert(message) {
    /* Add alert element to DOM */
    const $alert = document.body.appendChild(getAlertMessage(message));

    setTimeout(() => {
      /* Animate in */
      $alert.style.top = '100px';

      setTimeout(() => {
        /* Animate out */
        $alert.style.top = '0';

        /* Remove element from DOM */
        setTimeout(() => { $alert.remove(); }, 600);
      }, 3000);
    }, 50);
  }
}
