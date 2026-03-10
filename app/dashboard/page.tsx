"use client";

import Link from "next/link";

const AGENTS = [
  { name: "Policy Monitor", detail: "Scanned 342 policies", time: "last 4 min ago" },
  { name: "Regulatory Scanner", detail: "14 jurisdictions monitored", time: "next in 12 min" },
  { name: "Training Tracker", detail: "12,400 sessions analyzed", time: "last 8 min ago" },
  { name: "Speak Up Analyst", detail: "23 active cases reviewed", time: "last 15 min ago" },
];

const SIGNALS = [
  {
    severity: "CRITICAL" as const,
    source: "Policy Manager",
    due: "Due in 21 days",
    title: "Global Code of Conduct Review",
    finding:
      "Your Global Code of Conduct was last reviewed 14 months ago. Recent EU and UK regulatory changes in anti-bribery and whistleblower protections require policy updates. Attestation rates in APAC are 23% below global average.",
    why: "Failure to update before the Mar 31 deadline could expose the organization to regulatory enforcement \u2014 3 peer companies received fines for stale policies in 2025.",
    action: "Begin policy review immediately and assign a compliance lead",
    owner: { name: "Elena Vasquez", role: "Head of Policy", initials: "EV", status: "suggested" as const },
  },
  {
    severity: "HIGH" as const,
    source: "Speak Up",
    due: "Annual report due in 34 days",
    title: "EU Whistleblower Directive Reporting",
    finding:
      "Annual reporting under the EU Whistleblower Directive is due Apr 13. Reporting activity in North America has increased significantly, with anonymous LATAM reports rising sharply. Several high-priority cases are still awaiting triage.",
    why: "Incomplete reporting may trigger regulatory inquiry. 2 high-priority cases need resolution before the filing deadline.",
    action: "Triage outstanding cases and prepare annual compliance report",
    owner: { name: "James Okafor", role: "Speak Up Lead", initials: "JO", status: "partial" as const },
  },
  {
    severity: "HIGH" as const,
    source: "Training",
    due: "Expires in 45 days",
    title: "APAC Harassment Training Renewal",
    finding:
      "Mandatory harassment training renewal for APAC expires Apr 26. Completion rates are 67% overall but manager-specific training coverage is only 41%. Speak Up cases involving manager behavior are trending up.",
    why: "Low manager training completion correlates with rising Speak Up cases \u2014 a gap between policy awareness and leadership behavior.",
    action: "Review training compliance by region and escalate manager-specific gaps",
    owner: { name: "Priya Sharma", role: "L&D Director APAC", initials: "PS", status: "suggested" as const },
  },
];

const WORKFLOW_STEPS = [
  { label: "Signal Detected", done: true },
  { label: "Review Deadlines", active: true },
  { label: "Assign Owners", done: false },
  { label: "Complete Tasks", done: false },
  { label: "Verify Compliance", done: false },
];

const SUGGESTIONS = [
  "Assign owners to unallocated tasks",
  "Draft compliance status report",
  "Create executive risk summary",
];

function DiligentLogo({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 222 222" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z" />
      <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z" />
      <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z" />
    </svg>
  );
}

function SidebarIcon({ d, active = false }: { d: string; active?: boolean }) {
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-md cursor-pointer transition-colors ${active ? "bg-[#ef4444]" : "hover:bg-[#21262d]"}`}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#8b949e"} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: "CRITICAL" | "HIGH" | "MEDIUM" }) {
  const styles = {
    CRITICAL: "bg-[#f87171]/15 text-[#f87171] border-[#f87171]/30",
    HIGH: "bg-[#fbbf24]/15 text-[#fbbf24] border-[#fbbf24]/30",
    MEDIUM: "bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/30",
  };
  return (
    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${styles[severity]}`}>
      {severity}
    </span>
  );
}

function OwnerCard({ owner }: { owner: (typeof SIGNALS)[number]["owner"] }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-[10px] uppercase tracking-wider text-[#8b949e] font-medium">AI-Suggested Owner</p>
      <div className="w-10 h-10 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center text-xs font-semibold text-[#c9d1d9]">
        {owner.initials}
      </div>
      <div>
        <p className="text-sm font-medium text-[#f0f6fc]">{owner.name}</p>
        <p className="text-xs text-[#8b949e]">{owner.role}</p>
      </div>
      {owner.status === "partial" && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20">
          Partially Assigned
        </span>
      )}
      <button className="text-xs text-[#58a6ff] hover:underline cursor-pointer">Edit</button>
    </div>
  );
}

function SignalCard({ signal }: { signal: (typeof SIGNALS)[number] }) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-5 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <SeverityBadge severity={signal.severity} />
            <span className="text-xs text-[#8b949e]">{signal.source} &middot; {signal.due}</span>
          </div>
          <h3 className="text-base font-semibold text-[#f0f6fc]">{signal.title}</h3>
          <div className="space-y-2 text-sm leading-relaxed">
            <p className="text-[#c9d1d9]">{signal.finding}</p>
            <p className="text-[#8b949e]">
              <span className="text-[#c9d1d9] font-medium">Why it matters: </span>
              {signal.why}
            </p>
            <p className="text-[#8b949e]">
              <span className="text-[#c9d1d9] font-medium">Recommended action: </span>
              {signal.action}
            </p>
          </div>
        </div>
        <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-[#21262d] p-5 flex items-center justify-center">
          <OwnerCard owner={signal.owner} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-12 flex-shrink-0 bg-[#0d1117] border-r border-[#21262d] flex flex-col items-center py-3 gap-4">
        <div className="mb-2">
          <DiligentLogo size={20} />
        </div>
        <SidebarIcon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <SidebarIcon d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6M9 14l2 2 4-4" active />
        <SidebarIcon d="M3 3v18h18M7 16l4-4 4 4 4-6" />
        <SidebarIcon d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM8 2v4M16 2v4M3 10h18" />
        <SidebarIcon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
        <div className="mt-auto">
          <SidebarIcon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Nav */}
        <header className="h-12 flex-shrink-0 border-b border-[#21262d] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth={1.8}>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="text-sm font-semibold text-[#f0f6fc]">Acme Co.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8b949e]">Ronald Chen</span>
            <div className="w-7 h-7 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[10px] font-semibold text-[#c9d1d9]">
              RC
            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto pb-36">
          {/* Hero */}
          <section className="max-w-3xl mx-auto px-6 pt-10 text-center space-y-5 animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30">
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              Agents Detected Compliance Deadlines
            </span>

            <h1 className="text-3xl font-bold text-[#f0f6fc] tracking-tight">
              3 deadlines require your attention
            </h1>
            <p className="text-sm text-[#8b949e] max-w-xl mx-auto leading-relaxed">
              Your compliance monitoring agents identified upcoming deadlines that may affect Acme&apos;s compliance posture. Two items are currently unassigned.
            </p>

            {/* Severity counts */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#f87171]/30 bg-[#f87171]/10">
                <span className="text-lg font-bold text-[#f87171]">1</span>
                <span className="text-xs text-[#f87171]/80">Critical</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#fbbf24]/30 bg-[#fbbf24]/10">
                <span className="text-lg font-bold text-[#fbbf24]">2</span>
                <span className="text-xs text-[#fbbf24]/80">High</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#3fb950]/30 bg-[#3fb950]/10">
                <span className="text-lg font-bold text-[#3fb950]">3</span>
                <span className="text-xs text-[#3fb950]/80">Policies Affected</span>
              </div>
            </div>

            {/* Workflow steps */}
            <div className="flex items-center justify-center gap-0 pt-2 flex-wrap">
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      step.done
                        ? "bg-[#238636]/15 text-[#3fb950] border-[#238636]/30"
                        : step.active
                          ? "bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/30"
                          : "bg-[#161b22] text-[#6e7681] border-[#30363d]"
                    }`}
                  >
                    {step.done && (
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M20 6L9 17l-5-5" /></svg>
                    )}
                    {step.active && <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />}
                    {step.label}
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#30363d" strokeWidth={2} className="mx-0.5 flex-shrink-0">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Agent activity ticker */}
          <div className="mt-8 border-y border-[#21262d] bg-[#161b22]/50 overflow-hidden">
            <div className="animate-ticker flex whitespace-nowrap py-2.5">
              {[...AGENTS, ...AGENTS].map((agent, i) => (
                <div key={i} className="flex items-center gap-2 px-5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] flex-shrink-0" />
                  <span className="text-[#c9d1d9] font-medium">{agent.name}</span>
                  <span className="text-[#6e7681]">&middot;</span>
                  <span className="text-[#8b949e]">{agent.detail},</span>
                  <span className="text-[#6e7681]">{agent.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signal Cards */}
          <section className="max-w-3xl mx-auto px-6 py-8 space-y-4">
            {SIGNALS.map((signal) => (
              <SignalCard key={signal.title} signal={signal} />
            ))}

            {/* CTA */}
            <div className="flex justify-center pt-4">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] transition-all shadow-lg shadow-[#238636]/20"
              >
                Review and assign deadlines
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </section>
        </main>

        {/* Bottom prompt box */}
        <div className="absolute bottom-0 left-12 right-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117] to-transparent pt-6 pb-4 px-6">
          <div className="max-w-3xl mx-auto space-y-3">
            {/* Suggestion pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58] transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input field */}
            <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-3">
              <DiligentLogo size={16} />
              <input
                type="text"
                placeholder="Ask about your compliance posture"
                className="flex-1 bg-transparent text-sm text-[#c9d1d9] placeholder-[#6e7681] outline-none"
                readOnly
              />
              <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#238636] hover:bg-[#2ea043] transition-colors cursor-pointer">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
