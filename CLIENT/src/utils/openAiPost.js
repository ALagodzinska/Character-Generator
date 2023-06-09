export const generateImage = async (prompt) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/openai/dalle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();
    return data;
  } catch {}
};

export const generateText = async (prompt) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/openai/chatgpt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
