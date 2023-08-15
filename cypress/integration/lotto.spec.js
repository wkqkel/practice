const SELECTORS = {
  PRICE_INPUT: '#input-price',
  PRICE_INPUT_BUTTON: '#input-price-btn',
  LOTTO_ICON: '.lotto-icon',
};

describe('로또 구입, 발행', () => {
  beforeEach(() => {
    cy.visit('../index.html');
  });
  it('페이지에 접속하면, 구입 금액 입력 폼이 존재한다.', () => {
    cy.get(SELECTORS.PRICE_INPUT).should('be.visible');
  });

  it('페이지에 접속하면, 구입 금액 확인 버튼이 존재한다..', () => {
    cy.get(SELECTORS.PRICE_INPUT_BUTTON).should('be.visible');
  });

  it('입력한 금액이 올바른 경우, 확인 버튼 클릭 시 구입금액에 맞는 로또 아이콘이 보인다.', () => {
    cy.get(SELECTORS.PRICE_INPUT).type(5_000);

    cy.get(SELECTORS.PRICE_INPUT_BUTTON).click();

    cy.get(SELECTORS.LOTTO_ICON).should('have.length', 5);
  });

  it('입력한 금액이 올바르지 않은 경우, 확인 버튼 시 경고창이 뜬다.', () => {
    cy.get(SELECTORS.PRICE_INPUT).type(5_000);

    cy.get(SELECTORS.PRICE_INPUT_BUTTON).click();

    // cy.get('.lotto-icon').should('have.length', 5);
  });
});
