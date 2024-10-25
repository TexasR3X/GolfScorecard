import * as HTML from "./html.js";

const fetchData = async (url) => await (await fetch(url)).json();

const loadedCourses = [];
const loadedCourseIds = [];

const getCourse = async (courseId) => {
    if (!loadedCourseIds.includes(courseId)) {
        const newCourse = await fetchData(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`);
        console.log("newCourse:", newCourse);

        loadedCourses.push(newCourse);
        loadedCourseIds.push(courseId);

        console.log("loadedCourses:", loadedCourses);
        console.log("loadedCourseIds:", loadedCourseIds);
    }

    return loadedCourses[loadedCourseIds.indexOf(courseId)];
}




const onLoad = async () => {
    const golfCoursesData = await fetchData("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
    console.log("golfCoursesData:", golfCoursesData);

    const _thanksGiving_ = await fetchData("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json");
    console.log("_thanksGiving_:", _thanksGiving_);


    // Add content to the select elements.
    // HTML.selectTee.innerHTML = HTML.buidSelect(["Pro", "Champion", "Women", "Men"], "Tee Box");
    // HTML.selectCourse.innerHTML = HTML.buidSelect(golfCoursesData, "Course", "id", "name");

    golfCoursesData.forEach((course) => {
        HTML.selectCourse.appendChild(HTML.buildOption(course.id, course.name));
    });

    const remakeTeeSelect = async (event) => {
        console.log("event:", event);
        console.log("event.target.value:", event.target.value);

        const course = await getCourse(event.target.value);

        console.log("course:", course);

        HTML.thumbnailImage.src = course.thumbnail;

        console.log("course.holes[0].teeBoxes:", course.holes[0].teeBoxes);
        
        // Build Tee Select
        HTML.selectTee.innerHTML = "";
        course.holes[0].teeBoxes.forEach((teeBox, i) => {
            HTML.selectTee.appendChild(HTML.buildOption(i, teeBox.teeType.toUpperCase()));
        });

        const remakeTable = async (event) => {
            console.log("event:", event);
            const teeIndex = +(event.target.value);
            console.log("teeIndex:", teeIndex);

            HTML.buildTable(course, "front nine", teeIndex);
            HTML.buildTable(course, "back nine", teeIndex);
        }
        remakeTable({ target: { value: 0 } });
        HTML.selectTee.addEventListener("change", remakeTable)
    }
    remakeTeeSelect({ target: {value: golfCoursesData[0].id} });
    HTML.selectCourse.addEventListener("change", remakeTeeSelect);

    



    // updateHTMLVar = "";
    // [{ id: "select", name: "Select Course" }, ...golfCoursesData].forEach((course) => {
    //     updateHTMLVar += HTML.buildOption(course.id, course.name);
    // });
    // HTML.selectTee.innerHTML = updateHTMLVar;

    
}
onLoad();