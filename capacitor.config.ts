import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.surya.nutriflow',
  appName: 'nutriflow-ai',
  webDir: 'dist',
  android: {
    allowMixedContent: true
  },
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'studio-1433613245-d81db-default-rtdb.firebaseio.com',
      '*.firebaseio.com',
      '*.googleapis.com',
      '*.firebaseapp.com'
    ]
  }
};

export default config;
