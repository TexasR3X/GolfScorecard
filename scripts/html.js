export const thumbnailImage = document.querySelector("#thumbnail-image");
export const selectTee = document.querySelector("#select-tee");
export const selectCourse = document.querySelector("#select-course");

export const buildOption0 = (value, content) => ` <option value="${value}">Select ${content}</option> `;

export const buildOption = (value, content) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = content;
    return option;
}







// export const buidSelect = (options, placeholder, valueProp, shownProp) => {
//     const useProps = valueProp !== undefined;

//     let selectHTML = ` <option value="select">Select ${placeholder}</option> `;

//     options.forEach((option) => {
//         selectHTML += ` <option value="${useProps? option[valueProp]: option}">${useProps? option[shownProp]: option}</option> `;
//     });

//     return selectHTML;
// }

export const buildTable = () => {
    
}