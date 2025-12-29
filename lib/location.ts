import { Location } from './types';

export class LocationService {
  private static readonly HIGH_ACCURACY_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 5000
  };

  static async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          reject(new Error(`Location error: ${error.message}`));
        },
        this.HIGH_ACCURACY_OPTIONS
      );
    });
  }

  static async getEnhancedLocation(): Promise<Location> {
    // Try multiple location attempts for better accuracy
    const attempts = 3;
    const locations: Location[] = [];

    for (let i = 0; i < attempts; i++) {
      try {
        const location = await this.getCurrentLocation();
        locations.push(location);
        
        // If we get high accuracy, use it immediately
        if (location.accuracy <= 5) {
          return location;
        }
      } catch (error) {
        if (i === attempts - 1) throw error;
      }
    }

    // Return the most accurate location
    return locations.reduce((best, current) => 
      current.accuracy < best.accuracy ? current : best
    );
  }

  static formatCoordinates(location: Location): string {
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  }

  static getAccuracyLevel(accuracy: number): string {
    if (accuracy <= 5) return 'Excellent';
    if (accuracy <= 10) return 'Good';
    if (accuracy <= 20) return 'Fair';
    return 'Poor';
  }
}