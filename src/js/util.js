/* util.js */

const $on = (target, event, handler) => target.addEventListener(event, handler);

const simulateClick = (item) => {
  item.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  item.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  item.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
  item.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  item.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
  item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  item.dispatchEvent(new Event('change', { bubbles: true }));

  return true;
};

const isFontsTab = (tabUrl) => {
  /* Get tab name from url */
  const tabName = tabUrl.slice(-5);

  /* Check if tab name matches fonts */
  if (tabName === 'fonts') {
    return true;
  }

  return false;
};

export {
  $on, simulateClick, isFontsTab,
};
