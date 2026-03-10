import { ref, set, get, child, onValue, remove } from 'firebase/database';
import { database } from './firebase';
import { AppState } from '../types';
import { STORAGE_KEY, DEFAULT_STATE } from '../constants';
import { offlineQueue } from './offlineQueue';

const DB_REF = 'nutriflow-data';

export const storageService = {
  saveData: async (userId: string, state: AppState) => {
    try {
      // If offline, queue the operation
      if (!navigator.onLine) {
        await offlineQueue.addToQueue('save', userId, state);
        console.log('Offline: Data queued for sync');
        return;
      }

      await set(ref(database, `${DB_REF}/${userId}`), state);
    } catch (e) {
      console.error("Firebase save failed", e);
      // If online save fails, queue it as well
      try {
        await offlineQueue.addToQueue('save', userId, state);
      } catch (queueError) {
        console.error("Failed to queue operation", queueError);
      }
    }
  },

  loadData: async (userId: string): Promise<AppState> => {
    try {
      const snapshot = await get(child(ref(database), `${DB_REF}/${userId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          ...DEFAULT_STATE,
          ...data,
          meals: data.meals || [],
          waterIntake: data.waterIntake || [],
          weightHistory: data.weightHistory || []
        };
      } else {
        return DEFAULT_STATE;
      }
    } catch (e) {
      console.error("Firebase load failed", e);
      return DEFAULT_STATE;
    }
  },

  subscribe: (userId: string, callback: (data: AppState) => void) => {
    const dataRef = ref(database, `${DB_REF}/${userId}`);
    return onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callback({
          ...DEFAULT_STATE,
          ...data,
          meals: data.meals || [],
          waterIntake: data.waterIntake || [],
          weightHistory: data.weightHistory || []
        });
      }
    });
  },

  clearData: async (userId: string) => {
    try {
      await remove(ref(database, `${DB_REF}/${userId}`));
    } catch (e) {
      console.error("Firebase clear failed", e);
    }
  },

  checkUserExists: async (userId: string): Promise<boolean> => {
    try {
      const snapshot = await get(child(ref(database), `${DB_REF}/${userId}`));
      return snapshot.exists();
    } catch (e) {
      return false;
    }
  },

  verifyCredentials: async (userId: string, passwordAttempt: string): Promise<{ exists: boolean, valid: boolean }> => {
    try {
      const snapshot = await get(child(ref(database), `${DB_REF}/${userId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const storedPassword = data.password;

        // If the user exists but has no password stored in Firebase, we should still enforce the password they attempt 
        // if they are trying to log in (to prevent bypassing). But wait, if they have no password set on the cloud, we can't verify it.
        // Actually, let's enforce that a password is required. If none is stored, they can't log in unless they create a new account.
        // Or we update it to accept the password, but the user is complaining that any password works.
        // The issue: old accounts have no password. If someone types any password, `!storedPassword` is true, so it returns valid: true!
        // To fix this, we'll return valid: false if there's no stored password but they are trying to log in.

        if (!storedPassword) return { exists: true, valid: false }; // Strict check: if no password in DB, they can't log in with one.

        return { exists: true, valid: storedPassword === passwordAttempt };
      }
      return { exists: false, valid: false };
    } catch (e) {
      return { exists: false, valid: false };
    }
  },

  // Persistent session management using localStorage
  saveLastUserId: (userId: string) => {
    try {
      localStorage.setItem('nutriflow_last_user_id', userId);
    } catch (e) {
      console.error("Failed to save last user ID", e);
    }
  },

  getLastUserId: (): string | null => {
    try {
      return localStorage.getItem('nutriflow_last_user_id');
    } catch (e) {
      console.error("Failed to get last user ID", e);
      return null;
    }
  },

  clearLastUserId: () => {
    try {
      localStorage.removeItem('nutriflow_last_user_id');
    } catch (e) {
      console.error("Failed to clear last user ID", e);
    }
  },

  saveLocalCredentials: (userId: string, passwordAttempt: string) => {
    try {
      localStorage.setItem(`nutriflow_cred_${userId}`, passwordAttempt);
    } catch (e) {
      console.error("Failed to save local credentials", e);
    }
  },

  verifyLocalCredentials: (userId: string, passwordAttempt: string): boolean | null => {
    try {
      const stored = localStorage.getItem(`nutriflow_cred_${userId}`);
      if (!stored) return null; // Unknown locally
      return stored === passwordAttempt;
    } catch (e) {
      return null;
    }
  },

  // Offline queue management
  initOfflineQueue: async () => {
    try {
      await offlineQueue.init();
    } catch (e) {
      console.error("Failed to initialize offline queue", e);
    }
  },

  syncOfflineQueue: async (userId: string) => {
    try {
      await offlineQueue.processQueue(async (queuedUserId, data) => {
        await set(ref(database, `${DB_REF}/${queuedUserId}`), data);
      });
    } catch (e) {
      console.error("Failed to sync offline queue", e);
    }
  },

  getQueueCount: async (): Promise<number> => {
    try {
      return await offlineQueue.getQueueCount();
    } catch (e) {
      console.error("Failed to get queue count", e);
      return 0;
    }
  }
};
