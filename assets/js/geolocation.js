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

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude, accuracy } = position.coords;

                    console.log("Latitude:", latitude);
                    console.log("Longitude:", longitude);
                    console.log("Accuracy:", accuracy, "meters");

                    if (accuracy > 100) {
                        alert("Location accuracy is low. Please verify your PIN code.");
                    }

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
                },
                (error) => {
                    console.error(error);
                    reject(new Error('Unable to retrieve your location. Please ensure location services are enabled and you grant permission.'));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        });
    }
};
