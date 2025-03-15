export async function handler(event) {
  try {
    // Determine what to fetch based on the path parameter
    const requestPath = event.path || "";
    const isContributors = requestPath.includes("/contributors");

    let endpoint;
    if (isContributors) {
      endpoint =
        "https://api.github.com/repos/E-m-i-n-e-n-c-e/Revent/contributors";
    } else {
      endpoint =
        "https://api.github.com/repos/E-m-i-n-e-n-c-e/events_manager/releases";
    }

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error in GitHub Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from GitHub" }),
    };
  }
}
