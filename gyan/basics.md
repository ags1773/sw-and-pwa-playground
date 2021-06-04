### How service workers improve UX:

- once the SW takes over, it fetches data in background and caches it. If used properly, this should make the site quick & snappy, in addition to providing an offline experience

### Setup

- the browser needs to `register` the SW if it supports it. Do this on the window's `load` event
- Next, the sw needs to be served from the root level `http://host.com/sw.js`. This is because sw can only control anything on or below the level it resides. It can't control `http://host.com` if it's say placed in `http://host.com/assets/sw.js`

### Events:

- `install` event:

  - used to build the cache
  - `event.waitUntil` holds the sw in the install phase until all caches are built to prevent race condition

- `fetch` event:
  - the SW sits in between the site and network. It can intercept requests to the network & divert them to the cache. When this happens, the sw receives the fetch event
    <img src="./images/cache-first-strategy.png" alt="sw-cache-first-strategy">
  - used to serve files from cache
  - `event.respondWith` waits for the innermost promise to resolve & returns its value

### Notes:

- inside the worker, `self` is the worker. Otherwise, `self` is the current global object (window in the browser)
- SW either works on https or on http only when it's localhost
