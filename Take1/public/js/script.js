const viewBtn = document.getElementById("view-btn");
const statusDiv = document.getElementById("status-div");
const backBtn = document.getElementById("back-btn");
const profileDiv = document.getElementById("profile");
const username = document.getElementById("username");

// Select the parent element
var parentElement = document.getElementById('form-container');

// Select child elements by tag name ('p' in this case)
var labels = parentElement.querySelectorAll('label');

const body = document.body;

viewBtn.addEventListener("click", () => {
    statusDiv.style.display = "block";
    body.classList.add("active");
    profileDiv.classList.add("active1");
    labels.classList.add("active2");



});

backBtn.addEventListener("click", () => {
    if (statusDiv.style.display = "block") {
        statusDiv.style.display = "none";
        body.classList.remove("active");
        profileDiv.classList.remove("active1");
        labels.classList.remove("active2");

    }
});