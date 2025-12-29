'use client';

import { useState } from 'react';
import { IssueCategory } from '@/lib/types';

interface ReportFormProps {
  onSubmit: (data: any) => void;
}

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const [category, setCategory] = useState<IssueCategory | ''>('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <form className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Issue Category
        </label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value as IssueCategory)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select category...</option>
          <option value={IssueCategory.POTHOLE}>Pothole</option>
          <option value={IssueCategory.TRAFFIC_LIGHT}>Traffic Light</option>
          <option value={IssueCategory.ROAD_DAMAGE}>Road Damage</option>
          <option value={IssueCategory.SIGNAGE}>Signage</option>
          <option value={IssueCategory.DRAINAGE}>Drainage</option>
          <option value={IssueCategory.DEBRIS}>Debris</option>
          <option value={IssueCategory.OTHER}>Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Description (minimum 10 characters)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-24"
          placeholder="Describe the road issue in detail..."
          minLength={10}
        />
        <div className="text-sm text-gray-500 mt-1">
          {description.length}/10 characters minimum
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Photos (required)
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setPhotos(Array.from(e.target.files));
            }
          }}
          className="w-full p-2 border rounded"
        />
        <div className="text-sm text-gray-500 mt-1">
          Accepted formats: JPEG, PNG, WebP (max 5MB each)
        </div>
        {photos.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium">{photos.length} photo(s) selected</p>
          </div>
        )}
      </div>
    </form>
  );
}