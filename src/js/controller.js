/* controller.js */
export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    /* Bind methods */
    view.observe(this.setView.bind(this));
    view.bindSelectFont(this.selectFont.bind(this));
    view.bindSearch(this.search.bind(this));
    view.bindSetActiveItem(this.setActiveItem.bind(this));
    view.bindFocus(this.focus.bind(this));
  }

  /**
   * Set view when fonts have loaded.
   */
  setView() {
    /* Disconnect observer */
    this.view.disconnectObserver();

    /* Store fonts */
    const fontList = this.view.setFontList();

    /* Store font labels in array */
    this.model.setFontLabels(fontList);

    /* Render component in DOM */
    this.view.render(this.model.getFontLabels());

    /* Reset focus */
    this.resetFocus();
  }

  /**
   * Search for fonts on listbox.
   *
   * @param {String}  query - Returned by input on the view
   */
  search(query) {
    this.view.loopListbox((li) => {
      if (li.id !== 'gf-listbox__message') {
        /* Font name in uppercase */
        const fontName = li.textContent.toUpperCase();

        /* Look for match */
        const isMatch = fontName.indexOf(query.toUpperCase()) > -1;

        /* Update listbox */
        this.constructor.updateListbox(isMatch, li);
      }
    });

    /* Reset focus */
    this.resetFocus();

    /* show/hide 'No fonts found' */
    this.view.showSearchMessage(this.resultsCount === 0);

    /* Update shadow height */
    this.view.updateShadowHeight();

    /* Save last query */
    this.lastQuery = query;
  }

  /**
   * Show/hide listbox on focus in/out.
   *
   * @param {String}  eventType
   * @param {Object}  target
   */
  focus(eventType, target) {
    if (eventType === 'focusin') {
      /* Show listbox */
      this.view.showListbox();

      /* Check if input has value */
      if (target.value !== '') {
        /* Search query */
        const query = target.value.toUpperCase();
        this.search(query);
      }
    } else if (eventType === 'focusout') {
      /* Hide listbox */
      this.view.showListbox(false);

      /* Reset focus */
      this.resetFocus();
    }
  }

  /**
   * Set active item on listbox.
   *
   * @param {Object} evt
   */
  setActiveItem(evt) {
    /* New array with search results */
    const results = this.view.getVisibleItems();

    /* Set prevActive item */
    const prevActive = results[this.activeIndex];

    /* Check key code pressed */
    this.checkKey(evt, results);

    /* Set current active item */
    this.activeItem = results[this.activeIndex];

    /* Set item focus */
    this.view.setItemFocus(prevActive, this.activeItem, this.activeIndex, this.lastQuery);
  }

  /**
   * Check key pressed.
   *
   * @param {Event} evt
   */
  checkKey(evt) {
    switch (evt.code) {
      case 'Escape':
        /* Hide listbox */
        this.view.showListbox(false);

        /* Reset listbox */
        this.view.resetListbox();

        /* Reset focus */
        this.resetFocus();

        break;

      case 'ArrowUp':
        if (this.activeIndex === -1) {
          /* Set activeIndex to bottom item */
          this.activeIndex = this.resultsCount - 1;
        } else {
          /* Decrement activeIndex by 1 */
          this.activeIndex -= 1;
        }

        evt.preventDefault();

        break;

      case 'ArrowDown':
        if (this.activeIndex === -1) {
          /* Set activeIndex to first item */
          this.activeIndex = 0;
        } else if (this.activeIndex >= this.resultsCount - 1) {
          /* Set activeIndex to -1 */
          this.activeIndex = -1;
        } else {
          /* Increment activeIndex by 1 */
          this.activeIndex += 1;
        }

        evt.preventDefault();

        break;

      case 'NumpadEnter':
      case 'Enter':
        if (this.activeItem) {
          const itemIndex = this.activeItem.id.slice(5);
          const fontName = this.activeItem.textContent;

          /* Select <option> that matches active item */
          this.selectFont(itemIndex, fontName);

          /* Hide listbox */
          this.view.showListbox(false);

          /* Reset listbox */
          this.view.resetListbox();

          /* Reset focus */
          this.resetFocus();
        }

        evt.preventDefault();

        break;

      default:
    }
  }

  /**
   * Select font and add it for preview.
   *
   * @param {Number}  targetIndex - Index of selected target
   * @param {String}  targetName  - Font name of selected target
   */
  selectFont(targetIndex, targetName) {
    /* Check if font is already added */
    if (this.getAddedFonts().indexOf(targetName) !== -1) {
      // Display warning message
      this.view.constructor.displayAlert('This font is already added. Delete it, and try again.');
      return;
    }

    /* Select <option> */
    this.view.selectItem(targetIndex);

    /* Change button label */
    this.view.changeButtonLabel(targetName);

    /* Reset listbox */
    this.view.resetListbox();

    /* Reset focus */
    this.resetFocus();
  }

  /**
   * @returns {Array} - List of added font labels
   */
  getAddedFonts() {
    const addedFonts = this.view.constructor.getAddedFonts();
    const addedFontList = this.model.setAddedFontsList(addedFonts);

    return addedFontList;
  }

  /**
   * Reset item focus, activeIndex and resultsCount.
   */
  resetFocus() {
    /* Active index */
    this.activeIndex = -1;

    /* Results count */
    this.resultsCount = (this.view.getVisibleItems()).length;

    /* Reset focused item */
    this.view.loopListbox((li) => {
      if (li.id !== 'gf-listbox__message') {
        li.classList.remove('is--focused');
        li.removeAttribute('aria-selected');
      }
    });

    /* Reset last query */
    this.lastQuery = '';
  }

  /**
   * Update listbox children visibility.
   *
   * @param {Boolean} show  - true if there is a match
   * @param {Object}  item  - child of listbox
   */
  static updateListbox(show, item) {
    const listboxItem = item;

    if (show) {
      /* .is--visible */
      listboxItem.classList.add('is--visible');
      listboxItem.classList.remove('is--hidden');
    } else {
      /* .is--hidden */
      listboxItem.classList.remove('is--visible');
      listboxItem.classList.add('is--hidden');
    }
  }
}
