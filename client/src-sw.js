const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute();


// registerRoute(
//   ({ request }) => request.destination === "logo",
//   new CacheFirst({
//     cacheName: "my-image-cache",
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );

// Import the 'idb' package to use with IndexedDB.
// import { openDB } from 'idb';

// Create a function that can be used to start up the database.
// const initdb = async () =>
// Create a database named demo-db and we will use version 1.
  // openDB('demo-db', 1, {
    // Sets the database schema if it isn't already defined.
    // upgrade(db) {
      // if (db.objectStoreNames.contains('demo-db')) {
        // console.log('demo-db database already exists');
        // return;
      // }

      // Create an object store for our data inside of the 'demo-db'.
      // We create a key named 'id' which will automatically be incremented for us.
      // db.createObjectStore('demo-db', { keyPath: 'id', autoIncrement: true });
      // console.log('demo-db database created');
    // },
  // });

  // Call our database function.
// initdb();