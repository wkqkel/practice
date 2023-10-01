import lottoMachine from '../domain/LottoMachine.js';
import {
  getPrice,
  showPurchasedLottos,
  showWinningNumberForm,
} from '../view/view.js';

export const onClickPriceButton = () => {
  try {
    lottoMachine.purchaseLottos(getPrice());
    showPurchasedLottos(lottoMachine.lottos.length);
    showWinningNumberForm();
  } catch (error) {
    window.alert(error.message);
  }
};
