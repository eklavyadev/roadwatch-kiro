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
          {/* Browser APIs */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              Browser & Platform APIs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechCard
                title="Camera API"
                desc="Allows users to capture pothole images directly from their device for authentic reporting."
              />
              <TechCard
                title="Geolocation API"
                desc="Automatically captures precise latitude and longitude to ensure accurate issue mapping."
              />
            </div>
          </section>

          {/* Public API */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              Open Data & Public API
            </h2>

            <div className="bg-[#0f172a] border border-slate-700 rounded p-6 text-gray-300 text-sm space-y-2">
              <p>• Public REST API for accessing approved pothole data</p>
              <p>• Enables researchers, civic bodies, and developers to reuse data</p>
              <p>• Promotes transparency and third‑party innovation</p>
            </div>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              System Architecture
            </h2>

            <div className="bg-[#0f172a] border border-slate-700 rounded p-6 text-gray-300 text-sm space-y-2">
              <p>• User captures pothole image and location</p>
              <p>• Backend uploads image to secure storage</p>
              <p>• Report stored in PostgreSQL with pending status</p>
              <p>• AI service automatically reviews the image</p>
              <p>• Status updated to approved or rejected</p>
              <p>• Approved reports appear on public map & API</p>
              <p>• Admin panel allows manual overrides if needed</p>
            </div>
          </section>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500">
            Built for civic impact · AI‑powered moderation · Open & scalable
            architecture
          </p>
        </div>
      </div>
    </>
  );
}

/* ---------- Helper Component ---------- */
function TechCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#0f172a] border border-slate-700 rounded p-5">
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}