/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = page * 9 - 9;
  const endIndex = page * 9;
  const studentList = document.querySelector(".student-list");
    studentList.innerHTML = "";
if(list.length > 0){  
    for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const studentItem = `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">${list[i].registered.date}</span>
        </div>
      </li>
      `;
      studentList.insertAdjacentHTML("beforeend", studentItem);
    }
  }
}
  if (list.length === 0) {
    console.log("No results found");

    const noResults = `
      <li class="student-item cf">
        <h3>No results found</h3>
        </li>
        `;

    studentList.innerHTML = noResults;
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / 9);
  const linkList = document.querySelector(".link-list");
  linkList.innerHTML = "";
  for (let i = 1; i <= numOfPages; i++) {
    const button = `
    <li>
      <button type="button">${i}</button>
    </li>
    `;
    linkList.insertAdjacentHTML("beforeend", button);
  }

  const firstButton = document.querySelector(".link-list button");
  if (firstButton) {
    firstButton.className = "active";
  }
  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const activeButton = document.querySelector(".active");
      activeButton.className = "";
      e.target.className = "active";
      showPage(list, e.target.textContent);
    }
  });
}
function searchStudents(searchValue) {
  const filteredStudents = [];

  for (let i = 0; i < data.length; i++) {
    const studentName = `${data[i].name.first} ${data[i].name.last}`;
    if (studentName.toLowerCase().includes(searchValue)) {
      filteredStudents.push(data[i]);
    }
    }
     showPage(filteredStudents, 1);
    addPagination(filteredStudents);
  
}
/**
 * Create the `addSearchBar` function
 */
function addSearchBar() {
  const header = document.querySelector(".header");
  const searchBar = `
  <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `;
  header.insertAdjacentHTML("beforeend", searchBar);

  const searchInput = document.querySelector("#search");

  searchInput.addEventListener("change", (e) => {
    searchStudents(e.target.value.toLowerCase());
  });
  searchInput.addEventListener("keyup", (e) => {
    searchStudents(e.target.value.toLowerCase());
  });
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();
