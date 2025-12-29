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
        </select>
      </div>
    </form>
  );
}