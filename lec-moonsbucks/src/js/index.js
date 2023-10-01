import { $ } from "./utils/dom.js";
import MenuApi from "./api/index.js";
import store from "./store/index.js";

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  // 객체에서 this는 보통 객체 자신을 가리키는데(실행되는 맥락에 따라 달라짐),
  // 각 인스턴스 별로 상태값을 활용하기 위하여 this를 사용
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";

  this.init = async () => {
    // 프로미스는 진동벨 역할이라서 실제 메뉴로 교환해야함.
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    const template = this.menu[this.currentCategory]
      .map((item) => {
        return `
      <li data-menu-id='${item.id}' class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""}">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
              수정
          </button>
          <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
              삭제
          </button>
      </li> `;
      })
      .join("");

    $("#menu-list").innerHTML = template;

    // 메뉴의 총갯수를 구하고 업데이트
    // li태그 카운트
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = async () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요");
      return;
    }

    const duplicatedItem = this.menu[this.currentCategory].find((menuItem) => menuItem.name === $("#menu-name").value);

    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다.");
      $("#menu-name").value = "";
      return;
    }
    const menuName = $("#menu-name").value;

    // 메뉴생성하기 api요청
    await MenuApi.createMenu(this.currentCategory, menuName);
    // 카테고리별 메뉴 받아오기 api요청
    // 서버에 요청하면 진동벨을 주기 때문에 먼저 요청한 것에 대해 먼저 받지 못할 수 있다. => async await로 비동기통신의 순서를 보장 가능
    render();
    $("#menu-name").value = "";
    // this.menu[this.currentCategory].push({ name: menuName });
  };

  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);
    render();
    $("#menu-name").value = "";
  };

  const removeMenuName = async (e) => {
    if (confirm("정말 삭제하시겠습니까")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      render();
    }
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  };

  const initEventListeners = (e) => {
    // 버튼 클릭 시 이벤트
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // 추가 시 form 태그가 자동 전송되는 걸 막아준다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // 확인 버튼 클릭시
    $("#menu-submit-button").addEventListener("click", addMenuName);

    // 메뉴의 이름 입력받기
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      addMenuName();
    });

    // 카테고리 클릭
    $("nav").addEventListener("click", changeCategory);
  };
}

const app = new App();
app.init();
