📍 학습 목표

- UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
- 단위 테스트 기반으로 점진적인 리팩터링

✅ 프로그래밍 요구 사항

- 변수 선언시 const 만 사용한다.
- 함수(또는 메서드)의 들여쓰기 depth는 1단계까지만 허용한다.
- 함수의 매개변수는 2개 이하여야 한다.
- 함수에서 부수 효과를 분리하고, 가능한 순수 함수를 많이 활용한다.
- 테스트하기 쉬운 코드에 대해 고민하고, 문제를 작은 단위로 쪼개서 접근하는 방식을 연습한다.
- 모든 기능을 TDD로 구현하는 것을 시도하여, 테스트 할 수 있는 도메인 로직에 대해서는 모두 단위 테스트가 존재해야 한다. (단, UI 로직은 제외)

### 1단계

모듈화와 객체 간에 로직을 재사용하는 방법에 대해 고민한다.

- 로또 번호와 당첨 로또 번호의 유효성 검사시 발생하는 중복 코드를 제거해야 한다.
- 클래스(또는 객체)를 사용하는 경우, 프로퍼티를 외부에서 직접 꺼내지 않는다. 객체에 메시지를 보내도록 한다.
- getter를 금지하는 것이 아니라 말 그대로 프로퍼티 자체를 그대로 꺼내서 객체 바깥에서 직접 조작하는 등의 작업을 지양하자는 의미입니다 :) 객체 내부에서 알아서 할 수 있는 일은 객체가 스스로 할 수 있게 맡겨주세요.
- 클래스를 사용하는 경우, 3개 이상의 인스턴스 변수를 가진 클래스를 쓰지 않는다.

```
로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
로또 1장의 가격은 1,000원이다.
당첨 번호와 보너스 번호를 입력받는다.
사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
1등: 6개 번호 일치 / 2,000,000,000원
2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
3등: 5개 번호 일치 / 1,500,000원
4등: 4개 번호 일치 / 50,000원
5등: 3개 번호 일치 / 5,000원
실행 결과 예시

> 구입금액을 입력해 주세요.8000
> 8개를 구매했습니다.
> [8, 21, 23, 41, 42, 43]
> [3, 5, 11, 16, 32, 38]
> [7, 11, 16, 35, 36, 44]
> [1, 8, 11, 31, 41, 42]
> [13, 14, 16, 38, 42, 45]
> [7, 11, 30, 40, 42, 43]
> [2, 13, 22, 32, 38, 45]
> [1, 3, 5, 14, 22, 45]

> 당첨 번호를 입력해 주세요. 1,2,3,4,5,6

> 보너스 번호를 입력해 주세요. 7

## 당첨 통계

3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.
```

🔖 TDD 7단계

1. 전체 문제가 해결되었을 때 어떤 상태일지 상상해보기. 결국 내가 뭐하려는 걸까? <br>
   (가능하면 1문장으로 정리해보기. 2문장까지 ok)
2. 적당한 난이도로 문제를 쪼개거나 변형하기. 단, 핵심을 포함하게
3. 핵심과 가까우면서 쉽게 할 수 있는 적절한 것을 하나 선택한다.<br>
   (이걸 먼저 함으로써 뒤에 구현할 기능들이 수월해질것 같은거) <br>
   (이걸 먼저 하기때문에 전체 앱 구현이 더 유리해질것 같다)
4. 결과치가 뭔지 구체화하고 최대한 진짜처럼 시뮬레이션
5. 동작 가능한 가장 작은 버전의 솔루션을 만들고 테스트가 통과하는지 확인한다.
6. 리팩터링을 하면서 중복을 줄이거나, 의도를 드러나게 한다. <br>
   (의도가 잘 드러나기 위한 중복은 허용) <br>
   모든 리팩터링 단계마다 테스트가 통과되는지 확인
7. 다시 1번이나 2번으로 돌아간다

📣 객체의 소리 듣기

- 역할 도출
  : 요구사항을 보고 어떤 역할 들이 필요한지 적어주세요"
- 객체 도출
  : 해당 역할들을 담당할 객체를 떠올려보고 그들의 이름을 작성해주세요
- 책임 정리(knowing, doing이 포함)
  : 각 객체가 알아야 하는 것, 해야하는 것들을 포함해서 책임을 작성해주세요. 객체를 생생하게 떠올리면서 질문하면 답변을 해줄지도!?
- 협력 관계
  : 객체들간의 협력 관계가 떠오른게 있다면 그 관계를 작성해주세요

### 기능목록

- [x] 로또 구매
  - [x] 로또 갯수만큼 로또를 생성한다.
- [x] 로또 번호 생성
  - [x] 1-45까지의 중복되지않은 번호를 7개 생성한다.
- [x] 당첨번호와 보너스번호 입력
- [x] 당첨 결과 계산
- [] 당첨 통계 출력
