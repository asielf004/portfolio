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

   Which sites may call this worker is a setting, not a code edit: add a
   plain Text variable named ALLOWED_ORIGINS, comma-separated, e.g.
     https://harf.pages.dev,https://asielf004.github.io
   Moving the site to another host is then a variable change, not a redeploy
   of this file. DEFAULT_ORIGINS below is only the fallback when that
   variable is unset. Allowing every origin means anyone's page can spend
   your credits, so it is not offered.
   ========================================================================== */

const DEFAULT_ORIGINS = ['https://asielf004.github.io'];

/* Nothing here should be able to run up a bill on long inputs: the app only
   ever sends a line, a word or a letter. */
const MAX_CHARS = 400;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin, env) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'POST only' }, 405, origin, env);
    }

    if (!allowed(env).includes(origin)) {
      return json({ error: 'origin not allowed' }, 403, origin, env);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'bad json' }, 400, origin, env);
    }

    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const voiceId = typeof body.voiceId === 'string' ? body.voiceId : '';

    if (!text || !voiceId) return json({ error: 'text and voiceId required' }, 400, origin, env);
    if (text.length > MAX_CHARS) return json({ error: 'text too long' }, 413, origin, env);
    if (!/^[A-Za-z0-9]{16,40}$/.test(voiceId)) return json({ error: 'bad voiceId' }, 400, origin, env);

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
      return json({ error: 'tts upstream failed' }, upstream.status, origin, env);
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders(origin, env),
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  }
};

/* Origins come from the ALLOWED_ORIGINS variable when it is set, so changing
   host does not mean editing and redeploying this file. */
function allowed(env) {
  const configured = (env && env.ALLOWED_ORIGINS) || '';
  const list = configured
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return list.length ? list : DEFAULT_ORIGINS;
}

/* Echo back only an origin that is on the list — never the request's own,
   which would hand permission to whoever asked. */
function corsHeaders(origin, env) {
  const list = allowed(env);
  return {
    'Access-Control-Allow-Origin': list.includes(origin) ? origin : list[0],
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

function json(payload, status, origin, env) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(origin, env), 'Content-Type': 'application/json' }
  });
}
