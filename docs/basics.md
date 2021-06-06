[< Back](readme.md)

### Setup

- the browser needs to `register` the SW if it supports it. Do this on the window's `load` event
- Next, the sw needs to be served from the root level `http://host.com/sw.js`. This is because sw can only control anything on or below the level it resides. It can't control `http://host.com` if it's say placed in `http://host.com/assets/sw.js`

### Notes:

- inside the worker, `self` is the worker. Otherwise, `self` is the current global object (window in the browser)
- SW either works on https or on http only when it's localhost
