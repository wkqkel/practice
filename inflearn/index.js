const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async (keyword) => {
  try {
    // encodeURI 자바스크립트 내장함수로 인코딩시켜줌
    const html = (await axios.get(`https://www.inflearn.com/courses?s=${encodeURI(keyword)}`)).data;

    return html;
  } catch (e) {
    console.log(e);
  }
};

const parsing = async (page) => {
  // cheerio는 제이쿼리와 비슷한 문법
  const $ = cheerio.load(page);
  const courses = [];
  const $courseList = $(".course_card_item");
  // console.log($courseList, "courlist");
  // each는 cheerio의 내장함수
  $courseList.each((idx, node) => {
    const title = $(node).find(".course_title:eq(0)").text();
    // :eq(0) css선택자로 선택한 요소의 인덱스 번호에 해당하는 요소를 찾습니다 없으면 다 갖고옴
    const instructor = $(node).find(".instructor:eq(0)").text();
    const price = $(node).find(".pay_price:eq(0)").text() || $(node).find(".price:eq(0)").text();
    const preSalePrice = $(node).find("del:eq(0)").text() || null;
    // 스타일이라는 내장함수를 제공해줌
    const rating = Math.round(+$(node).find(".star_solid").css("width").slice(0, -1));
    const reviewCount = $(node).find(".review_cnt").text().slice(1, -1);
    const imgSrc = $(node).find(".card-image > figure > img").attr("src");

    const item = { title, instructor, price, preSalePrice, rating, reviewCount, imgSrc };
    courses.push(item);
  });

  return courses;
};

const getCourse = async (keyword) => {
  const html = await getHTML(keyword);
  const courses = await parsing(html);

  return courses;
};

let courses = [];
let i = 1;
const getFullCourse = async () => {
  // 만약 페이지끝까지하고싶으면 최대 몇페이지까지 있는지 알아낸 다음 하는게 좋음
  while (i <= 20) {
    const course = await getCourse(`리액트&page=${i}`);
    courses = courses.concat(course);
    i++;
  }

  // console.log(courses);
};

getFullCourse();
// 실행 node index.js
