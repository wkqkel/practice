// api url
var url = "https://jsonplaceholder.typicode.com/users/1";

// dom
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var address = document.querySelector("#address");

// user data
var user = {};
// 아래는 jsDoc을 이용한 js에서 타입정의방법
// 이 아래에서 사용할 타입에 대한 정의
//어드레스 객체에대한정의

//어드레스에 타입객체에 대한 정의를 어드레스 속성이함
/**
 * @typedef {object} Address
 * @property {string} street
 * @property {string} city
 */

/**
 * @typedef {object} User
 * @property {string} name
 * @property {string} email
 * @property {Address} address // 위에 Address에 대한 정의를 해줌 object와 내부
 */
// 아래는 제너릭이라고 하는 부분인데 axios의 프로미스값을 프로미스에 유저라는 타입이 담겨있고 볼 수 있음
/**
 * @returns {Promise<User>}
 */
function fetchUser() {
  return axios.get(url);
}
fetchUser().then(function (response) {
  response.address.city;
});

function startApp() {
  // axios
  //   .get(url)
  fetchUser()
    .then(function (response) {
      console.log(response);
      user = response.data;
      // TODO: 이름, 이메일, 주소 표시하기
      console.log(user);
      username.innerText = user[0].name;
      email.innerText = user[0].email;
      address.innerText = user[0].address.street;
    })
    .catch(function (error) {
      console.log(error);
    });
}

startApp();
