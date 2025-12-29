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
    </form>
  );
}