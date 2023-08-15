import SELECTORS from '../constants/selector.js';
import { $ } from '../utils/utils.js';

const show = dom => {
  dom.classList.remove('hide');
};

const makeLottoTemplate = () => {
  return `<span class="mx-1 text-4xl lotto-icon">🎟️ </span>`;
};

const updatePurchasedTotal = number => {
  $(SELECTORS.PURCHASED_TOTAL).innerText = number;
};

const updateLottoIcons = length => {
  $(SELECTORS.LOTTO_ICONS).innerHTML = makeLottoTemplate().repeat(length);
};

export const getPrice = () => {
  return $(SELECTORS.PRICE_INPUT).value;
};

export const showWinningNumberForm = () => {
  show($(SELECTORS.WINNING_NUMBER_FORM));
};

export const showPurchasedLottos = length => {
  updatePurchasedTotal(length);
  updateLottoIcons(length);
  show($(SELECTORS.PURCHASED_LOTTOS));
};
