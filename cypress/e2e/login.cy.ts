describe("로그인페이지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("로그인 페이지에 방문하면 로그인 버튼들이 보인다.", () => {
    cy.get("button").contains("로그인");
    cy.get("button").contains(/Google/);
  });

  it("로그인에 성공하면 성공 메시지와 함께 chat페이지로 이동한다.", () => {
    cy.get("input[id='email']").type("test@naver.com");
    cy.get("input[id='password']").type("sksms091?");

    cy.get("button").contains("로그인").click();

    cy.contains(/성공/);
    cy.contains(/ChatPage/);
  });
});
