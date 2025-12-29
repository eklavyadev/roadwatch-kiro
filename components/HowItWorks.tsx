'use client';

import {
  CameraIcon,
  MapPinIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Capture the Pothole',
    description:
      'Citizens capture a photo of the pothole using their device camera and add a brief location description.',
    icon: CameraIcon,
  },
  {
    title: 'Auto Location Tagging',
    description:
      'The system automatically records precise GPS coordinates to ensure accurate positioning on the map.',
    icon: MapPinIcon,
  },
  {
    title: 'AI‑Powered Verification',
    description:
      'An AI moderation service automatically analyzes the image to verify whether it is road‑related and filters spam or invalid reports.',
    icon: CpuChipIcon,
  },
  {
    title: 'Admin Oversight (Optional)',
    description:
      'Administrators can review and override AI decisions in edge cases to maintain accuracy and trust.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Visible on Public Map',
    description:
      'Only verified potholes appear on the public map, helping authorities prioritize repairs effectively.',
    icon: GlobeAltIcon,
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-[#020817] px-6 py-20">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            How Road<span className="text-cyan-400">Watch</span> Works
          </h2>
          <p className="mt-4 text-gray-400">
            A fast, AI‑driven workflow that converts citizen reports into
            reliable, actionable road maintenance data.
          </p>
        </div>