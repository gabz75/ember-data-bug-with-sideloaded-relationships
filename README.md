# ember-data-bug-with-sideloaded-relationships

This project is meant to reproduce an issue with ember-data introduced in 2.14.

Issue: When loading resources with sideloaded relationship, some relationship association can be broken.

See `./tests/acceptances/belongs-to-in-includes-test.js` to reproduce the bug.
