[< Back](readme.md)

On the 2nd and subsequent loads, our app should

1. ensure the users get the latest content
2. make minimal network requests to save bandwidth

### History lesson

- in old days, browsers relied on the `last-modified` header to check if the cached resources had become stale, and sites cached resources by default
- browsers used to keep resources for an additional 10% of its lifetime
- this well-intentioned idea however might break today's tightly integrated sites that since it's possible to get into a state where users get files designed for different releases.
  Example: users might have css files from a previous release (since it was modified and the browser has cached it) and JS files from the latest release if the , breaking the whole UI

### HTTP caching

- the modern **default** is actually have no caching in the browser and use a CDN that's geographically close to the users
- `Cache-Control: max-age=0,must-revalidate,public` or specify `no-cache`. This basically means the the cached resources must be re-validated from the network every time before using (_NOTE: re-validated isn't the same as requested again!_). Re-validation is cheap, modern browsers use [etag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)
- for some requests, the asset's _fingerprint_ (hash) can be included in the file name and the cache time set to infinity `Cache-Control: max-age=31536000,immutable`. When the file's contents change, the hash changes thus invalidating the cached resource
- the disadvantage of using hashes in file names is that you can't rename the main index.html to index.xf349.html, since users will have to enter this to hit say your homepage. Bad UX! So use a middleground like cache for an hour
- This middleground of caching for say an hr can be applied to things like hero images (user will visit a news story just a couple of times at max), non-critical JSON data that's updated hourly, rate limited API responses

### The Cache storage API

- The service worker intercepts every network request made by the app. What to do with this is upto you. IRL most requests will be let through as if the SW didn't exist. But we can make use of the [cache storage API](https://web.dev/service-workers-cache-storage/)
- The cache storage API gives the devs complete control over the contents of the cache instead of just relying on the cache headers & browser
