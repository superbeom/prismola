// n8n Code Node: Parse LLM Response
// Adaptation for Groq/OpenAI response format

const items = $input.all();

return items.map((item, index) => {
    const response = item.json;
    let contentStr = "";

    // 1. Extract content string from Groq/OpenAI structure
    if (response.choices && response.choices[0] && response.choices[0].message) {
        contentStr = response.choices[0].message.content;
    } else if (response.content) {
        contentStr = response.content;
    } else {
        contentStr = typeof response === 'string' ? response : JSON.stringify(response);
    }

    // 2. Parse JSON content
    let parsedContent = {};
    try {
        const cleanStr = contentStr.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedContent = JSON.parse(cleanStr);
    } catch {
        parsedContent = { error: "Failed to parse JSON", raw: contentStr };
    }

    // 3. Output
    return {
        json: {
            ...response,
            content: parsedContent
        },
        pairedItem: { item: index }
    };
});
