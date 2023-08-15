import SELECTORS from './constants/selector.js';
import { onClickPriceButton } from './handlers/handlers.js';
import { $ } from './utils/utils.js';

function bindEventListener() {
  $(SELECTORS.PRICE_INPUT_BUTTON).addEventListener('click', onClickPriceButton);
}

bindEventListener();
