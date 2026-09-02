
function showPage(pageId, clickedLink) {
    event.preventDefault();

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });



    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    const links = document.querySelectorAll(".nav-link");

    links.forEach(function(link) {
        link.classList.remove("active");
    });


    if (clickedLink) {
        clickedLink.classList.add("active");
    }

    document.getElementById("navMenu").classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showPageById(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    document.getElementById(pageId).classList.add("active-page");


    const links = document.querySelectorAll(".nav-link");

    links.forEach(function(link) {

        link.classList.remove("active");

        if (
            link.getAttribute("onclick") &&
            link.getAttribute("onclick").includes(pageId)
        ) {
            link.classList.add("active");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function toggleMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("show");
}


function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");
}


function openPetitionModal() {

    document
        .getElementById("petitionModal")
        .classList.add("show");
}


function openProjectModal() {

    document
        .getElementById("projectModal")
        .classList.add("show");
}


function openComplaintModal() {

    document
        .getElementById("complaints")
        .scrollIntoView({
            behavior: "smooth"
        });

    document
        .getElementById("complaintTitle")
        .focus();
}


function openForumModal() {

    document
        .getElementById("forumModal")
        .classList.add("show");
}


function closeModal(modalId) {

    document
        .getElementById(modalId)
        .classList.remove("show");
}


window.addEventListener("click", function(event) {

    if (event.target.classList.contains("modal")) {

        event.target.classList.remove("show");

    }

});



function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);
}


let projects = [

    {
        id: 1,

        name: "Community Road Development",

        department: "Roads & Transport",

        location: "Ward 12",

        budget: "₹20 Lakhs",

        progress: 100,

        status: "Officially Completed",

        concern: true
    },


    {
        id: 2,

        name: "Public Drinking Water Project",

        department: "Water & Sanitation",

        location: "Ward 8",

        budget: "₹15 Lakhs",

        progress: 75,

        status: "In Progress",

        concern: false
    },


    {
        id: 3,

        name: "Street Light Installation",

        department: "Electricity",

        location: "Ward 5",

        budget: "₹8 Lakhs",

        progress: 60,

        status: "In Progress",

        concern: false
    }

];


function displayProjects() {

    const container =
        document.getElementById("projectsContainer");


    container.innerHTML = "";


    projects.forEach(function(project) {


        let statusClass = "green";


        if (project.concern) {

            statusClass = "orange";

        }


        const card = document.createElement("div");

        card.className = "project-card";


        card.innerHTML = `

            <div class="project-card-header">

                <div class="project-icon">

                    <i class="fa-solid fa-city"></i>

                </div>

                <span class="status ${statusClass}">

                    ${project.status}

                </span>

            </div>


            <h3>
                ${project.name}
            </h3>


            <p>
                ${project.department}
            </p>


            <div class="project-details">

                <div class="detail-row">

                    <span>Location</span>

                    <strong>
                        ${project.location}
                    </strong>

                </div>


                <div class="detail-row">

                    <span>Budget</span>

                    <strong>
                        ${project.budget}
                    </strong>

                </div>


                <div class="detail-row">

                    <span>Official Progress</span>

                    <strong>
                        ${project.progress}%
                    </strong>

                </div>

            </div>


            <div class="progress-bar">

                <div style="width:${project.progress}%"></div>

            </div>


            <br>


            <button
                class="verify-btn"
                onclick="verifyExistingProject(${project.id})">

                <i class="fa-solid fa-camera"></i>

                Verify This Project

            </button>

        `;


        container.appendChild(card);

    });

}

function verifyExistingProject(projectId) {

    const project =
        projects.find(function(item) {

            return item.id === projectId;

        });


    if (project) {

        document
            .getElementById("verificationProject")
            .value = project.name;

    }


    openProjectModal();
}


document
    .getElementById("projectForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const projectName =
            document.getElementById(
                "verificationProject"
            ).value;


        const result =
            document.getElementById(
                "verificationResult"
            ).value;


        const location =
            document.getElementById(
                "verificationLocation"
            ).value;


        const photo =
            document.getElementById(
                "verificationPhoto"
            ).files[0];


        let message =
            "Project verification submitted!";


        if (result !== "Verified") {

            message =
                "Concern recorded. Authorities can review this verification.";

        }


        showToast(message);


        document
            .getElementById("projectForm")
            .reset();


        closeModal("projectModal");


        console.log({

            project: projectName,

            result: result,

            location: location,

            photo: photo

        });

    });


function getLocation() {

    const locationText =
        document.getElementById("locationText");


    if (!navigator.geolocation) {

        locationText.textContent =
            "Geolocation is not supported.";

        return;

    }


    locationText.textContent =
        "Getting your location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            locationText.textContent =
                `Location: ${latitude.toFixed(5)},
                ${longitude.toFixed(5)}`;

        },


        function() {

            locationText.textContent =
                "Unable to get location.";

        }

    );

}


let petitions =
    JSON.parse(
        localStorage.getItem("petitions")
    ) || [

        {
            id: 1,

            title:
                "Repair the damaged road near the school",

            category:
                "Roads",

            description:
                "The road has been damaged and needs urgent repair to improve public safety.",

            votes: 184
        },


        {
            id: 2,

            title:
                "Install street lights in Ward 12",

            category:
                "Public Safety",

            description:
                "Residents are requesting additional street lights in poorly illuminated areas.",

            votes: 126
        },


        {
            id: 3,

            title:
                "Improve waste collection schedule",

            category:
                "Environment",

            description:
                "Residents want a more reliable waste collection schedule.",

            votes: 93
        }

    ];



function displayPetitions() {

    const container =
        document.getElementById(
            "petitionsContainer"
        );


    container.innerHTML = "";


    petitions.sort(function(a, b) {

        return b.votes - a.votes;

    });


    petitions.forEach(function(petition, index) {

        const card =
            document.createElement("div");


        card.className =
            "petition-card";


        const percentage =
            Math.min(
                (petition.votes / 200) * 100,
                100
            );


        card.innerHTML = `

            <div class="petition-top">

                <span class="category-tag">

                    ${petition.category}

                </span>

                <span>

                    #${index + 1}

                </span>

            </div>


            <h3>

                ${petition.title}

            </h3>


            <p>

                ${petition.description}

            </p>


            <div class="vote-section">

                <div class="vote-count">

                    ${petition.votes}

                </div>

                <div class="vote-label">

                    Citizen supporters

                </div>


                <div class="vote-bar">

                    <div
                        style="width:${percentage}%">
                    </div>

                </div>


                <div class="petition-actions">

                    <button
                        class="vote-btn"
                        onclick="votePetition(${petition.id})">

                        <i class="fa-solid fa-thumbs-up"></i>

                        Support

                    </button>


                    <button
                        class="report-btn"
                        onclick="reportPetition(${petition.id})">

                        <i class="fa-solid fa-flag"></i>

                        Report

                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });


    document.getElementById(
        "petitionCount"
    ).textContent = petitions.length;

}



function votePetition(id) {

    const petition =
        petitions.find(function(item) {

            return item.id === id;

        });


    if (!petition) {
        return;
    }


    petition.votes++;


    localStorage.setItem(
        "petitions",
        JSON.stringify(petitions)
    );


    displayPetitions();


    showToast(
        "Your support has been added!"
    );

}



function reportPetition(id) {

    const petition =
        petitions.find(function(item) {

            return item.id === id;

        });


    if (!petition) {
        return;
    }


    const confirmReport =
        confirm(
            "Are you sure you want to report this petition?"
        );


    if (confirmReport) {

        showToast(
            "Petition report submitted for review."
        );

    }

}

document
    .getElementById("petitionForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const title =
            document.getElementById(
                "petitionTitle"
            ).value;


        const category =
            document.getElementById(
                "petitionCategory"
            ).value;


        const description =
            document.getElementById(
                "petitionDescription"
            ).value;


        const newPetition = {

            id: Date.now(),

            title: title,

            category: category,

            description: description,

            votes: 1

        };


        petitions.push(newPetition);


        localStorage.setItem(
            "petitions",
            JSON.stringify(petitions)
        );


        displayPetitions();


        closeModal("petitionModal");


        this.reset();


        showToast(
            "Petition created successfully!"
        );

    });

let complaints =
    JSON.parse(
        localStorage.getItem("complaints")
    ) || [

        {
            id: "CMP1024",

            title:
                "Street light not working",

            department:
                "Electricity",

            location:
                "Ward 12",

            description:
                "Multiple street lights are not working.",

            status:
                "Assigned",

            date:
                "Today"
        },


        {
            id: "CMP1023",

            title:
                "Damaged road",

            department:
                "Roads & Transport",

            location:
                "Main Junction",

            description:
                "Road surface is damaged and requires repair.",

            status:
                "Inspection Completed",

            date:
                "Yesterday"
        }

    ];


function displayComplaints() {

    const container =
        document.getElementById(
            "complaintsContainer"
        );


    container.innerHTML = "";


    complaints.forEach(function(complaint) {

        const card =
            document.createElement("div");


        card.className =
            "complaint-card";


        card.innerHTML = `

            <div class="complaint-top">

                <span class="department">

                    ${complaint.department}

                </span>

                <span class="complaint-status">

                    ${complaint.status}

                </span>

            </div>


            <h3>

                ${complaint.title}

            </h3>


            <p>

                ${complaint.description}

            </p>


            <div class="detail-row">

                <span>Location</span>

                <strong>

                    ${complaint.location}

                </strong>

            </div>


            <div class="detail-row">

                <span>Complaint ID</span>

                <strong>

                    ${complaint.id}

                </strong>

            </div>

        `;


        container.appendChild(card);

    });


    document.getElementById(
        "complaintCount"
    ).textContent = complaints.length;

}

document
    .getElementById("complaintForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const title =
            document.getElementById(
                "complaintTitle"
            ).value;


        const category =
            document.getElementById(
                "complaintCategory"
            ).value;


        const location =
            document.getElementById(
                "complaintLocation"
            ).value;


        const description =
            document.getElementById(
                "complaintDescription"
            ).value;


        const complaint = {

            id:
                "CMP" +
                Math.floor(
                    1000 + Math.random() * 9000
                ),

            title: title,

            department: category,

            location: location,

            description: description,

            status: "Submitted",

            date: new Date().toLocaleDateString()

        };


        complaints.unshift(complaint);


        localStorage.setItem(
            "complaints",
            JSON.stringify(complaints)
        );


        displayComplaints();


        this.reset();


        showToast(
            "Complaint submitted successfully!"
        );

    });



function submitForum() {

    closeModal("forumModal");

    showToast(
        "Discussion posted successfully!"
    );

}




displayProjects();

displayPetitions();

displayComplaints();


