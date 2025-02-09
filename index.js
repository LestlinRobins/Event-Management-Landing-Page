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
