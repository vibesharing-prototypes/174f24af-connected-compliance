"use client";

import Link from "next/link";

const CHECKLIST_ITEMS = [
  {
    step: 1,
    title: "Review policy against current EU and UK regulatory guidance",
    status: "Not Started" as const,
    statusColor: "#8b949e",
  },
  {
    step: 2,
    title: "Update anti-bribery and whistleblower protection language",
    status: "Not Started" as const,
    statusColor: "#8b949e",
    aiBadge: "AI has drafted updates",
  },
  {
    step: 3,
    title: "Re-certify with regional compliance leads (NA, EMEA, APAC)",
    status: "Not Started" as const,
    statusColor: "#8b949e",
  },
  {
    step: 4,
    title: "Publish updated policy and reset attestation cycle",
    status: "Blocked" as const,
    statusColor: "#f87171",
    blocked: "Depends on steps 1\u20133",
  },
];

const REGULATORY_CHANGES = [
  {
    title: "UK Bribery Act guidance updated",
    source: "UK Ministry of Justice",
    date: "Nov 2025",
    impact: "Anti-bribery language needs revision",
  },
  {
    title: "EU Whistleblower Directive transposition complete",
    source: "European Commission",
    date: "Sep 2025",
    impact: "New reporting channel requirements",
  },
  {
    title: "Singapore workplace harassment standards",
    source: "MOM Singapore",
    date: "Jan 2026",
    impact: "APAC-specific conduct provisions",
  },
];

const SUGGESTION_PILLS = [
  "Compare with peer policies",
  "Draft anti-bribery updates",
  "Show APAC attestation breakdown",
];

function DiligentLogo() {
  return (
    <svg viewBox="0 0 222 222" width={20} height={20}>
      <path
        fill="#EE312E"
        d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"
      />
      <path
        fill="#AF292E"
        d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"
      />
      <path
        fill="#D3222A"
        d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e7681" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function LinkExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function MetricBox({
  label,
  value,
  valueColor,
  sub,
  subColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
  sub?: string;
  subColor?: string;
}) {
  return (
    <div className="rounded-lg bg-[#0d1117] border border-[#30363d] p-3">
      <p className="text-[11px] text-[#6e7681] mb-1">{label}</p>
      <p className="text-sm font-semibold" style={{ color: valueColor ?? "#c9d1d9" }}>
        {value}
      </p>
      {sub && (
        <p className="text-[11px] mt-0.5 font-medium" style={{ color: subColor }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      {/* Left icon sidebar */}
      <aside className="w-12 bg-[#0d1117] border-r border-[#30363d] flex flex-col items-center py-3 gap-4 shrink-0">
        <DiligentLogo />
        <div className="w-6 h-[1px] bg-[#30363d]" />
        <div className="w-7 h-7 rounded-md bg-[#21262d] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>
        <div className="w-7 h-7 rounded-md bg-[#21262d] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
        </div>
        <div className="w-7 h-7 rounded-md bg-[#161b22] border border-[#58a6ff]/40 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top nav */}
        <header className="h-12 border-b border-[#30363d] flex items-center justify-between px-4 shrink-0">
          <span className="text-sm font-semibold text-[#f0f6fc]">Acme Co.</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8b949e]">Ronald Chen</span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#58a6ff] to-[#1f6feb] flex items-center justify-center text-[11px] font-bold text-white">
              RC
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="h-10 border-b border-[#30363d] flex items-center px-4 gap-1.5 text-xs">
          <Link href="/" className="text-[#58a6ff] hover:underline">
            Connected Compliance
          </Link>
          <ChevronRight />
          <Link href="/dashboard" className="text-[#58a6ff] hover:underline">
            Dashboard
          </Link>
          <ChevronRight />
          <span className="text-[#8b949e]">Code of Conduct Review</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex gap-5 p-5 max-w-[1440px] mx-auto">
            {/* LEFT COLUMN */}
            <div className="flex-1 min-w-0 space-y-5">
              {/* Task Overview */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <h1 className="text-xl font-bold text-[#f0f6fc]">
                    Global Code of Conduct Review
                  </h1>
                  <span className="ml-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f87171] bg-[#f8717118] border border-[#f8717130]">
                    Critical
                  </span>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8b949e] bg-[#21262d] border border-[#30363d]">
                    Policy Manager
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  <MetricBox label="Due" value="Mar 31, 2026" sub="21 days" subColor="#f87171" />
                  <MetricBox label="Last Reviewed" value="Jan 15, 2025" sub="14 months ago" subColor="#fbbf24" />
                  <MetricBox label="Status" value="Overdue for Review" valueColor="#f87171" />
                  <MetricBox label="Attestation" value="72% global" sub="49% APAC" subColor="#fbbf24" />
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[#0d1117] border border-[#30363d] px-4 py-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#8b949e]">Assigned to:</span>
                    <span className="text-[#c9d1d9] font-medium">Unassigned</span>
                  </div>
                  <button className="px-3 py-1.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-white text-xs font-semibold transition-colors">
                    Assign Owner
                  </button>
                </div>
              </div>

              {/* What Needs to Happen */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <h2 className="text-sm font-bold text-[#f0f6fc] mb-4">What Needs to Happen</h2>
                <div className="space-y-3">
                  {CHECKLIST_ITEMS.map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-3 rounded-lg border border-[#30363d] bg-[#0d1117] p-3.5"
                    >
                      <div className="shrink-0 w-7 h-7 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center text-xs font-bold text-[#8b949e]">
                        {item.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#c9d1d9] leading-snug">{item.title}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold" style={{ color: item.statusColor }}>
                            {item.status}
                          </span>
                          {item.blocked && (
                            <span className="text-[11px] text-[#6e7681]">&mdash; {item.blocked}</span>
                          )}
                          {item.aiBadge && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#8957e518] border border-[#8957e530] px-2 py-0.5 text-[10px] font-semibold text-[#d2a8ff]">
                              <SparklesIcon />
                              {item.aiBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI-Detected Regulatory Changes */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#fbbf24]"><AlertIcon /></span>
                  <h2 className="text-sm font-bold text-[#f0f6fc]">AI-Detected Regulatory Changes</h2>
                  <span className="text-xs text-[#8b949e]">3 regulatory changes since last review</span>
                </div>
                <div className="space-y-3">
                  {REGULATORY_CHANGES.map((item, i) => (
                    <div key={i} className="rounded-lg border border-[#30363d] bg-[#0d1117] p-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#c9d1d9]">{item.title}</p>
                          <p className="text-[11px] text-[#6e7681] mt-0.5">
                            {item.source} &middot; {item.date}
                          </p>
                        </div>
                        <span className="shrink-0 text-[#d2a8ff]"><LinkExternalIcon /></span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                        <span className="text-[#8b949e]">Impact:</span>
                        <span className="text-[#fbbf24]">{item.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-[360px] shrink-0 space-y-5">
              {/* AI Analysis */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#d2a8ff]"><SparklesIcon /></span>
                  <h2 className="text-sm font-bold text-[#f0f6fc]">AI Compliance Assistant</h2>
                </div>
                <div className="rounded-lg bg-[#0d1117] border border-[#30363d] p-3.5 mb-3">
                  <p className="text-[13px] text-[#c9d1d9] leading-relaxed">
                    Based on my analysis, the Code of Conduct has{" "}
                    <span className="text-[#fbbf24] font-semibold">3 sections</span> that need
                    updates to reflect recent regulatory changes. I&apos;ve drafted suggested
                    language for the anti-bribery section and whistleblower provisions. The APAC
                    attestation gap is a priority&nbsp;&mdash; manager completion is critically low
                    at <span className="text-[#f87171] font-semibold">41%</span>.
                  </p>
                </div>
                <p className="text-[11px] text-[#6e7681] leading-relaxed">
                  I can help you draft updates, compare with peer policies, or prepare a compliance
                  status report.
                </p>
              </div>

              {/* Related Signals */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <h2 className="text-sm font-bold text-[#f0f6fc] mb-3">Related Signals</h2>
                <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-3.5 hover:border-[#58a6ff]/40 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-[#c9d1d9]">
                      EU Whistleblower Directive Reporting
                    </p>
                    <span className="inline-flex items-center rounded-full bg-[#fbbf2418] border border-[#fbbf2430] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]">
                      High
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8b949e] mb-2">
                    <ClockIcon />
                    <span>Due in 34 days</span>
                  </div>
                  <p className="text-[11px] text-[#6e7681] leading-relaxed">
                    This directive directly impacts your Code of Conduct whistleblower provisions
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <h2 className="text-sm font-bold text-[#f0f6fc] mb-3">Actions</h2>
                <div className="space-y-2">
                  <Link
                    href="/editor"
                    className="flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-[#1f6feb] to-[#388bfd] hover:from-[#388bfd] hover:to-[#58a6ff] text-white text-sm font-semibold py-2.5 transition-all"
                  >
                    Open Policy Editor
                  </Link>
                  <button className="flex items-center justify-center w-full rounded-lg border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-sm font-medium py-2.5 transition-colors">
                    Assign to Team
                  </button>
                  <button className="flex items-center justify-center w-full rounded-lg border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-sm font-medium py-2.5 transition-colors">
                    Share with Stakeholders
                  </button>
                </div>
              </div>

              {/* Prompt Box */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                <div className="flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
                  <input
                    type="text"
                    placeholder="Ask about this policy..."
                    className="flex-1 bg-transparent text-sm text-[#c9d1d9] placeholder-[#6e7681] outline-none"
                    readOnly
                  />
                  <button className="shrink-0 text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                    <SendIcon />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {SUGGESTION_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex rounded-full border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[11px] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#58a6ff]/40 cursor-pointer transition-colors"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
