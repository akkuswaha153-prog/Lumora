import { openDB } from 'idb';

const DB_NAME = 'ai_life_companion_db';
const STORE_NAME = 'reflections';
const SETTINGS_STORE = 'settings';
const DB_VERSION = 1;

/**
 * LOCAL-FIRST STORAGE SERVICE
 * Uses IndexedDB for persistent, offline-ready data management.
 */
const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Store for AI conversations and user notes
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('date', 'timestamp');
    }
    // Store for user preferences and monetization flags
    if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
      db.createObjectStore(SETTINGS_STORE);
    }
  },
});

export const storageService = {
  // --- Reflection CRUD ---
  
  async saveReflection(content, type = 'user') {
    const db = await dbPromise;
    return db.put(STORE_NAME, {
      content,
      type, // 'user' or 'ai'
      timestamp: new Date().toISOString(),
    });
  },

  async getAllReflections() {
    const db = await dbPromise;
    return db.getAllFromIndex(STORE_NAME, 'date');
  },

  // --- Policy & Compliance ---

  /**
   * THE "NUCLEAR OPTION"
   * Mandatory for Privacy Policy compliance. 
   * Deletes all user data from the device.
   */
  async deleteAllUserData() {
    const db = await dbPromise;
    const tx = db.transaction([STORE_NAME, SETTINGS_STORE], 'readwrite');
    await Promise.all([
      tx.objectStore(STORE_NAME).clear(),
      tx.objectStore(SETTINGS_STORE).clear(),
      indexedDB.deleteDatabase(DB_NAME)
    ]);
    window.location.reload(); // Force refresh to clear memory state
  },

  // --- Settings & Monetization ---

  async setSetting(key, value) {
    const db = await dbPromise;
    return db.put(SETTINGS_STORE, value, key);
  },

  async getSetting(key) {
    const db = await dbPromise;
    return db.get(SETTINGS_STORE, key);
  },

  /**
   * Tracks daily usage locally to enforce "Free Tier" limits
   * without a backend.
   */
  async incrementDailyUsage() {
    const today = new Date().toISOString().split('T')[0];
    const count = (await this.getSetting(`usage_${today}`)) || 0;
    await this.setSetting(`usage_${today}`, count + 1);
    return count + 1;
  }
};
