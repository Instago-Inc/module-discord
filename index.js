// Discord helper for workflows using channel webhooks.
// No C++ changes required; uses http.fetch.
//
// Recommended approach: use a Channel Webhook (no bot token needed).
// Create in Discord: Channel Settings → Integrations → Webhooks → New Webhook.
// Copy the webhook URL and configure the module with it.
//
// API
// - configure({ webhookUrl })
// - send({ content, username?, avatar_url?, embeds?, tts?, webhookUrl? })
//   -> Promise resolving to Discord response (JSON) or status text.

(function () {
  const json = require('json@1.0.0');
  const log = require('log@1.0.0').create('discord');
  const state = { webhookUrl: null };

  function configure(opts) {
    if (!opts || typeof opts !== 'object') throw new Error('discord.configure: options required');
    if (opts.webhookUrl) state.webhookUrl = String(opts.webhookUrl);
  }

  function send(opts) {
    if (!opts || typeof opts !== 'object') throw new Error('discord.send: options required');
    const url = opts.webhookUrl || state.webhookUrl;
    if (!url) throw new Error('discord.send: configure({ webhookUrl }) or pass opts.webhookUrl');
    const payload = {};
    if (typeof opts.content === 'string') payload.content = opts.content;
    if (typeof opts.username === 'string') payload.username = opts.username;
    if (typeof opts.avatar_url === 'string') payload.avatar_url = opts.avatar_url;
    if (Array.isArray(opts.embeds)) payload.embeds = opts.embeds;
    if (typeof opts.tts === 'boolean') payload.tts = opts.tts;

    log.debug('send:start', { hasContent: typeof payload.content==='string', embeds: Array.isArray(payload.embeds) ? payload.embeds.length : 0 });
    return sys.http.fetch({
      url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => {
      const parsed = json.parseSafe(res.text, res.text || 'ok');
      log.debug('send:done', { status: res && res.status, bytes: (res && (res.text||'')).length });
      return { ok: true, data: parsed };
    }, err => { log.error('send:error', (err && (err.message||err)) || 'unknown'); return { ok: false, error: (err && (err.message||String(err))) || 'unknown' }; });
  }

  module.exports = { configure, send };
})();
