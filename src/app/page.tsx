import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 max-w-[1200px] mx-auto px-5 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 text-on-surface select-none group">
              <span className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">fingerprint</span>
              </span>
              <span className="font-heading text-2xl tracking-tight font-medium">YOUR BRAND</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="transition-colors text-primary font-sans font-semibold">
                Home
              </Link>
              <Link href="#insights" className="font-sans font-semibold text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Insights
              </Link>
              <Link href="#faq" className="font-sans font-semibold text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-container hover:bg-primary text-on-primary font-sans font-semibold text-sm rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              Discover My Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-background min-h-screen">
        <section className="flex flex-col w-full">
          {/* Hero Section */}
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 pt-24 pb-32 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container mb-6 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[14px]">psychology_alt</span>
              <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest">
                Personality • Preferences • Insights
              </span>
            </div>
            <h1 className="font-heading text-5xl md:text-[56px] max-w-[880px] text-on-surface font-semibold tracking-tight leading-tight mb-6">
              Understand Yourself <span className="text-primary-container">Like Never Before.</span>
            </h1>
            <p className="font-sans text-lg text-on-surface-variant max-w-[660px] mb-12">
              Discover the traits, preferences, and behavioural patterns that make you uniquely you — through an architectural, evidence-guided self-discovery experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-lg rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 group"
              >
                <span>Discover My Profile</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
              <a
                href="#faq"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-on-surface font-sans font-semibold text-lg rounded-xl shadow-sm hover:bg-surface-container transition-colors border border-[#eae8e3]"
              >
                Read the FAQ
              </a>
            </div>

            {/* Trust Strip */}
            <div className="w-full max-w-[720px] bg-surface-container-low rounded-xl px-6 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-sans font-semibold text-sm">
                <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                <span>Personalized Experience</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant font-sans font-semibold text-sm">
                <span className="material-symbols-outlined text-primary text-[16px]">lock</span>
                <span>Private & Confidential</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant font-sans font-semibold text-sm">
                <span className="material-symbols-outlined text-primary text-[16px]">tune</span>
                <span>Adaptive Psychometrics</span>
              </div>
            </div>
          </div>

          {/* Editorial Preview Grid */}
          <div className="w-full bg-surface-container-low py-24" id="insights">
            <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="flex flex-col items-center text-center max-w-[720px] mx-auto mb-20">
                <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Your Profile Architecture</span>
                <h2 className="font-heading text-3xl md:text-4xl text-on-surface mb-3">Everything You’ll Discover</h2>
                <p className="font-sans text-base text-on-surface-variant">
                  A calibrated telemetry of patterns, baseline instincts, and operational rhythms that govern how you experience personal and collaborative reality.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Core Personality",
                    desc: "Understand the structural instincts that influence how you synthesize stimuli, prioritize thoughts, and naturally connect with others.",
                    dim: "Dimension 01 • Foundations",
                    icon: "psychology"
                  },
                  {
                    title: "Your Strengths",
                    desc: "Discover qualities you consistently rely on when unraveling multifaceted problems, structuring strategies, and executing high-stakes decisions.",
                    dim: "Dimension 02 • Capabilities",
                    icon: "workspace_premium"
                  },
                  {
                    title: "Your Preferences",
                    desc: "Explore the ambient conditions, pacing, and operational habitats that naturally heighten your creative focus and cognitive longevity.",
                    dim: "Dimension 03 • Environmental",
                    icon: "tune"
                  },
                  {
                    title: "Decision Style",
                    desc: "Unpack how you assess probability, weigh emotional sentiment against empirical signals, and navigate complex dilemmas under ambiguity.",
                    dim: "Dimension 04 • Calibration",
                    icon: "account_tree"
                  },
                  {
                    title: "Social Dynamics",
                    desc: "Analyze your social battery, communicative tone, and how you regulate boundary friction in reciprocal, team, or intimate configurations.",
                    dim: "Dimension 05 • Relational",
                    icon: "group"
                  },
                  {
                    title: "Growth Trajectories",
                    desc: "Identify recurring micro-friction loops, cognitive blind spots, and gentle structural habits to foster emotional equilibrium and mastery.",
                    dim: "Dimension 06 • Evolution",
                    icon: "trending_up"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                        <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                      </div>
                      <h3 className="font-sans font-semibold text-lg text-on-surface mb-2">{item.title}</h3>
                      <p className="font-sans text-sm text-on-surface-variant">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-6 pt-3 flex items-center text-[11px] font-bold text-primary uppercase tracking-wider">
                      <span>{item.dim}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-24" id="faq">
            <div className="max-w-[680px] mx-auto text-center mb-16">
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-2 block">Common Questions</span>
              <h2 className="font-heading text-3xl md:text-4xl text-on-surface mb-3">Frequently Asked Questions</h2>
              <p className="font-sans text-base text-on-surface-variant">
                Clarity on how the assessment works, data privacy, and the framework behind the system.
              </p>
            </div>
            <div className="max-w-[840px] mx-auto flex flex-col gap-4">
              {[
                {
                  q: "Is this based on astrology or mysticism?",
                  a: "No. This tool is built entirely on deterministic psychometric frameworks, focusing on cognitive patterns, decision-making traits, and behavioral preferences. There are no predictive or supernatural elements."
                },
                {
                  q: "How long does the assessment take?",
                  a: "The assessment consists of situational prompts and typically takes about 3 to 4 minutes to complete. We encourage you to answer instinctively."
                },
                {
                  q: "Is my data private?",
                  a: "Absolutely. We do not sell your personal data. Your responses are strictly confidential and are only used to generate your personalized archetype report."
                },
                {
                  q: "Do I have to pay to see my results?",
                  a: "You receive your primary archetype, dimensional polarity gauges, and a foundational diagnostic report completely free. An optional in-depth interactive synthesis is available for purchase."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-[#eae8e3]">
                  <h3 className="font-sans font-semibold text-lg text-on-surface mb-2">{faq.q}</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
