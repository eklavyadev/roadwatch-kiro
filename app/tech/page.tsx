import Navbar from "../../components/navbar";

export default function TechStackPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020817] text-white px-6 py-20 mt-10">
        <div className="mx-auto max-w-5xl space-y-14">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Technology Behind{" "}
              <span className="text-cyan-400">RoadWatch</span>
            </h1>
            <p className="mt-4 text-gray-400">
              A modern, scalable, AI‑powered civic tech stack built for real‑time
              road issue reporting and transparency.
            </p>
          </div>

          {/* Core Stack */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Core Technologies</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechCard
                title="Next.js (App Router)"
                desc="Full‑stack React framework used for UI, API routes, and server‑side logic in a single scalable codebase."
              />
              <TechCard
                title="Tailwind CSS"
                desc="Utility‑first CSS framework enabling fast, responsive, and consistent UI development."
              />
              <TechCard
                title="Supabase"
                desc="Used for PostgreSQL database, authentication logic, and secure image storage for reports."
              />
              <TechCard
                title="PostgreSQL"
                desc="Stores pothole reports, severity levels, geo‑coordinates, timestamps, and approval status."
              />
            </div>
          </section>
          {/* AI & Automation */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              AI & Automation Layer
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechCard
                title="Hugging Face Vision AI"
                desc="Image classification model used to automatically detect road‑related images and filter spam or invalid submissions."
              />
              <TechCard
                title="AI Moderation Service (Render)"
                desc="A Node.js microservice deployed on Render that asynchronously reviews uploaded images and auto‑approves or rejects reports."
              />
            </div>

            <p className="mt-4 text-sm text-gray-400">
              AI decisions are applied automatically, while an admin panel
              allows human override in edge cases.
            </p>
          </section>

          {/* Google Tech */}
          <section className="bg-[#0f172a] border border-cyan-500/40 rounded p-6">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Google Technology Used
            </h2>

            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <span className="text-white font-medium">
                  Google Maps JavaScript API
                </span>{" "}
                – Interactive visualization of verified pothole locations
              </li>
              <li>
                <span className="text-white font-medium">
                  Google Maps Markers & Bounds
                </span>{" "}
                – Clustered map view for city‑level road issue analysis
              </li>
            </ul>

            <p className="mt-4 text-sm text-gray-400">
              Google Maps is used as a core visualization layer, fulfilling the
              GDG requirement of meaningful Google technology usage.
            </p>
          </section>