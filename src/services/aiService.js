const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const getAIResponse = async (messages) => {
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPEN_ROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin, 
        "X-Title": import.meta.env.VITE_APP_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3-8b-instruct:free", // Free model for testing
        "messages": messages 
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("AI response format error");
    }
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return "I'm having trouble connecting right now. Please check your connection.";
  }
};
