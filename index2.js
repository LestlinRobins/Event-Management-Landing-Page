const downloadUrl =
  "https://github.com/E-m-i-n-e-n-c-e/Revent/releases/download/beta1/REvent.v0.4.0-beta.apk";
const downloadButton = document.getElementById("downloadButton");
downloadButton.textContent = "Download";
downloadButton.disabled = false;
const versionText = document.getElementById("versionText");
const data = { name: "Revent", version: " v0.4.0 (beta)" }; // Define the data variable
versionText.textContent = data.name + data.version;
const appleButton = document.getElementsByClassName("apple-version-text")[0];
appleButton.textContent = data.name + data.version;

downloadButton.onclick = () => {
  window.location.href = downloadUrl;
};
function fetchAndCreateContributors() {
  try {
    let contributors = [
      { login: "K. Akhil", html_url: "https://github.com/E-m-i-n-e-n-c-e/" },
      { login: "Suhail Khan", html_url: "https://github.com/Suhail-Khan-06" },
      { login: "T. Kumar Harsh", html_url: "https://github.com/HarshCule10" },
      { login: "Kesavan G.", html_url: "https://github.com/kesavan272006" },
      {
        login: "Srimoneyshankar Ajith",
        html_url: "https://github.com/moneytosms",
      },
      { login: "Joswin M. J.", html_url: "https://github.com/Joswin-10" },
      { login: "Pranav C. R.", html_url: "https://www.github.com/pranav-c-r" },
      { login: "Muhammed Basil", html_url: "https://github.com/Basil-world" },
    ];

    // Shuffle the remaining contributors
    contributors = shuffleArray(contributors);

    const specialContributors = [
      {
        login: "Anita George",
        html_url: "https://github.com/AnitaGeorge1806",
      },
      { login: "Lestlin Robins", html_url: "https://github.com/LestlinRobins" },
    ];

    // Decide which row to place Anita and Lestlin (0, 1, or 2)
    const targetRow = Math.floor(Math.random() * 3);

    // Create rows with contributors
    createScrollingRows(contributors, specialContributors, targetRow);
  } catch (error) {
    console.error("Error fetching contributors:", error);
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
