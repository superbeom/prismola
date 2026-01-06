// n8n Code Node: Extreme English Mastery Engine (V3.0 - Pay-worthy Quality)
// 이 노드는 단순한 정보 제공을 넘어 '언어학적 컨설팅' 수준의 깊이 있는 프롬프트를 생성합니다.

const items = $input.all();

return items.map((item, index) => {
  const data = item.json;
  const expression = data.expression;
  const target_lang = data.target_lang || 'ko';

  const system_prompt = `
You are an 'Extreme Linguistic Consultant' at Prismola. Your mission is to provide an elite, $20/month subscription-grade analysis of the English expression "${expression}" for a ${target_lang} speaker.

[Core Philosophy: Deliver Value Beyond Definition]
1. 1% Micro-Nuance: Analyze the speaker's psychological state—confidence level (0-100%), irony, and subtle emotional weight.
2. Social Intelligence (Etiquette): Identify "Social-bonding" vs "Vibe-clashing" moments. Define the specific "Vibe" in daily life (hanging out with friends, meeting new people, family gatherings) that a dictionary can't catch.
3. Contrastive Superiority: Why is "${expression}" the "Winner" over its synonyms in casual talk? Create a clear contrast map.

[Linguistic Accuracy & Hallucination Guard]
- NEVER suggest broken grammar like "Could you what do you think". 
- Only suggest natural, native-level polite alternatives (e.g., "What are your thoughts on this?").

[Detailed Task Modules]
- Extreme Nuance Deep Dive: 4-5 sentences of high-level linguistic analysis.
- Contrast Map: Compare with 1-2 rivals. Explain why natives would choose THIS one specifically in a given Vibe.
- Social Calibration: Formality score and specific "usage warnings" for different social tiers (Boss, Friend, Stranger).
- Professional Mastery Quiz: The distractors must be grammatically perfect but "Socially Awkward" or "Vibe-clashing."
- **STRICT RULE**: Quiz \`options\` (A, B, C) MUST be **PURE ENGLISH expressions**. 
- **NO PARENTHESES**: DO NOT include any explanations or ${target_lang} text in parentheses within the \`options\` field.
- **FEEDBACK ONLY**: All reasoning, context explanations, or why an option is "too casual" must be placed EXCLUSIVELY in the \`social_calibration_feedback\` field.

[Strict Formatting]
- Tone: Sophisticated, insightful, and elite. Use polite honorifics in ${target_lang}.
- Language: All values in JSON must be in ${target_lang} (except specifically requested English content).
- JSON: Return ONLY a valid JSON object. No preamble, no backticks.
`;

  const user_prompt = `
Produce an "Extreme Mastery Card" for "${expression}" in ${target_lang}.
Maximize the depth of insight. Make it worthy of a premium paid service.

[Required JSON Schema]
{
  "expression": "${expression}",
  "micro_nuance_analysis": "3-5 sentences analyzing the 1% micro-vibe and speaker's psychological state in ${target_lang}",
  "social_intelligence_map": {
    "formality_score": "1-10",
    "etiquette_guide": "Strategic advice on who to use this with (friends, strangers, dates, etc.) and cultural taboos in ${target_lang}",
    "vibe_summary": "The definitive 'Atmosphere' in daily social contexts in ${target_lang}"
  },
  "contrastive_mastery": {
    "synonym_rivals": ["Synonym 1", "Synonym 2"],
    "why_this_wins": "Strategic reason to choose '${expression}' over rivals in specific contexts in ${target_lang}"
  },
  "mastery_dialogue": [
    { "role": "A", "en": "...", "translation": "...", "intent": "A's psychological intent" },
    { "role": "B", "en": "...", "translation": "...", "reaction": "B's emotional reaction" },
    { "role": "A", "en": "...", "translation": "...", "resolution": "Strategic closure" }
  ],
  "native_expert_hack": "A 'secret' high-level tip for perfect usage in ${target_lang}",
  "extreme_iq_quiz": {
    "scenario": "A complex everyday social situation (e.g., at a party, traveling, with a new friend) described in ${target_lang}",
    "question": "Which response is most socially appropriate (e.g., '사회적으로 가장 적절한 답변은?')?",
    "options": {
      "A": "${expression}",
      "B": "Grammatically correct but socially unnatural/stiff",
      "C": "Similar meaning but vibe-clashing (e.g., too formal for a casual hangout)"
    },
    "answer": "A",
    "social_calibration_feedback": "Detailed analysis of why A is socially perfect and why B/C lack 'vibe intelligence' in ${target_lang}"
  },
  "tags": ["archeology", "psychology", "social-iq"]
}
`;

  return {
    json: {
      system_prompt,
      user_prompt,
      expression,
      target_lang
    },
    pairedItem: { item: index }
  };
});