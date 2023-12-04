if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[c]) return;
    let t = {};
    const r = (e) => s(e, c),
      b = { module: { uri: c }, exports: t, require: r };
    a[c] = Promise.all(i.map((e) => b[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-50de5c5d"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "9d0d7c8966c9d188a6bac722b414a251",
        },
        {
          url: "/_next/static/chunks/0e5ce63c-5e8f00902b799d04.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/1267-7fd492aa4ea8d13b.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/1466-cfbd0efb6d23b502.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/2000-62ebba4b4c9da651.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/2312-558497759858be57.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/2455-ad70e8eaa0216630.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/2472-a594bd64d4bbca01.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/2633-388d50663d83b8c8.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/2747-24aeb5fa44da4775.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/3171.ef3888c05a31d319.js",
          revision: "ef3888c05a31d319",
        },
        {
          url: "/_next/static/chunks/3215-fdb8529329221104.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/3565-dfd0b482d2ea9ad9.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/413-884229ffaa96a6ba.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/4184-8890ad46f40a0b05.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/627-d0a7bd04000549d8.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/6481-6c971426e96cca1a.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/7076-ba839e9e4bb0d3ab.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/8065-7d613c4aa727a51d.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/8326-cae0cf7fa5759c3a.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/8481-4ce1b7ca7df64db1.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/8978-412d70a3c0f403a2.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/@modal/default-3726d6c7246ea1db.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/auth/page-434db707f46c0742.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/courses/%5Bslug%5D/layout-7fd27cdb3986b64a.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/courses/%5Bslug%5D/page-e6691d3a476b9b11.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/courses/page-3f245c29d84307db.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/dashboard/page-4b40801c3a48a629.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/layout-c09e898ce2e7d67e.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/lesson/%5Bslug%5D/%5Bchapter%5D/%5Blesson%5D/completed/page-f3d5334aa70a8d39.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/lesson/%5Bslug%5D/%5Bchapter%5D/%5Blesson%5D/page-552a47be526c9a46.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/lesson/layout-043246850b5783e8.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/login/page-c01da1aa9d96b641.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/not-found-50a61b1c11bee864.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/notes/%5BnoteId%5D/page-28a0cd6bc552091e.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/notes/layout-34e4d0d00e9841df.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/page-f766d57b5e8813a2.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/pricing/page-a940edd4177cdb32.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/settings/account/loading-d93126bbfd2d38f8.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/settings/account/page-33137f03417200b3.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/settings/achievements/page-e986de84f3350481.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/settings/billing/loading-c37840f113254de8.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/settings/billing/page-42169069160d1171.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/settings/layout-83b2e68d9d735e89.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/app/signup/page-f795e9beb1849983.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/d3ac728e-af88868c7822c9e0.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/fd9d1056-b2d561b10bb15054.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/framework-4498e84bb0ba1830.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/main-5bfea0bdd8962290.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/main-app-f4b25c2b28e57862.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/pages/_app-0a6f9986ee298e67.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/pages/_error-77acd5d276fadc61.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-4e57353121d3c31d.js",
          revision: "zAx-gCg0RrbObZRqwVewu",
        },
        {
          url: "/_next/static/css/158a20514421c466.css",
          revision: "158a20514421c466",
        },
        {
          url: "/_next/static/media/18d59d84df9977f3-s.p.woff2",
          revision: "99500811421e327cd107481cb90c96e9",
        },
        {
          url: "/_next/static/media/2c74a8c9278e5331-s.p.woff2",
          revision: "8f5a244c6105882b3a8f82d517ada5a9",
        },
        {
          url: "/_next/static/media/2ece3e04ee7a0792-s.p.woff2",
          revision: "a8b5c9711927d46918ccb3a825c4f2e7",
        },
        {
          url: "/_next/static/media/342092434136b772-s.p.woff2",
          revision: "dd5b2c2af913564e4d9047d7f2cd29b6",
        },
        {
          url: "/_next/static/media/61f77dbea86f3383-s.p.woff2",
          revision: "1c8695040a46f5bbead1ea2808fd45b3",
        },
        {
          url: "/_next/static/media/71c6132e03423ca1-s.p.woff2",
          revision: "6ff0257ab0ba5244a291f146238499d2",
        },
        {
          url: "/_next/static/media/82aae8ca2b72fd34-s.p.woff2",
          revision: "cbedca143caa490e17c0599508543947",
        },
        {
          url: "/_next/static/media/85afdab07c7509ad-s.p.woff2",
          revision: "1f6ec68169cab381f350f2ee87449e59",
        },
        {
          url: "/_next/static/media/8e8b037beab610fb-s.p.woff2",
          revision: "20424481f9d6605d69f61ad0481dc4c6",
        },
        {
          url: "/_next/static/media/96ddd4688686333e-s.p.woff2",
          revision: "5becde52e00594a68f278310d970abe1",
        },
        {
          url: "/_next/static/media/a704460fd48d77b7-s.p.woff2",
          revision: "85179d25ea2653fde6ec111112616b4f",
        },
        {
          url: "/_next/static/media/b4a16e4c8f638a5f-s.p.woff2",
          revision: "e7922022b406f09ebd0d0ee3c25c543d",
        },
        {
          url: "/_next/static/media/bcf42cbeb65610b9-s.p.woff2",
          revision: "74ddb57311c3050b56c77e32c97682ff",
        },
        {
          url: "/_next/static/media/be6218e5026ae10e-s.p.woff2",
          revision: "413ec7bcc63bfa44040ddbcff266661b",
        },
        {
          url: "/_next/static/media/blazing.d9be3232.png",
          revision: "ddeb28edd9e7e4773530069ec11bbbc6",
        },
        {
          url: "/_next/static/media/bro.80624c80.gif",
          revision: "be4e6eb1f2f0a6a360cc1d6607c18d4a",
        },
        {
          url: "/_next/static/media/c38b365fb81b1f2b-s.p.woff2",
          revision: "4d07d4352a65df2afa7093340546add8",
        },
        {
          url: "/_next/static/media/e088269fbf732c47-s.p.woff2",
          revision: "038a44a0c6c27a5db0c6e5cbcd185998",
        },
        {
          url: "/_next/static/media/e2a903379250b95e-s.p.woff2",
          revision: "4d910bde1d48552ef566a565066c85b2",
        },
        {
          url: "/_next/static/media/fefb9e7946adf7ef-s.p.woff2",
          revision: "9003e77adbd5c8cfa0799452768e8805",
        },
        {
          url: "/_next/static/media/fireball.217969e1.gif",
          revision: "e3aa4f0a0af3da024b59f34ba2ea0cad",
        },
        {
          url: "/_next/static/media/goldfish.70e42b2b.png",
          revision: "60feba4373501c2d751cee73b1525d70",
        },
        {
          url: "/_next/static/media/interactivelearning.d5caa2b4.png",
          revision: "4aca1dd032e2b35b04e1d66d385df256",
        },
        {
          url: "/_next/static/media/message.bf6f6d12.png",
          revision: "0a2009db9dcd3f757bb2f499ab09c6ba",
        },
        {
          url: "/_next/static/media/wtfcoin.b0c947a6.png",
          revision: "6aacd28f0e222d5e8d90c2de00e20392",
        },
        {
          url: "/_next/static/zAx-gCg0RrbObZRqwVewu/_buildManifest.js",
          revision: "b9418b3f2fddb202e5112ea6e82c15fe",
        },
        {
          url: "/_next/static/zAx-gCg0RrbObZRqwVewu/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/ai.png", revision: "65094b68a04a7f876e2968de4eb08f32" },
        {
          url: "/alienplanet.png",
          revision: "f350a8047fa50c5fd5b42d9f960581d4",
        },
        {
          url: "/askasyoulearn.png",
          revision: "c2013886efe464862b07549469652a7b",
        },
        { url: "/bender.png", revision: "81ceaebf7e0269e30997a528f7d74cac" },
        { url: "/blazing.png", revision: "ddeb28edd9e7e4773530069ec11bbbc6" },
        { url: "/bro.gif", revision: "be4e6eb1f2f0a6a360cc1d6607c18d4a" },
        { url: "/click.mp3", revision: "fdf430e8e789959ef81caed3f5b89267" },
        { url: "/clickpop.mp3", revision: "e35af557352321c74356da5b4901d958" },
        { url: "/cool.png", revision: "2ad9cbc0338c7c49df1edec69ebfdea9" },
        { url: "/correct.mp3", revision: "4b4adccffa9c052b03b2ad3991b05a5d" },
        { url: "/cpu.png", revision: "951e678a11121b76b1b0dcbe0a1cc175" },
        { url: "/favicon.ico", revision: "a54ae24eaf68b483f164b8c0b02ff9d4" },
        { url: "/finish.mp3", revision: "1868e98da745bb4d203089c80543cfdd" },
        { url: "/fireball.gif", revision: "e3aa4f0a0af3da024b59f34ba2ea0cad" },
        { url: "/flip.mp3", revision: "3dbf0a877492b82a9229282e9c36aad0" },
        { url: "/function.png", revision: "ec2039cfae49428c0c486f8ce69aee71" },
        { url: "/garden.png", revision: "c74897a4f6ad45157484be90a351767d" },
        {
          url: "/geometrygarden.png",
          revision: "685060c942945524b627e6828dd3068b",
        },
        { url: "/goldfish.png", revision: "60feba4373501c2d751cee73b1525d70" },
        {
          url: "/icon-192x192.png",
          revision: "3ef96dcabfdcf073678f674393b5f725",
        },
        {
          url: "/icon-256x256.png",
          revision: "31abda4ef0b7bc1f395b5232bae99466",
        },
        {
          url: "/icon-384x384.png",
          revision: "8e7485563686c6672f518db3ab9e48cc",
        },
        {
          url: "/icon-512x512.png",
          revision: "efee87430cfe37676b147ace7548e6bc",
        },
        { url: "/incorrect.mp3", revision: "7a589808f2922cdebe83c98a8bed718a" },
        {
          url: "/interactivelearning.png",
          revision: "4aca1dd032e2b35b04e1d66d385df256",
        },
        {
          url: "/lighthouse.png",
          revision: "05348844ec802377dba26e4512872961",
        },
        {
          url: "/loadingsnail.png",
          revision: "eb05af7a2710b3b59478c9407644bf95",
        },
        { url: "/manifest.json", revision: "6174792a6446c0b70712dc8b5b90ad6b" },
        { url: "/message.png", revision: "0a2009db9dcd3f757bb2f499ab09c6ba" },
        {
          url: "/note-2-image.png",
          revision: "d7c5bd34b188907c173779c0df336684",
        },
        { url: "/paint.png", revision: "c742a886c076d45f5573cf308b732a9a" },
        { url: "/patrick.png", revision: "8c8cffa3118daf485cea8a3d8f9b9ef4" },
        { url: "/piplanet.png", revision: "ea36a272a291e711ed58c846fb90a448" },
        {
          url: "/pirateship.png",
          revision: "eb70cf02eb9e26b09fd019535d9f4af3",
        },
        { url: "/quiz.png", revision: "a04b46e0cda22b6cccf378e4afebc9a2" },
        { url: "/rick.png", revision: "2cf513308a53d1e83d2ff216904b55b9" },
        { url: "/ricknmort.png", revision: "c5aeb390bdd87f6198faaecf068b79da" },
        {
          url: "/sandycheeks.png",
          revision: "109a93a07b72bd067aba669e4a87ea82",
        },
        {
          url: "/shipservers.png",
          revision: "083610b94a68d57623afba6c6c2936e2",
        },
        { url: "/smartwtf.png", revision: "a54ae24eaf68b483f164b8c0b02ff9d4" },
        { url: "/smartwtf.svg", revision: "ef52e786528caa75b62cc3ac497b16b9" },
        {
          url: "/smartwtfhero.png",
          revision: "8e5b854726507713c59f47d0fd09de84",
        },
        {
          url: "/smartwtfmember.png",
          revision: "e840c56749bf7fdedca22b44a3e53c7f",
        },
        { url: "/streak.png", revision: "1e3ed3645ed0c87ee2360e0aa5aac1f4" },
        {
          url: "/superchargedlibrary.png",
          revision: "c46cbb448f418c1e3bb89c0585e68af5",
        },
        { url: "/wtfcoin.png", revision: "6aacd28f0e222d5e8d90c2de00e20392" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: i,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
