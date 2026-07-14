# Security

Relay explains a control panel. It does not operate equipment by itself.

## Defaults

- Model credentials exist only in `apps/agent`.
- The local demo uses a deterministic mock unless a key is configured.
- OpenUI can use only the registered Relay component catalog.
- Medium- and high-risk actions require `VerifyGate` and explicit confirmation.
- Native capability crosses one typed boundary: `RelayBridge`.
- Error messages do not return model credentials or stack traces.

## Before production

- Add authenticated sessions and per-user rate limits.
- Replace permissive development CORS with an allowlist.
- Set strict image size, MIME, and retention policies.
- Add abuse monitoring without logging raw panel images by default.
- Red-team prompt injection embedded in labels, screens, and QR codes.
- Run an accessibility and equipment-safety review for every supported domain.

Treat every recognized label and every generated instruction as untrusted until the user confirms it.
