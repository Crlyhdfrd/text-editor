import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT into the database")
  const db = putdb('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  await Promise.all([
    tx.store.put('content', content),
    tx.done,
  ])
  const result = await tx.store.get('content');
  console.log(result);
  return result;
    };
  
console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const geAllDb = async () => {
  console.log("GET all from the database")
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = tx.store.getAll();
  const result = await request.result;
  console.log(result);
  return result;
}
console.error('getDb not implemented');

initdb();
