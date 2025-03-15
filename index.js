// The URL of your GitHub repository's releases API
const repoUrl =
  "https://api.github.com/repos/E-m-i-n-e-n-c-e/events_manager/releases";

// Function to fetch all releases and update the page
async function fetchReleases() {
  try {
    // Fetch release data from GitHub API
    const response = await fetch("/.netlify/functions/github");
    const releases = await response.json();

    if (releases.length === 0) {
      console.log("No releases found.");
      return;
    }

    // Populate the releases list
    const releaseList = document.getElementById("releaseList");
    releases.forEach((release, index) => {
      // Create a list item for each release
      const releaseItem = document.createElement("li");
      releaseItem.classList.add("release-item");

      // Check if this is the latest release
      if (release.prerelease === false && index === 0) {
        releaseItem.classList.add("latest");
      }

      // Create a link to download the APK if available
      const apkAsset = release.assets.find((asset) =>
        asset.name.endsWith(".apk")
      );

      if (apkAsset) {
        const downloadLink = document.createElement("a");
        downloadLink.href = apkAsset.browser_download_url;
        downloadLink.textContent = release.name;
        releaseItem.appendChild(downloadLink);
      } else {
        releaseItem.textContent = release.name + " (No APK available)";
      }

      // Add a small div with the text "Latest" for the latest release
      if (releaseItem.classList.contains("latest")) {
        const latestDiv = document.createElement("div");
        latestDiv.textContent = "Latest";
        latestDiv.classList.add("latest-badge");
        releaseItem.appendChild(latestDiv);
      }
      // Add a small div with the text "The OG one" for the initial release
      if (index === releases.length - 1) {
        const ogDiv = document.createElement("div");
        ogDiv.textContent = "The OG one";
        ogDiv.classList.add("latest-badge");
        releaseItem.appendChild(ogDiv);
      }
      // Append the release item to the list
      releaseList.appendChild(releaseItem);
    });
  } catch (error) {
    console.error("Error fetching releases:", error);
  }
}

// Call the function to fetch releases when the page loads
fetchReleases();

// Function to fetch the latest release and update the download button
async function fetchLatestRelease() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/E-m-i-n-e-n-c-e/events_manager/releases/latest"
    );
    const data = await response.json();

    const apkAsset = data.assets.find((asset) => asset.name.endsWith(".apk"));

    if (apkAsset) {
      const downloadUrl = apkAsset.browser_download_url;
      const downloadButton = document.getElementById("downloadButton");
      downloadButton.textContent = "Download";
      downloadButton.disabled = false;
      const versionText = document.getElementById("versionText");
      versionText.textContent = data.name + " (Latest)";
      const appleButton =
        document.getElementsByClassName("apple-version-text")[0];
      appleButton.textContent = data.name + " (Latest)";

      downloadButton.onclick = () => {
        window.location.href = downloadUrl;
      };
    } else {
      console.error("APK file not found in the latest release.");
    }
  } catch (error) {
    console.error("Error fetching the latest release:", error);
  }
}
// Function to fetch contributors and update the team members section
// async function fetchContributors() {
//   try {
//     const response = await fetch(
//       "https://api.github.com/repos/KingRain/Washio/contributors"
//     );
//     const contributors = await response.json();

//     if (contributors.length === 0) {
//       console.log("No contributors found.");
//       return;
//     }

//     // Populate the contributors list
//     const teamMembers = document.getElementById("teamMembers");
//     teamMembers.classList.add("horizontal-scroll");

//     contributors.forEach((contributor) => {
//       // Create a div for each contributor
//       const contributorDiv = document.createElement("div");
//       contributorDiv.classList.add("contributor");

//       // Create a link to the contributor's GitHub profile
//       const profileLink = document.createElement("a");
//       profileLink.href = contributor.html_url;
//       profileLink.textContent = contributor.login;
//       profileLink.classList.add("profile-link");

//       // Append the avatar and profile link to the contributor div
//       contributorDiv.appendChild(profileLink);

//       // Append the contributor div to the team members section
//       teamMembers.appendChild(contributorDiv);
//     });
//   } catch (error) {
//     console.error("Error fetching contributors:", error);
//   }
// }

// Call the function to fetch contributors when the page loads
// fetchContributors();
// Call the function to fetch the latest release for the button
fetchLatestRelease();
// Function to fetch contributors and create scrolling rows
async function fetchAndCreateContributors() {
  try {
    // Fetch contributors from GitHub API
    const response = await fetch(
      "https://api.github.com/repos/E-m-i-n-e-n-c-e/Revent/contributors"
    );
    let contributors = await response.json();

    contributors = contributors.filter(
      (c) => c.login !== "AnitaGeorge1806" && c.login !== "LestlinRobins"
    );

    // Shuffle the remaining contributors
    contributors = shuffleArray(contributors);

    const specialContributors = [
      {
        login: "AnitaGeorge1806",
        html_url: "https://github.com/AnitaGeorge1806",
      },
      { login: "LestlinRobins", html_url: "https://github.com/LestlinRobins" },
    ];

    const targetRow = Math.floor(Math.random() * 3);

    // Create rows with contributors
    createScrollingRows(contributors, specialContributors, targetRow);
  } catch (error) {
    console.error("Error fetching contributors:", error);
    // Fallback with sample data in case the API fails
    const fallbackContributors = [
      { login: "Contributor1", html_url: "#" },
      { login: "Contributor2", html_url: "#" },
      { login: "Contributor3", html_url: "#" },
      { login: "Contributor4", html_url: "#" },
      { login: "Contributor5", html_url: "#" },
    ];

    const specialContributors = [
      {
        login: "AnitaGeorge1806",
        html_url: "https://github.com/AnitaGeorge1806",
      },
      { login: "LestlinRobins", html_url: "https://github.com/LestlinRobins" },
    ];

    createScrollingRows(fallbackContributors, specialContributors, 1);
  }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const newArray = [...array]; // Create a copy of the array
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to create scrolling rows with contributors
function createScrollingRows(contributors, specialContributors, specialRow) {
  const rows = [
    document.getElementById("row1"),
    document.getElementById("row2"),
    document.getElementById("row3"),
  ];

  // Calculate how many contributors to put in each row
  const regularContributorsCount = contributors.length;
  const contributorsPerRow = Math.ceil(regularContributorsCount / 3);

  // Distribute contributors across rows
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    // Create wrapper for continuous scrolling effect
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "scroll-row-content";
    rows[rowIndex].appendChild(contentWrapper);

    // Get starting index for this row's contributors
    const startIndex = rowIndex * contributorsPerRow;

    // Get contributors for this row
    let rowContributors = contributors.slice(
      startIndex,
      Math.min(startIndex + contributorsPerRow, regularContributorsCount)
    );

    if (rowIndex === specialRow) {
      // Add special contributors at a random position within this row
      const insertPosition = Math.min(
        Math.floor(Math.random() * (rowContributors.length + 1)),
        rowContributors.length
      );

      rowContributors = [
        ...rowContributors.slice(0, insertPosition),
        ...specialContributors,
        ...rowContributors.slice(insertPosition),
      ];
    }

    // We need enough contributors for the scrolling effect
    // If there aren't enough, duplicate the ones we have
    if (rowContributors.length < 6) {
      // Duplicate contributors until we have at least 6
      const originalLength = rowContributors.length;
      for (let i = 0; i < Math.ceil(6 / originalLength) - 1; i++) {
        rowContributors = [
          ...rowContributors,
          ...rowContributors.slice(0, originalLength),
        ];
      }
    }

    // Create initial set of contributors
    rowContributors.forEach((contributor) => {
      appendContributor(contentWrapper, contributor);
    });

    // Clone the content for seamless scrolling
    const contentClone = contentWrapper.cloneNode(true);
    rows[rowIndex].appendChild(contentClone);
  }
}

// Function to create a contributor element
function appendContributor(parent, contributor) {
  const contributorDiv = document.createElement("div");
  contributorDiv.className = "contributor";

  const link = document.createElement("a");
  link.href = contributor.html_url || "#";
  link.textContent = contributor.login;
  link.target = "_blank";

  contributorDiv.appendChild(link);
  parent.appendChild(contributorDiv);
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchAndCreateContributors);
