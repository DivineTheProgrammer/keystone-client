# Keystone Client Demo

A small, deliberately minimal application that proves Keystone works as real, external authentication infrastructure.

## What this is

This app has no authentication code of its own. No password hashing, no session table, no login logic. Every piece of that lives in Keystone, a completely separate application running on its own port. This app's only job is to call Keystone's login endpoint directly and show what comes back.

That distinction matters. It is easy to build auth that only works because it is tightly wired into one specific app. It is a different, harder thing to build auth that a genuinely separate application can depend on without knowing anything about how it works internally, only that it can send an email and password to an endpoint and get back a real, valid session.

This app is that proof, not a description of it.

## How it works

The login page sends a request straight to Keystone's `/api/login` endpoint, running on a different port, from a browser. Keystone verifies the credentials, creates a session record, writes an audit log entry, and returns a real access token, all of which this app displays exactly as received, with no processing of its own.

## Related

Keystone itself: https://github.com/DivineTheProgrammer/keystone
