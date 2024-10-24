import * as HTML from "./html.js";
import { Matrix, Row } from "./classes.js";

const fetchAPI = async (url) => await (await fetch(url)).json();

const getCourse = (courseId) => {
    
}




const onLoad = async () => {
    let updateHTMLVar = "";


    const golfCoursesData = await fetchAPI("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
    console.log("golfCoursesData:", golfCoursesData);

    const _thanksGiving_ = await fetchAPI("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json");
    console.log("_thanksGiving_:", _thanksGiving_);


    // Add content to the select elements.
    // HTML.selectTee.innerHTML = HTML.buidSelect(["Pro", "Champion", "Women", "Men"], "Tee Box");
    // HTML.selectCourse.innerHTML = HTML.buidSelect(golfCoursesData, "Course", "id", "name");

    golfCoursesData.forEach((course) => {
        HTML.selectCourse.appendChild(HTML.buildOption(course.id, course.name));
    });

    const remakePage = async (event) => {
        console.log("event:", event);
        console.log("event.target.value:", event.target.value);

        const courseId = event.target.value;
        const courseData = await fetchAPI(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`);

        console.log("courseData:", courseData);

        HTML.thumbnailImage.src = courseData.thumbnail;

        courseData.forEach((course, i) => {
            HTML.selectTee.appendChild(HTML.buildOption(i, course.name));
        });
    }

    remakePage({ target: {value: golfCoursesData[0].id} });

    HTML.selectCourse.addEventListener("change", remakePage);

    



    // updateHTMLVar = "";
    // [{ id: "select", name: "Select Course" }, ...golfCoursesData].forEach((course) => {
    //     updateHTMLVar += HTML.buildOption(course.id, course.name);
    // });
    // HTML.selectTee.innerHTML = updateHTMLVar;

    
}
onLoad();