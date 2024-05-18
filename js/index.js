function increaseViewCount(projectNumber, event) {
    // Prevent the default behavior of the <a> tag
    event.preventDefault();
    // Get the IP address of the user
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const key = "project" + projectNumber + "_viewedIPs";
            const viewedIPs = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
            const lastViewed = localStorage.getItem("lastViewed_" + ipAddress);

            // Check if the IP address has already viewed the project and the count is increased every 1 sec
            if (!viewedIPs.includes(ipAddress) || (lastViewed && Date.now() - lastViewed > 1000)) {
                // Increment the view count
                var viewCounterElement = document.getElementById("viewCounter" + projectNumber);
                var count = parseInt(viewCounterElement.textContent.split(" ")[0]);
                count++;
                viewCounterElement.textContent = count + " view";

                // Store the IP address in local storage to prevent multiple views
                viewedIPs.push(ipAddress);
                localStorage.setItem(key, JSON.stringify(viewedIPs));
                localStorage.setItem("project" + projectNumber + "_viewCount", count);

                // Update the last viewed timestamp
                localStorage.setItem("lastViewed_" + ipAddress, Date.now());

                // Redirect to the project page
                var weburl = "projects/projectInfo" + projectNumber + ".html";
                window.location.href = weburl;
            } else {
                window.location.href = weburl;
            }
        })
        .catch(error => console.error('Error fetching IP address:', error));
}

window.onload = function () {
    // Initialize view counts for all projects
    for (var i = 1; i <= 4; i++) {
        var viewCount = localStorage.getItem("project" + i + "_viewCount");
        var viewCounterElement = document.getElementById("viewCounter" + i);
        if (viewCount !== null) {
            viewCounterElement.textContent = viewCount + " view";
        }
    }
};

function storeProjectsNames() {
    for (var i = 1; i < 5; i++) {
        localStorage.setItem("project" + i + "_name", document.getElementById("ProjectName" + (i)).textContent);
    }
}

function findTopMostViewed() {
    let projects = []; // Creating an empty array

    for (var i = 1; i <= 4; i++) {
        var viewCount = localStorage.getItem("project" + i + "_viewCount");
        var viewCounterElement = document.getElementById("viewCounter" + i);
        projects.push({ number: i, count: viewCount });
    }
    projects.sort((a, b) => b.count - a.count); // Sort the projects array in descending order based on the count property
    for (var i = 1; i <= 3; i++) {
        const list = document.getElementById('topList');
        const li = document.createElement('li');
        li.textContent = `${localStorage.getItem("project" + projects[i - 1].number + "_name")}`;
        list.appendChild(li);
    }
}

storeProjectsNames();
findTopMostViewed();