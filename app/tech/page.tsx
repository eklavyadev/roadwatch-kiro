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