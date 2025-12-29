'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'How it works', href: '/#how' },
  { name: 'Map', href: '/map' },
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
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-2 text-gray-300 hover:text-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold hover:text-cyan-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/report"
              className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-[#020817] hover:bg-cyan-400 transition-colors"
            >
              Report pothole
            </a>
          </div>
        </nav>
        {/* MOBILE MENU */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-[#020817] p-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                Road<span className="text-cyan-400">Watch</span>
              </span>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-gray-300 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-white/5"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}