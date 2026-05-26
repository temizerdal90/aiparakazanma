# Gemini API Kurulum Notu

Bu pakette `shorts-prompt-studyosu.html` sayfası Gemini API ile çalışacak şekilde hazırlandı.

## Vercel ayarı

Vercel > Project > Settings > Environment Variables

Yeni değişken ekle:

- Name: `GEMINI_API_KEY`
- Value: Google AI Studio'dan aldığın API key
- Environment: Production, Preview, Development seçilebilir

Sonra yeniden Deploy et.

## Dosyalar

- `/api/shorts-prompt.js` → Gemini API çağrısını sunucuda yapar.
- `shorts-prompt-studyosu.html` → kullanıcı arayüzü.
- `script.js` → Gemini ile üret / API'siz üret butonları.

## Güvenlik

API key asla HTML içine yazılmadı. Vercel Environment Variables içinde saklanmalı.

## Test

Canlıda:
https://www.aiparakazanma.com/shorts-prompt-studyosu.html

Buton:
- Gemini ile üret → API kullanır
- API'siz üret → yerel yedek üretici
