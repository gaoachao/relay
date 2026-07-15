# Security

Relay provides guidance. It never operates equipment.

## Defaults

- Credentials stay in `apps/agent`; errors expose neither keys nor stacks.
- OpenUI is limited to the registered component catalog.
- `RelayBridge` is the only typed native boundary.
- Medium/high-risk guidance requires `VerifyGate` confirmation.
- Recognized labels, model output, and generated instructions are untrusted.

## Before production

- Add authentication, per-user limits, and an exact CORS allowlist.
- Enforce image size, MIME, and retention limits.
- Monitor abuse without logging raw images by default.
- Red-team visual prompt injection, including labels and QR codes.
- Review accessibility and equipment safety per domain.
