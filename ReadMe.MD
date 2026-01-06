# module/discord - V8 module

Send messages to a Discord channel using webhooks with a small, focused API. It is designed to keep workflow steps short while delivering reliable notifications.

Use it when you want a straightforward, webhook-based alert path for automations. Learn more at https://instago.ai.

## Technical reference

Exports:
- `configure({ webhookUrl })`
- `send({ content, username?, avatar_url?, embeds?, tts?, webhookUrl? })`

Usage:
- Call `configure` once to set a default webhook URL.
- Call `send` to post a message. Passing `webhookUrl` in the call overrides the configured default.
- Returns `{ ok, data, error }` where `data` is the parsed response when available.

Configuration:
- `discord.webhook` (required) — Default Discord webhook URL.

Examples:
```js
const discord = require('discord@latest');

discord.configure({ webhookUrl: 'https://discord.com/api/webhooks/XXX/YYY' });

await discord.send({ content: 'Hello from workflow!' });

await discord.send({
  content: 'Custom sender',
  username: 'Workflow Bot',
  avatar_url: 'https://example.com/bot.png'
});

await discord.send({
  embeds: [
    {
      title: 'Build Status',
      description: 'All green',
      color: 0x2ecc71
    }
  ]
});
```
