/* ==========================================================================
   حرف — ElevenLabs proxy (Cloudflare Worker)

   Deploy this so the API key lives on a server instead of in the browser.
   The page sends only the text to speak; the key never leaves the worker.

   Step-by-step instructions, in Arabic and doable entirely from a browser
   (including an iPad), are in VOICE-SETUP.md next to this file. In short:

     1. dash.cloudflare.com → Workers & Pages → Create → Hello World → Deploy
     2. Edit code → replace everything with this file → Deploy
     3. Settings → Variables and Secrets → add a Secret (not a Text variable)
        named exactly ELEVENLABS_API_KEY → Deploy
     4. Copy the worker URL into the app: تقدّمي → الإعدادات

   The CLI route works too: wrangler secret put ELEVENLABS_API_KEY && wrangler deploy

   Set ALLOWED_ORIGIN to your own site before deploying. Left as '*' the
   endpoint is callable from any page on the internet, and the bill is yours.
   ========================================================================== */

const ALLOWED_ORIGIN = 'https://asielf004.github.io';

/* Nothing here should be able to run up a bill on long inputs: the app only
   ever sends a line, a word or a letter. */
const MAX_CHARS = 400;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== 'POST') {
      return json({ error: 'POST only' }, 405);
    }

    const origin = request.headers.get('Origin') || '';
    if (ALLOWED_ORIGIN !== '*' && origin !== ALLOWED_ORIGIN) {
      return json({ error: 'origin not allowed' }, 403);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'bad json' }, 400);
    }

    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const voiceId = typeof body.voiceId === 'string' ? body.voiceId : '';

    if (!text || !voiceId) return json({ error: 'text and voiceId required' }, 400);
    if (text.length > MAX_CHARS) return json({ error: 'text too long' }, 413);
    if (!/^[A-Za-z0-9]{16,40}$/.test(voiceId)) return json({ error: 'bad voiceId' }, 400);

    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
          'xi-api-key': env.ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text,
          model_id: body.modelId || 'eleven_multilingual_v2',
          voice_settings: body.voiceSettings || {
            stability: 0.6,
            similarity_boost: 0.8,
            style: 0.15,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!upstream.ok) {
      /* Pass the status through, but not the upstream body — it can echo
         account details back to the page. */
      return json({ error: 'tts upstream failed' }, upstream.status);
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders(),
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' }
  });
}
