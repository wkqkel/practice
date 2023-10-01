// function fetchItems(): string[] {
//   var items = ["a", "b", "c"];
//   return items;
// }
// // 동기코드는 타입스크립트가 추론하지만
// let result = fetchItems();

//컨트롤 누르고 키워드 누르면 해당 키워드가 정의된 파일 바로가기
// Promise<unknown>이 뜨는데 그 반환값의 타입을 명시해줘야 제대로 쓰는거
// 프로미스는 제네릭 타입을 집어넣고 그걸 돌려받음 _// 프로미스의 타입까지 넣어줌
// 즉 api호출하면 promise가 반환되니 해당 함수의 리턴값의 타입을 promise로 주고 그 promise안의 타입까지 제네릭방식으로 정의(ts기본세팅)
function fetchItems(): Promise<number[]> {
  var items: string[] = ["a", "b", "c"];
  return new Promise(function (resolve) {
    resolve(items); // 반환값이 넘버가 돼야하는데 스트링이 왔다.
  });
}
fetchItems();
