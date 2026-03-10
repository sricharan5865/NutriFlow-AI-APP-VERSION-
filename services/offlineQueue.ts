import { AppState } from '../types';

interface QueuedOperation {
    id: string;
    type: 'save' | 'update' | 'delete';
    userId: string;
    data: AppState;
    timestamp: number;
    retries: number;
}

const DB_NAME = 'nutriflow-offline';
const STORE_NAME = 'operations-queue';
const DB_VERSION = 1;

class OfflineQueueService {
    private db: IDBDatabase | null = null;
    private isOnline = navigator.onLine;
    private syncInProgress = false;

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
        });
    }

    async addToQueue(
        type: 'save' | 'update' | 'delete',
        userId: string,
        data: AppState
    ): Promise<void> {
        if (!this.db) await this.init();

        const operation: QueuedOperation = {
            id: `${Date.now()}-${Math.random()}`,
            type,
            userId,
            data,
            timestamp: Date.now(),
            retries: 0
        };

        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('Database not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(operation);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getQueuedOperations(): Promise<QueuedOperation[]> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('Database not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    async removeFromQueue(operationId: string): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('Database not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(operationId);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getQueueCount(): Promise<number> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('Database not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.count();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async processQueue(saveCallback: (userId: string, data: AppState) => Promise<void>): Promise<void> {
        if (this.syncInProgress || !this.isOnline) return;

        this.syncInProgress = true;

        try {
            const operations = await this.getQueuedOperations();

            for (const operation of operations) {
                try {
                    // Execute the save operation
                    await saveCallback(operation.userId, operation.data);
                    // Remove from queue on success
                    await this.removeFromQueue(operation.id);
                    console.log(`Synced operation ${operation.id}`);
                } catch (error) {
                    console.error(`Failed to sync operation ${operation.id}:`, error);
                    // Could implement retry logic here
                    // For now, we'll leave failed operations in the queue
                }
            }
        } finally {
            this.syncInProgress = false;
        }
    }

    setOnlineStatus(online: boolean): void {
        this.isOnline = online;
    }

    getOnlineStatus(): boolean {
        return this.isOnline;
    }

    isSyncing(): boolean {
        return this.syncInProgress;
    }
}

export const offlineQueue = new OfflineQueueService();
