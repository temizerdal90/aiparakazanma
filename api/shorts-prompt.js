export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Sadece POST isteği desteklenir." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY bulunamadı. Vercel Environment Variables içine eklenmeli."
      });
    }

    const body = req.body || {};
    const topic = String(body.topic || "").slice(0, 900);
    const duration = String(body.duration || "30").slice(0, 20);
    const genre = String(body.genre || "Komedi + şaşırtıcı sahne").slice(0, 120);
    const style = String(body.style || "Gerçekçi, modern Türk sosyal medya videosu").slice(0, 160);
    const ending = String(body.ending || "Güçlü mesajlı final").slice(0, 120);

    if (!topic.trim()) {
      return res.status(400).json({ error: "Konu boş olamaz." });
    }

    const systemPrompt = `
Sen Türkçe YouTube Shorts video prompt uzmanısın.
Kullanıcı bir konu verecek. Sen sadece uygulanabilir, sahne sahne, video üretiminde kullanılabilecek net bir çıktı yazacaksın.

Kurallar:
- Türkçe yaz.
- 9:16 dikey YouTube Shorts formatını belirt.
- Süreyi dikkate al.
- Sahne akışını saniye saniye yaz.
- Diyalog, ekran yazısı, kamera/görsel not, müzik/tempo, final cümlesi ekle.
- Kadın/erkek veya kişiler hakkında kaba, cinselleştirici, aşağılayıcı dil kullanma.
- “Kesin viral olur / kesin para kazandırır” gibi garanti verme.
- Gerçekçi, sosyal medya temposuna uygun, kısa ve net yaz.
- Çıktının sonuna başlık önerileri, açıklama, hashtag ve kontrol listesi ekle.
`;

    const userPrompt = `
Konu: ${topic}
Süre: ${duration} saniye
Tür: ${genre}
Görüntü tarzı: ${style}
Final tipi: ${ending}

Bu konuya göre YouTube Shorts için kaliteli video promptu oluştur.
`;

    const geminiPayload = {
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\n" + userPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 1800
      }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Gemini API hatası",
        details: data
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("\n").trim() ||
      "Cevap üretilemedi.";

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({
      error: "Sunucu hatası",
      message: err?.message || String(err)
    });
  }
}
