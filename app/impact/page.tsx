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