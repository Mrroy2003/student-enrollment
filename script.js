const form = document.getElementById("userForm");
const enrolledStudents = document.getElementById("enrolled-students");

// Function to reset the form
const resetForm = function () {
  form.reset();
};

// Function to get the data from the form
const getData = function () {
  const name = document.getElementById('name').value;
  const enrollment = document.getElementById('enrollment').value;
  const genderEl = document.querySelector('input[name="gender"]:checked');
  const gender = genderEl ? genderEl.value : '';

  const skillEls = document.querySelectorAll('input[name="skill"]:checked');
  const skills = Array.from(skillEls).map(skillEl => skillEl.value);

  const image = document.getElementById('image').value;
  const website = document.getElementById('website').value;

  return { name, enrollment, gender, skills, image, website };
};

// Function to add the enrolled student to the list
const addEnrolledStudent = function (data) {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  wrapper.addEventListener("click", function (e) {
    if (e.target.className.includes("user-delete-btn")) {
      wrapper.remove();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "+";
  deleteBtn.className = "user-delete-btn";

  const textInfoContainer = document.createElement("div");
  textInfoContainer.className = "text-info-container";

  const name = document.createElement("p");
  name.className = "info-text";
  name.innerHTML = `Name: ${data.name}`;

  const enrollment = document.createElement("p");
  enrollment.className = "info-text";
  enrollment.innerHTML = `Enrollment Number: ${data.enrollment}`;

  const gender = document.createElement("p");
  gender.className = "info-text";
  gender.innerHTML = `Gender: ${data.gender}`;

  const skills = document.createElement("p");
  skills.className = "info-text";
  skills.innerHTML = `Skills: ${data.skills.join(", ")}`;

  textInfoContainer.appendChild(name);
  textInfoContainer.appendChild(enrollment);
  textInfoContainer.appendChild(gender);
  textInfoContainer.appendChild(skills);

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const image = document.createElement("img");
  image.className = "user-image";
  image.src = data.image;
  image.alt = "User Image";

  imageContainer.appendChild(image);

  wrapper.append(textInfoContainer, imageContainer, deleteBtn);
  enrolledStudents.appendChild(wrapper);
};

// Event listener for the form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.checkValidity()) {
        const data = getData();
        addEnrolledStudent(data);
        resetForm();
    } else {
        form.classList.add("was-validated");
    }
});
