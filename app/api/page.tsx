import Navbar from "../../components/navbar";

export default function ApiDocsPage() {
    return (
        <div>
            <Navbar />
        <div className="min-h-screen bg-[#020817] text-white px-6 py-20 mt-10">
            <div className="mx-auto max-w-4xl space-y-12">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">
                        Road<span className="text-cyan-400">Watch</span> Public API
                    </h1>
                    <p className="mt-3 text-gray-400">
                        A read-only API providing access to verified pothole reports for
                        public use, research, and visualization.
                    </p>
                </div>

                {/* Overview */}
                <section className="bg-[#0f172a] border border-slate-700 rounded p-6">
                    <h2 className="text-xl font-semibold mb-3">Overview</h2>
                    <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                        <li>Publicly accessible</li>
                        <li>Read-only (GET requests only)</li>
                        <li>No authentication required</li>
                        <li>Only verified data should be displayed</li>
                    </ul>
                </section>

                {/* Endpoint */}
                <section className="bg-[#0f172a] border border-slate-700 rounded p-6">
                    <h2 className="text-xl font-semibold mb-4">Endpoint</h2>

                    <div className="bg-black rounded p-4 text-sm font-mono text-cyan-400">
                        GET /api/admin/reports
                    </div>

                    <p className="mt-3 text-gray-400 text-sm">
                        Returns a list of all pothole reports. Clients are expected to
                        filter reports with <code className="text-white">status = "approved"</code>.
                    </p>
                </section>

                {/* Example Request */}
                <section className="bg-[#0f172a] border border-slate-700 rounded p-6">
                    <h2 className="text-xl font-semibold mb-4">Example Request</h2>

                    <pre className="bg-black rounded p-4 text-sm overflow-x-auto text-gray-200">
                        {`fetch('/api/admin/reports')
                            .then(res => res.json())
                            .then(data => {
                                const approved = data.filter(r => r.status === "approved");
                                console.log(approved);
                            });`}
                    </pre>
                </section>
                {/* Example Response */}
                <section className="bg-[#0f172a] border border-slate-700 rounded p-6">
                    <h2 className="text-xl font-semibold mb-4">Example Response</h2>

                    <pre className="bg-black rounded p-4 text-sm overflow-x-auto text-gray-200">
                        {`[
  {
    "id": 12,
    "image_url": "https://.../reports/pothole.jpg",
    "location": "Near Borjhar Airport Gate",
    "lat": 26.1062,
    "lng": 91.5859,
    "severity": 4,
    "governing_body": "Municipal Corporation",
    "status": "approved",
    "created_at": "2025-12-20T15:42:11.123Z"
  }
]`}
                    </pre>
                </section>

                {/* Fields */}
                <section className="bg-[#0f172a] border border-slate-700 rounded p-6">
                    <h2 className="text-xl font-semibold mb-4">Response Fields</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
                        <p><span className="text-white font-medium">id</span> – Unique report ID</p>
                        <p><span className="text-white font-medium">image_url</span> – Public image URL</p>
                        <p><span className="text-white font-medium">location</span> – Location description</p>
                        <p><span className="text-white font-medium">lat, lng</span> – GPS coordinates</p>
                        <p><span className="text-white font-medium">severity</span> – Scale from 1–5</p>
                        <p><span className="text-white font-medium">governing_body</span> – Responsible authority</p>
                        <p><span className="text-white font-medium">status</span> – approved / pending / rejected</p>
                        <p><span className="text-white font-medium">created_at</span> – Timestamp</p>
                    </div>
                </section>

                {/* Usage */}
                <section className="bg-[#0f172a] border border-slate-700 rounded p-6">
                    <h2 className="text-xl font-semibold mb-3">Recommended Usage</h2>
                    <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                        <li>Filter approved reports only</li>
                        <li>Display on maps or dashboards</li>
                        <li>Use severity to prioritize issues</li>
                        <li>Respect public data usage</li>
                    </ul>
                </section>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500">
                    RoadWatch Public API · Read‑only · Open Data Initiative
                </p>
            </div>
        </div>
        </div>
    );
}