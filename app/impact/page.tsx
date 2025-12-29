import Navbar from "../../components/navbar";

export default function ImpactPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#020817] text-white px-6 py-20 mt-10">
                <div className="mx-auto max-w-5xl space-y-20">

                    {/* HERO */}
                    <section className="text-center max-w-3xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Creating Real‑World Impact with{' '}
                            Road<span className="text-cyan-400">Watch</span>
                        </h1>
                        <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                            RoadWatch is designed to improve road safety, civic transparency,
                            and data‑driven decision‑making by transforming citizen reports
                            into verified, actionable insights.
                        </p>
                    </section>

                    {/* WHO BENEFITS */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-8">
                            Who Benefits from RoadWatch?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ImpactCard
                                title="Citizens"
                                points={[
                                    'Simple way to report potholes with proof',
                                    'Geo‑tagged reporting ensures accuracy',
                                    'Transparency through public visibility',
                                ]}
                            />

                            <ImpactCard
                                title="Local Authorities"
                                points={[
                                    'Verified reports reduce false complaints',
                                    'Severity‑based prioritization of repairs',
                                    'Reduced manual inspection effort',
                                ]}
                            />

                            <ImpactCard
                                title="Urban Planners & Administrators"
                                points={[
                                    'Historical data for planning road maintenance',
                                    'Identify high‑risk and high‑damage zones',
                                    'Data‑driven budget allocation',
                                ]}
                            />

                            <ImpactCard
                                title="Researchers, Media & NGOs"
                                points={[
                                    'Access to structured open data via public API',
                                    'Independent analysis and visualization',
                                    'Improved civic accountability',
                                ]}
                            />
                        </div>
                    </section>
                    {/* SHORT TERM IMPACT */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">
                            Immediate Impact
                        </h2>

                        <div className="bg-[#0f172a] border border-slate-700 rounded p-6 text-gray-300 space-y-3">
                            <p>• Faster and more accurate pothole reporting</p>
                            <p>• Reduction in duplicate or unclear complaints</p>
                            <p>• Evidence‑based verification using images and location</p>
                            <p>• Increased trust between citizens and authorities</p>
                        </div>
                    </section>

                    {/* LONG TERM IMPACT */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">
                            Long‑Term Impact & Scalability
                        </h2>

                        <div className="bg-[#0f172a] border border-slate-700 rounded p-6 text-gray-300 space-y-3">
                            <p>• City‑wide deployment across multiple regions</p>
                            <p>• Trend analysis of road damage over time</p>
                            <p>• Predictive maintenance using historical data</p>
                            <p>• Integration with smart‑city dashboards</p>
                            <p>• AI‑assisted moderation for faster verification</p>
                        </div>
                    </section>

                    {/* OPEN DATA IMPACT */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">
                            Open Data & Public API Impact
                        </h2>

                        <div className="bg-[#0f172a] border border-slate-700 rounded p-6 text-gray-300 space-y-3">
                            <p>
                                RoadWatch exposes a <span className="text-white font-medium">
                                    public, read‑only API
                                </span> that allows anyone to access verified pothole data.
                            </p>

                            <p>
                                This enables developers, researchers, media organizations, and civic
                                groups to reuse the data for independent analysis, dashboards, and
                                public awareness initiatives.
                            </p>

                            <p>
                                Since only <span className="text-white font-medium">
                                    approved reports
                                </span> are available through the API, the system maintains data
                                reliability while promoting transparency and collaboration.
                            </p>
                        </div>
                    </section>

                    {/* SMART CITY ALIGNMENT */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">
                            Alignment with Smart City Goals
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
                            <SmartCard
                                title="Transparency"
                                desc="Public visibility of verified reports builds trust and accountability."
                            />
                            <SmartCard
                                title="Open Data"
                                desc="Public API enables third‑party innovation and analysis."
                            />
                            <SmartCard
                                title="Automation"
                                desc="AI‑assisted image analysis reduces manual effort."
                            />
                        </div>
                    </section>

                    {/* CLOSING */}
                    <section className="text-center max-w-3xl mx-auto">
                        <p className="text-gray-400 text-lg leading-relaxed">
                            RoadWatch demonstrates how technology, data, and citizen
                            participation can work together to improve urban
                            infrastructure and road safety at scale.
                        </p>
                    </section>

                </div>
            </div>
        </>
    );
}

/* ---------- COMPONENTS ---------- */

function ImpactCard({
    title,
    points,
}: {
    title: string;
    points: string[];
}) {
    return (
        <div className="bg-[#0f172a] border border-slate-700 rounded p-6">
            <h3 className="text-lg font-semibold mb-3 text-white">
                {title}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                {points.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>
        </div>
    );
}

function SmartCard({
    title,
    desc,
}: {
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-[#0f172a] border border-slate-700 rounded p-5">
            <h4 className="text-white font-semibold mb-2">
                {title}
            </h4>
            <p className="text-gray-400">{desc}</p>
        </div>
    );
}