export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface IssueReport {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: Location;
  photos: string[];
  status: IssueStatus;
  priority: IssuePriority;
  reportedAt: Date;
  reportedBy: string;
  validationScore: number;
  duplicateOf?: string;
}

export enum IssueCategory {
  POTHOLE = 'pothole',
  TRAFFIC_LIGHT = 'traffic_light',
  ROAD_DAMAGE = 'road_damage',
  SIGNAGE = 'signage',
  DRAINAGE = 'drainage',
  DEBRIS = 'debris',
  OTHER = 'other'
}

export enum IssueStatus {
  PENDING = 'pending',
  VALIDATED = 'validated',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  DUPLICATE = 'duplicate',
  REJECTED = 'rejected'
}

export enum IssuePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ValidationResult {
  isValid: boolean;
  score: number;
  reasons: string[];
  duplicateId?: string;
}