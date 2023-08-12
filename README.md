# Todo List (Svelte)
## 0. 개별 레파지토리
- [소윤](https://github.com/soyoonJ/svelte-study)
- [상봉](https://github.com/In-Self-Improvement/todo_list)

## 1. 목표

이 프로젝트는 Svelte를 사용하여 간단한 Todo List 앱을 만드는 것을 목표로 합니다. 이 프로젝트를 통해 Svelte의 기본적인 사용법을 익힐 수 있습니다.

## 2. Key Point

- Svelte를 활용하여 간결하고 효율적인 프론트엔드 구현을 진행했습니다.
- Todo List의 기본 기능 구현에 중점을 두어 사용자 친화적인 인터페이스를 제공하려고 노력했습니다.

## 3. 실행 방법

```bash
npm install
npm run start
```

## 4. 사용한 기술 스택

- Svelte
- Vite (?)

## 5. 참고 링크

- [Todo list 요구사항](https://woojong92.tistory.com/entry/JS-%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-ToDo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0-1-%EA%B8%B0%EB%8A%A5%EC%A0%95%EC%9D%98-%EB%B0%8F-HTMLCSS)
- [Svelte 공식 문서](https://svelte.dev/)
- [Vite 공식 문서](https://vitejs.dev/)

## 6. 어려웠던 점

- Svelte에서의 `상태 관리` 방식을 처음 접하면서 초기 학습 곡선이 있었습니다.
- 여러 컴포넌트 간의 `상태 공유와 동기화`를 위한 로직 구현이 복잡하게 느껴졌습니다.
- 특정 컴포넌트에서 발생하는 `상태 변경`이 다른 컴포넌트에 어떻게 영향을 미치는지 추적하는 것이 어려웠습니다.

## 7. 배운점

- Svelte 컴포넌트 내에서 `export`된 변수는 해당 컴포넌트의 props로 사용되며, 이를 통해 부모 컴포넌트로부터 데이터를 전달받을 수 있다는 것을 깨달았습니다.
- Svelte의 반응형 선언 (`$:`)을 통해 상태의 변화를 자동으로 감지하고 렌더링하는 방식에 대해 학습했습니다.
- Svelte의 상태 관리 방식과 이를 통해 컴포넌트 간의 상태 공유와 동기화를 어떻게 처리하는지에 대해 깊게 이해하게 되었습니다.
