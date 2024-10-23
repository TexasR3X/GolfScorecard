import * as HTML from "./html.js";

const fetchAPI = async (url) => await (await fetch(url)).json();

const onLoad = async () => {
    const golfCoursesData = await fetchAPI("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
    console.log("golfCoursesData:", golfCoursesData);

    // Add content to the select elements.
    HTML.selectTee.innerHTML = HTML.buidSelect(["Pro", "Champion", "Women", "Men"], "Tee Box");
    HTML.selectCourse.innerHTML = HTML.buidSelect(golfCoursesData, "Course", "id", "name");
}
onLoad();