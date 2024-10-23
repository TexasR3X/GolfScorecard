// https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json

const fetchAPI = async (url) => await (await fetch(url)).json();

const onLoad = async () => {
    const getGolfCourse = async (courseIndex) => {
        const golfCourses = await fetchAPI("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
        console.log("golfCourses:", golfCourses);
        return golfCourses[courseIndex];
    }
    const golfData = await getGolfCourse(0);
    console.log("golfData:", golfData);
    console.log("golfData.name:", golfData.name);
    console.log("golfData.url:", golfData.url);
    
    
    // console.log("golfCourses:", golfCourses);
    // console.log("golfCourses:", golfCourses);
    // console.log("golfCourses:", golfCourses);

    // const getGolfCourses = async () => {
    //     const response = await fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
    //     return await response.json();
    // }
    // // const getGolfCourse

    // const getCourseData = async () => {
        
    // }
    
    // console.log("getGolfCourses():", await getGolfCourses());
}
onLoad();