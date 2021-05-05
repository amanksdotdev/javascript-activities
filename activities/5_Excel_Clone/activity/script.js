//DOM OBJECTS
const addsheetBtn = document.querySelector(".add-sheet_container");
const sheetList = document.querySelector(".sheets-list");
const firstSheet = document.querySelector(".sheet");


// FUNCTIONS
const handleActiveSheet = function (e) {
    const sheet = e.currentTarget;
    const sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach((sheet) => {
        sheet.classList.remove("active-sheet");
    });

    if (!sheet.classList.contains("active-sheet")) {
        sheet.classList.add("active-sheet");
    }
};

// EVENT LISTENERS
firstSheet.addEventListener("click", handleActiveSheet);

addsheetBtn.addEventListener("click", () => {
    const sheetArr = document.querySelectorAll(".sheet");
    const lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    const newSheet = document.createElement("div");
    newSheet.classList.add("sheet");
    newSheet.classList.add("cursor-pointer");
    newSheet.setAttribute("sheetIdx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 2}`;
    newSheet.addEventListener("click", handleActiveSheet);

    sheetList.appendChild(newSheet);
});

