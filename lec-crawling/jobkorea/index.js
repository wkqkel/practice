const axios = require("axios");
const cheerio = require("cheerio");

const nodemailer = require("./nodemailer");
const cron = require("node-cron");

const getHTML = async (keyword) => {
  try {
    const html = (await axios.get(`https://www.jobkorea.co.kr/Search/?stext=${encodeURI(keyword)}`)).data;

    return html;
  } catch (e) {
    console.log(e);
  }
};

const parsing = async (page) => {
  // cheerio는 제이쿼리와 비슷한 문법
  const $ = cheerio.load(page);
  const jobs = [];
  const $jobList = $(".list-post");
  // console.log($courseList, "courlist");
  // each는 cheerio의 내장함수
  $jobList.each((idx, node) => {
    const title = $(node).find(".title:eq(0)").text().trim();
    const company = $(node).find(".name:eq(0)").text().trim(); // trim 앞뒤공백 없애줌
    const experience = $(node).find(".exp:eq(0)").text().trim();
    const education = $(node).find(".edu:eq(0)").text().trim();
    const regularYN = $(node).find(".option > span:eq(2)").text().trim();
    const location = $(node).find(".loc.long:eq(0)").text().trim();
    const dueDate = $(node).find(".date:eq(0)").text().trim();
    const etc = $(node).find(".etc:eq(0)").text().trim();

    if (experience.indexOf("신입") > -1 || experience.indexOf("경력무관") > -1) {
      const item = { title, company, experience, education, regularYN, location, dueDate, etc };

      if (!location) return;
      jobs.push(item);
    }
  });

  return jobs.slice(0, 20);
};

const getJob = async (keyword) => {
  const html = await getHTML(keyword);
  const jobs = await parsing(html);

  return jobs;
};

const crawlingJob = async (keyword) => {
  const jobs = await getJob(keyword);

  const h = [];
  h.push(`<table style="border:1px solid black;border-collapse:collapse;">`);
  h.push(`<thead>`);
  h.push(`<tr>`);
  h.push(`<th style="border:1px solid black;">구인제목</th>`);
  h.push(`<th style="border:1px solid black;">회사명</th>`);
  h.push(`<th style="border:1px solid black;">경력</th>`);
  h.push(`<th style="border:1px solid black;">학력</th>`);
  h.push(`<th style="border:1px solid black;">정규직여부</th>`);
  h.push(`<th style="border:1px solid black;">지역</th>`);
  h.push(`<th style="border:1px solid black;">구인마감일</th>`);
  h.push(`<th style="border:1px solid black;">비고</th>`);
  h.push(`</tr">`);
  h.push(`</thead>`);
  jobs.forEach((job) => {
    h.push(`<tr>`);
    h.push(`<td style="border:1px solid black;">${job.title}</td>`);
    h.push(`<td style="border:1px solid black;">${job.company}</td>`);
    h.push(`<td style="border:1px solid black;">${job.experience}</td>`);
    h.push(`<td style="border:1px solid black;">${job.education}</td>`);
    h.push(`<td style="border:1px solid black;">${job.regularYN}</td>`);
    h.push(`<td style="border:1px solid black;">${job.location}</td>`);
    h.push(`<td style="border:1px solid black;">${job.dueDate}</td>`);
    h.push(`<td style="border:1px solid black;">${job.etc}</td>`);
    h.push(`</tr>`);
  });
  h.push(`</table>`);
  h.push(`</thead>`);

  const emailData = {
    from: process.env.NODEMAILER_USER,
    to: "wkqkel@naver.com, swpark@trineedle.com",
    subject: "프론트엔드 크롤링 테스트",
    html: h.join(""),
  };

  await nodemailer.sendMail(emailData);
};

// 매일 am 12시마다
// cron.schedule("0 0 0 * * *", function () {
//   crawlingJob("프론트엔드");
// });
// const array = ["프론트엔드", "리액트", "개발자", "노드", "건축"];
// cron.schedule("* * * * *", function () {
//   const randomIndex = Math.floor(Math.random() * 5);
//   crawlingJob(array[randomIndex]);
// });
