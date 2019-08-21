/* main.js */

import { isFontsTab } from './util';
import View from './view';
import Model from './model';
import Controller from './controller';

{
  class App {
    constructor() {
      const model = new Model();
      const view = new View();
      this.controller = new Controller(model, view);
    }

    init() {
      this.controller.view.observe();
    }
  }

  /**
   * Verify current tab URL.
   *
   * @param {Object} request
   */
  const verifyTab = ({ url = 'invalid' }) => {
    if (isFontsTab(url)) {
      const app = new App();
      app.init();
    }
  };

  chrome.runtime.onMessage.addListener(verifyTab); /* URL on updated */
  verifyTab({ url: window.location.href }); /* URL on created */
}
