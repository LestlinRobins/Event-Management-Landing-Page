export async function handler() {
  const response = await fetch(
    "https://api.github.com/repos/E-m-i-n-e-n-c-e/events_manager/releases",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
