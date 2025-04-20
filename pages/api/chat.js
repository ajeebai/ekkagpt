export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a wise monk therapist. Answer briefly with compassion and wisdom from Eastern traditions.',
        },
        ...messages,
      ],
      max_tokens: 250,
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
};
