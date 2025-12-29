'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'How it works', href: '/#how' },
  { name: 'Map', href: '/#map' },
  { name: 'API Docs', href: '/api' },
  { name: 'Tech Stack', href: '/tech' },
  { name: 'Impact', href: '/impact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
      {/* NAVBAR */}
      <header className="absolute inset-x-0 top-0 z-50 ">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              Road<span className="text-cyan-400">Watch</span>
            </a>
          </div>