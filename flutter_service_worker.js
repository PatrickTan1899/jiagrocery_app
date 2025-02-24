'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "7252b40cfa001f07974e4a95400eb0a5",
"assets/AssetManifest.bin.json": "919e8776f271b4e8059622b12019036a",
"assets/AssetManifest.json": "2b48c1f822dfb0eb6a350a42399154e8",
"assets/assets/fonts/draft-b.ttf": "b6644e78fbd7dbf720956f8e28c9c6da",
"assets/assets/fonts/draft.ttf": "725c0c9eb11363cd0de47c31f147e1a7",
"assets/assets/fonts/micross.ttf": "e7c9ad14477980e5588aa369fe0db2a7",
"assets/assets/fonts/Sans-Regular.ttf": "57a17283ccfc2d789ece38af6ff89298",
"assets/assets/fonts/SansSerif.ttf": "402d5a5afc6d45acc5f1cd3a6056db63",
"assets/assets/icons/dashboard.svg": "f54d022ea72bed9c8a8de0105c893af6",
"assets/assets/icons/logo.svg": "a0da078bc1c52e19a9194a65649d7e05",
"assets/assets/images/Login.png": "10f8f95c8b4d05ef1741497c61b58a21",
"assets/assets/images/logo.png": "8b4ac3bcf8afe8217453311c7db8fc73",
"assets/assets/images/noimage.png": "8f6a6965fb0f1eae6d38533f556a1883",
"assets/assets/lotties/empty-cart.json": "1364b16f8027360deb948ed969ab0f40",
"assets/assets/lotties/successfully-done.json": "628931f9bbe0eb10c1037f0043fef7b2",
"assets/FontManifest.json": "8d7acaa4ef93bf2df5220cedd1bfadf8",
"assets/fonts/MaterialIcons-Regular.otf": "17ccf7ee4d14b89bb7c72efd66387efd",
"assets/NOTICES": "6b047b9b282aa92529ab85d2f505ae99",
"assets/packages/esc_pos_utils_plus/resources/capabilities.json": "cfcc98d389d1ee4358f773efe8a9cdac",
"assets/packages/flutter_neumorphic_plus/fonts/NeumorphicIcons.ttf": "32be0c4c86773ba5c9f7791e69964585",
"assets/packages/flutter_pos_printer_platform_image_3_sdt/resources/capabilities.json": "b65abddfd828b29b21a561053b4d3883",
"assets/packages/unicons/icons/UniconsLine.ttf": "2ccc0859760cea4bc6d58d76bcf6b163",
"assets/packages/unicons/icons/UniconsSolid.ttf": "59478f879666fa4b425646b8a7c9c84d",
"assets/packages/unicons/icons/UniconsThinline.ttf": "d6746849cd712399a13b2b1b03d31bce",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "1eed36a8144f711794c4ccbdcf2496e9",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "73dfce4d75f2ef15ad7845ca019bcaa5",
"icons/Icon-192.png": "c5f82311468a783057e6b2fb91c99f46",
"icons/Icon-512.png": "3c1a8c037473261150b319eb7e6e7417",
"icons/Icon-maskable-192.png": "c5f82311468a783057e6b2fb91c99f46",
"icons/Icon-maskable-512.png": "3c1a8c037473261150b319eb7e6e7417",
"index.html": "50ce84e5087076d5b40d4da7ab8aed72",
"/": "50ce84e5087076d5b40d4da7ab8aed72",
"logo.png": "8b4ac3bcf8afe8217453311c7db8fc73",
"main.dart.js": "a29d76959f11eb037033b8fef7b0cc0d",
"manifest.json": "0f0681a60faf317967b48a2010da32c8",
"version.json": "d5ad128743d2d5b4d4387421aa7b478c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
