import { IssueReport, Location, ValidationResult } from './types';

// High-precision GPS validation
export class LocationValidator {
  private static readonly MIN_ACCURACY = 10; // meters
  private static readonly MAX_AGE = 30000; // 30 seconds

  static validateLocation(location: Location): ValidationResult {
    const reasons: string[] = [];
    let score = 100;

    // Check GPS accuracy
    if (location.accuracy > this.MIN_ACCURACY) {
      reasons.push(`Low GPS accuracy: ${location.accuracy}m`);
      score -= 30;
    }

    // Check timestamp freshness
    const age = Date.now() - location.timestamp;
    if (age > this.MAX_AGE) {
      reasons.push(`Stale location data: ${age}ms old`);
      score -= 20;
    }

    // Validate coordinates
    if (!this.isValidCoordinate(location.latitude, location.longitude)) {
      reasons.push('Invalid coordinates');
      score -= 50;
    }

    return {
      isValid: score >= 70,
      score,
      reasons
    };
  }

  private static isValidCoordinate(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }
}

// Smart duplicate detection
export class DuplicateDetector {
  private static readonly PROXIMITY_THRESHOLD = 50; // meters
  private static readonly TIME_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

  static async checkForDuplicates(
    newReport: Partial<IssueReport>,
    existingReports: IssueReport[]
  ): Promise<ValidationResult> {
    const reasons: string[] = [];
    let score = 100;
    let duplicateId: string | undefined;

    for (const existing of existingReports) {
      // Skip resolved or rejected reports
      if (existing.status === 'resolved' || existing.status === 'rejected') {
        continue;
      }

      const distance = this.calculateDistance(
        newReport.location!,
        existing.location
      );

      const timeDiff = Math.abs(
        new Date().getTime() - existing.reportedAt.getTime()
      );

      // Check proximity and category match
      if (
        distance <= this.PROXIMITY_THRESHOLD &&
        newReport.category === existing.category &&
        timeDiff <= this.TIME_WINDOW
      ) {
        reasons.push(`Similar issue found ${distance.toFixed(1)}m away`);
        score = 0;
        duplicateId = existing.id;
        break;
      }
    }

    return {
      isValid: score > 0,
      score,
      reasons,
      duplicateId
    };
  }

  private static calculateDistance(loc1: Location, loc2: Location): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

// Photo metadata validation
export class PhotoValidator {
  static validatePhoto(file: File): ValidationResult {
    const reasons: string[] = [];
    let score = 100;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reasons.push('File too large (max 5MB)');
      score -= 30;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      reasons.push('Invalid file type');
      score -= 50;
    }

    // Check for common image formats
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      reasons.push('Unsupported image format');
      score -= 20;
    }

    return {
      isValid: score >= 70,
      score,
      reasons
    };
  }
}

// Overall report validation
export class ReportValidator {
  static async validateReport(
    report: Partial<IssueReport>,
    existingReports: IssueReport[]
  ): Promise<ValidationResult> {
    const validations: ValidationResult[] = [];

    // Validate location
    if (report.location) {
      validations.push(LocationValidator.validateLocation(report.location));
    }

    // Check for duplicates
    validations.push(
      await DuplicateDetector.checkForDuplicates(report, existingReports)
    );

    // Calculate overall score
    const totalScore = validations.reduce((sum, v) => sum + v.score, 0);
    const avgScore = totalScore / validations.length;
    const allReasons = validations.flatMap(v => v.reasons);

    return {
      isValid: avgScore >= 70 && validations.every(v => v.isValid),
      score: avgScore,
      reasons: allReasons,
      duplicateId: validations.find(v => v.duplicateId)?.duplicateId
    };
  }
}