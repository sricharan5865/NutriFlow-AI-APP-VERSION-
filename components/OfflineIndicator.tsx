import React, { useEffect, useState } from 'react';
import { storageService } from '../services/storage';
import { offlineQueue } from '../services/offlineQueue';

export const OfflineIndicator: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [queueCount, setQueueCount] = useState(0);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        const updateOnlineStatus = () => {
            const online = navigator.onLine;
            setIsOnline(online);
            offlineQueue.setOnlineStatus(online);

            // Sync when coming back online
            if (online && queueCount > 0) {
                handleSync();
            }
        };

        const updateQueueCount = async () => {
            const count = await storageService.getQueueCount();
            setQueueCount(count);
        };

        const handleSync = async () => {
            setSyncing(true);
            try {
                const userId = storageService.getLastUserId();
                if (userId) {
                    await storageService.syncOfflineQueue(userId);
                    await updateQueueCount();
                }
            } catch (error) {
                console.error('Sync failed:', error);
            } finally {
                setSyncing(false);
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Update queue count periodically
        updateQueueCount();
        const interval = setInterval(updateQueueCount, 5000);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            clearInterval(interval);
        };
    }, [queueCount]);

    if (isOnline && queueCount === 0) {
        return null; // Don't show anything when online and no pending items
    }

    return (
        <div
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${isOnline
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white'
                }`}
            style={{ backdropFilter: 'blur(10px)' }}
        >
            {syncing ? (
                <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="text-sm font-medium">Syncing...</span>
                </>
            ) : !isOnline ? (
                <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                        />
                    </svg>
                    <span className="text-sm font-medium">
                        Offline {queueCount > 0 && `• ${queueCount} pending`}
                    </span>
                </>
            ) : (
                <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-sm font-medium">
                        {queueCount} item{queueCount !== 1 ? 's' : ''} syncing...
                    </span>
                </>
            )}
        </div>
    );
};
