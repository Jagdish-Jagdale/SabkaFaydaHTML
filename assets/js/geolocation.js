// assets/js/geolocation.js

const GeolocationService = {
    /**
     * Fetches current location and returns a Promise with address data from Nominatim.
     */
    getCurrentLocationData: function() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported by your browser."));
                return;
            }

            let bestPosition = null;

            // Safety timeout: If after 15 seconds we still haven't found a highly accurate location,
            // we'll just use the best one we found, or reject if we found none.
            const fallbackTimeoutId = setTimeout(() => {
                if (watchId) navigator.geolocation.clearWatch(watchId);
                
                if (bestPosition) {
                    console.log("Fallback to best location found with accuracy:", bestPosition.coords.accuracy);
                    fetchAddress(bestPosition.coords.latitude, bestPosition.coords.longitude);
                } else {
                    reject(new Error("Could not retrieve a valid location within the time limit."));
                }
            }, 15000);

            const fetchAddress = async (latitude, longitude) => {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    
                    if (data && data.address) {
                        resolve(data.address);
                    } else {
                        reject(new Error('Could not determine address from your location.'));
                    }
                } catch (err) {
                    reject(new Error('Error fetching address data.'));
                }
            };

            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    // Track the best position in case we need to fallback
                    if (!bestPosition || accuracy < bestPosition.coords.accuracy) {
                        bestPosition = position;
                    }

                    console.log("Accuracy:", accuracy, "meters");

                    if (accuracy <= 50) {
                        navigator.geolocation.clearWatch(watchId);
                        clearTimeout(fallbackTimeoutId);

                        console.log("Good location found:", latitude, longitude);

                        // Now call reverse-geocoding API
                        fetchAddress(latitude, longitude);
                    }
                },
                (error) => {
                    console.error("Location error:", error);
                    if (error.code === error.PERMISSION_DENIED) {
                        navigator.geolocation.clearWatch(watchId);
                        clearTimeout(fallbackTimeoutId);
                        reject(new Error('Unable to retrieve your location. Please ensure location services are enabled and you grant permission.'));
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 0
                }
            );
        });
    }
};
