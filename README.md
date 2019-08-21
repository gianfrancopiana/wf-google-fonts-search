# Google Fonts Search for Webflow — Chrome Extension

![GitHub](https://img.shields.io/github/license/gianfrancopiana/webflow-font-extension)

This Chrome extension aims to help [Webflow](https://webflow.com/) users add Google fonts to their projects. It replaces Webflow's dropdown list under Project settings.

![wf-font-extension](https://user-images.githubusercontent.com/52470719/63405631-dc135300-c3bd-11e9-9678-2dc48ee04c73.gif)

<br>

## 📚 About

[Webflow](https://webflow.com/) is known for its ease of use and simplicity. But I found myself a bit overwhelmed when adding Google fonts.

Currently, the way to add a font is to select it from a standard [dropdown list in Project settings](https://university.webflow.com/article/google-fonts). But there are more than 900 fonts to choose from!

So I decided to create an alternative that would make adding fonts more simple.

<br>

## ✨ Features

* Built-in search functionality with autocomplete behavior
* Built-in keyboard navigation using arrow keys
* Prevents duplicate font entries on projects
* Changes the `Add Font` button label to match the selected font; e.g. `Add Roboto`.
* Follows [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox)

<br>

## 🔧 Installation

### Chrome Web Store

Go to the [Chrome Web Store page for *Google Fonts Search for Webflow*](https://chrome.google.com/webstore/detail/) and install normally.

After installing, make sure to reload any open Webflow tabs or restart Chrome.

### Manual/Development

1. Clone this repo.
2. In Chrome, enter `chrome://extensions/` into your address bar.
3. Click on the `developer mode` toggle in the upper-right corner.
4. Click the now-visible `Load unpacked extension…` button. 
5. Navigate to the directory where you cloned the repo, then the `dist` directory under that. The *Google Fonts Search for Webflow* extension should now be visible in your extensions list.
6. Reload any open Webflow tabs before trying to use the extension.

<br>

## 🎈 Usage

Install the extension, and *make sure* you reload any open Webflow tabs or restart Chrome.

1. Log into your Webflow account.
2. Go to *Project settings → Fonts → Google fonts*
3. Click on the input field with a ![search-icon](https://user-images.githubusercontent.com/52470719/63406223-a0798880-c3bf-11e9-907f-0808282efb47.png) icon.
4. Start typing to filter results.
5. Pick a font on the list using your mouse or keyboard.

<br>

## 🌎 Feedback

All feedback, bugs, feature requests and pull requests are welcome. [Create an issue here](https://github.com/gianfrancopiana/webflow-font-extension/issues). 

You may also find me on my website at [www.gianfrancopiana.com](https://www.gianfrancopiana.com) or twitter at [@pianagianfranco](https://twitter.com/pianagianfranco).

Thanks!

<br>

## Trademark attribution

Webflow and the Webflow logo are trademarks of Webflow, Inc., registered in the U.S. and other countries.

<br>

## License

**[MIT license](/LICENSE).**
