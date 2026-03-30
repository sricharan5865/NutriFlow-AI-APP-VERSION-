package com.surya.nutriflow;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends BridgeActivity {

    private AdView adView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Ensure the layout matches what is expected for the AdView
        setContentView(R.layout.activity_main);

        // Initialize the Google Mobile Ads SDK
        MobileAds.initialize(this, initializationStatus -> {
        });

        // Load the ad
        adView = findViewById(R.id.adView);
        if (adView != null) {
            AdRequest adRequest = new AdRequest.Builder().build();
            adView.loadAd(adRequest);
        }
    }

    @Override
    public void onPause() {
        if (adView != null) {
            adView.pause();
        }
        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (adView != null) {
            adView.resume();
        }
    }

    @Override
    public void onDestroy() {
        if (adView != null) {
            adView.destroy();
        }
        super.onDestroy();
    }
}
