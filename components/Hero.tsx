'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero() {
    return (
        <div>
            {/* HERO */}
            <main className="relative flex min-h-screen items-center px-6 pt-32 lg:px-8 lg:pt-0">
                <div className="mx-auto max-w-3xl text-center lg:-mt-16">
                    <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight ">
                        Making roads{' '}
                        <span className="text-cyan-400 animate-pulse">safer</span>{' '}
                        with data
                    </h1>

                    <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                        RoadWatch is a geo-tagged platform that lets citizens report
                        potholes with photos and location, helping authorities
                        prioritize road repairs.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/report"
                            className="rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-[#020817] hover:bg-cyan-400 transition-colors"
                        >
                            Report a pothole
                        </a>

                        <a
  href="#how"
  className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
>
  How it works
  <span className="animate-bounce">↓</span>
</a>

                    </div>
                </div>
                {/* Scroll Indicator */}
                <a
                    href="#how"
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-cyan-400 transition-colors"
                >
                    <span className="text-xs mb-1">Scroll</span>
                    <ChevronDownIcon className="h-6 w-6 animate-bounce" />
                </a>

            </main>
        </div>
    );
}