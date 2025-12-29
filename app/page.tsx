import React from "react";
import Navbar from "../components/navbar";
import { ApprovedPotholes } from "@/components/ApprovedPotholes";
import ApprovedPotholesMap from "@/components/ApprovedPotholesMap";
import HowItWorks from "@/components/HowItWorks";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div>
      <div  className="relative min-h-screen bg-[#020817] text-white">
      <Navbar />
      <Hero/>
      </div>
      <HowItWorks />
      <section id="approved" className="bg-[#020817] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-white mb-2">
            Verified Potholes
          </h2>
          <p className="text-gray-400 mb-10">
            Recently approved road issues reported by citizens
          </p>

          <ApprovedPotholes />
        </div>
      </section>

      <section id="map" className="bg-[#020817] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-white mb-2">
            Potholes on Map
          </h2>
          <p className="text-gray-400 mb-8">
            Visual overview of all verified potholes
          </p>

          <ApprovedPotholesMap />
        </div>
      </section>

    </div>
  );

}