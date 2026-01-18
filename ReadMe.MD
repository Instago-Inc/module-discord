# module/discord - V8 module

Send Discord webhook messages from your workflows with a compact helper. It is designed for simple notifications and keeps step code short.

Use it for lightweight alerts and status updates. Learn more at https://instago.ai.

## Technical reference

Exports:
- `configure({ webhookUrl })`
- `send({ content, username?, avatar_url?, embeds?, tts?, webhookUrl? })`

Usage:
- Call `configure` to store a default webhook URL (optional if you pass `webhookUrl` per call).
- Call `send` to post a message; it resolves to `{ ok, data }` on success or `{ ok, error }` on failure.
- `send` throws if called without options or without any webhook URL configured.

Configuration:
- `discord.webhook` (required) — Default Discord webhook URL (pass into `configure`).

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
