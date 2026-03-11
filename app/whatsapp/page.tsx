"use client";

import { useState } from "react";

/* ================================================================== */
/*  DATA — edit these arrays to create different simulations           */
/* ================================================================== */

interface Message {
  from: "user" | "bot" | string;
  text: string;
  time: string;
  read?: boolean;
  card?: { title: string; items: string[] };
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  isGroup?: boolean;
  lastSeen?: string;
  members?: string;
  unread?: number;
  messages: Message[];
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "compliance",
    name: "Diligent Compliance",
    avatar: "D",
    avatarBg: "#00a884",
    lastSeen: "online",
    messages: [
      { from: "bot", text: "🔔 3 compliance deadlines approaching in the next 30 days. Here's a summary:", time: "1:42 PM" },
      { from: "bot", text: "1. Global Code of Conduct review — due Mar 31 (21 days)\n2. EU Whistleblower Directive reporting — due Apr 24 (45 days)\n3. APAC Training certification — due May 15 (65 days)", time: "1:42 PM" },
      { from: "bot", text: "Highest priority: *Global Code of Conduct*. It hasn't been reviewed in 14 months and 3 regulatory changes affect it directly.\n\nI've already:\n✅ Compared all 12 sections against current regulations\n✅ Drafted updated language for 3 sections\n✅ Assigned Elena Vasquez as owner\n✅ Sent re-certification requests to regional leads", time: "1:43 PM" },
      { from: "user", text: "Show me what changed", time: "1:45 PM", read: true },
      { from: "bot", text: "Here are the 3 sections that need updates:", time: "1:45 PM", card: { title: "Draft Policy Changes", items: ["§4.2 Anti-Bribery — Updated to reference UK Bribery Act 2025 guidance", "§7.1 Whistleblower Protections — Added EU Directive reporting channel requirements", "§9.3 Training Requirements — Added Singapore MOM workplace harassment standards"] } },
      { from: "user", text: "When should we publish?", time: "1:47 PM", read: true },
      { from: "bot", text: "I'd recommend *April 1*. That gives 90 days before the June 30 audit window for all 12,400 employees to complete attestation. Waiting past mid-April risks audit findings.\n\nWant me to schedule it?", time: "1:47 PM" },
      { from: "user", text: "Yes, schedule for April 1", time: "1:48 PM", read: true },
      { from: "bot", text: "✅ *Publication scheduled for April 1, 2026*\n\nAttestation requests will go to 12,400 employees with a June 30 deadline. Elena Vasquez and regional leads will be notified 48 hours before publication.\n\nAnything else?", time: "1:48 PM" },
    ],
  },
  {
    id: "risk",
    name: "Diligent Risk",
    avatar: "D",
    avatarBg: "#f59e0b",
    lastSeen: "online",
    messages: [
      { from: "bot", text: "⚠️ *Geopolitical signal detected*\n\nTaiwan Strait escalation — military exercises announced near key shipping lanes. This could affect semiconductor supply chains across multiple industries.", time: "9:12 AM" },
      { from: "bot", text: "Here's what I found for Acme:\n\n• *47%* of your semiconductor suppliers operate in the affected region\n• Estimated revenue exposure: *$1.8B*\n• 3 business units directly affected: Hardware, Cloud Infrastructure, Consumer Devices\n• 2 existing controls flagged as insufficient", time: "9:13 AM" },
      { from: "bot", text: "Recommended actions:\n1. 🔴 Review supplier diversification strategy with David Chen (VP Supply Chain)\n2. 🟡 Brief the Board Risk Committee before Feb 28 meeting\n3. 🟡 Begin disclosure assessment — this may trigger 10-K risk factor update", time: "9:14 AM" },
      { from: "user", text: "Who's the risk owner?", time: "9:20 AM", read: true },
      { from: "bot", text: "Diana Reyes, Chief Risk Officer. She's been notified automatically. Her risk interview with the AI Risk Manager is scheduled for tomorrow at 10 AM.\n\nWould you like to add anyone else?", time: "9:20 AM" },
      { from: "user", text: "Share the full analysis with the board risk committee", time: "9:22 AM", read: true },
      { from: "bot", text: "✅ *Briefing sent to Board Risk Committee*\n\n5 members notified: James Liu (Chair), Sarah Mitchell, Robert Kang, Lisa Park, Thomas Andersen.\n\nMeeting invite created for Friday 2:00 PM. Pre-read materials attached including exposure map and recommended mitigations.\n\nI'll update you when members confirm.", time: "9:22 AM" },
    ],
  },
  {
    id: "team",
    name: "Compliance Leadership",
    avatar: "CL",
    avatarBg: "#6366f1",
    isGroup: true,
    members: "Elena Vasquez, Marcus Webb, Katrin Müller, Priya Sharma, You",
    messages: [
      { from: "Elena Vasquez", text: "Has anyone seen the updated UK Bribery Act guidance? We need to check if our Code of Conduct covers the new requirements.", time: "11:30 AM" },
      { from: "bot", text: "Hi Elena — I flagged this on Nov 15 when the UK Ministry of Justice published the update. It affects Section 4.2 of your Code of Conduct.\n\nI've already drafted updated language that references the new guidance. Want me to share it here?", time: "11:31 AM" },
      { from: "Marcus Webb", text: "Yes please, I need to review it for the NA region", time: "11:33 AM" },
      { from: "bot", text: "Here's the draft for §4.2 Anti-Bribery:", time: "11:33 AM", card: { title: "§4.2 Anti-Bribery — Draft Update", items: ["Added: Explicit reference to UK Bribery Act 2010 as amended by 2025 guidance", "Updated: Adequate procedures defense now requires documented risk assessment for all third-party engagements", "Added: Mandatory escalation to Legal for gifts/hospitality over £500 (reduced from £1,000)"] } },
      { from: "Elena Vasquez", text: "This looks solid. Ronald, can we get this into the current review cycle?", time: "11:40 AM" },
      { from: "user", text: "Absolutely. I've already approved the April 1 publish date for the full Code of Conduct update. This will be included.", time: "11:42 AM", read: true },
      { from: "Katrin Müller", text: "Perfect. EMEA re-certification is on my end — I'll confirm by end of week.", time: "11:45 AM" },
      { from: "bot", text: "📋 Summary of this thread:\n• UK Bribery Act guidance flagged and draft language prepared\n• Ronald approved April 1 publish\n• Katrin to confirm EMEA re-cert by Friday\n\nI'll track the open item and remind Katrin on Thursday if needed.", time: "11:46 AM" },
    ],
  },
  {
    id: "training",
    name: "Diligent Training",
    avatar: "D",
    avatarBg: "#8b5cf6",
    lastSeen: "online",
    messages: [
      { from: "bot", text: "📊 *Weekly Training Compliance Update*\n\nGlobal completion: 78% (+3% from last week)\nManager completion: 64% (⚠️ below 70% threshold)", time: "8:00 AM" },
      { from: "bot", text: "Regions of concern:\n\n🔴 *Pacific US* — 52% completion, 38% manager completion\n🔴 *Southern Europe* — 58% completion\n🟡 *Southeast Asia* — 65% completion\n\nAll other regions are tracking above 75%.", time: "8:00 AM" },
      { from: "bot", text: "Actions I've taken:\n✅ Sent reminders to 149 managers who haven't completed training\n✅ Flagged Pacific US to regional lead Marcus Webb\n✅ Escalated Southern Europe to Katrin Müller\n\nWould you like to see the reminder email text or adjust the deadline?", time: "8:01 AM" },
      { from: "user", text: "Show me the reminder email", time: "8:15 AM", read: true },
      { from: "bot", text: "*Subject: Action Required — Complete Mandatory Training by Mar 31*\n\n\"Hi [Manager Name],\n\nYour mandatory Workplace Respect training is due by March 31. Your team's completion depends on your participation — 12 of your direct reports are also pending.\n\nThis takes approximately 25 minutes. Start here: [link]\n\nIf you have questions, contact your regional compliance lead.\n\nBest,\nAcme Compliance Team\"", time: "8:15 AM" },
      { from: "user", text: "Looks good. What's the trend for Pacific US specifically?", time: "8:18 AM", read: true },
      { from: "bot", text: "Pacific US has been the slowest region for 3 consecutive weeks:\n\n• Week 1: 41% → Week 2: 47% → Week 3: 52%\n• 23 managers haven't started\n• Main gap: Engineering and Product teams in SF and Seattle offices\n\nMarcus Webb is scheduling mandatory in-person sessions for next week. Want me to add you to the update thread?", time: "8:18 AM" },
    ],
  },
];

/* ================================================================== */
/*  WhatsApp UI Components                                             */
/* ================================================================== */

function WACheckmarks({ read }: { read?: boolean }) {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" className="inline-block ml-1">
      <path d="M11.071.653a.457.457 0 00-.304-.102.493.493 0 00-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 00-.659.003.468.468 0 00.003.653l2.356 2.456a.455.455 0 00.327.14h.04a.461.461 0 00.334-.178l6.489-8.004a.462.462 0 00-.004-.687z" fill={read ? "#53bdeb" : "#8696a0"} />
      <path d="M14.757.653a.457.457 0 00-.304-.102.493.493 0 00-.381.178l-6.19 7.636-1.2-1.25-.313.39 1.178 1.229a.455.455 0 00.327.14h.04a.461.461 0 00.334-.178l6.489-8.004a.462.462 0 00.018-.04.462.462 0 00-.004-.687l.006.688z" fill={read ? "#53bdeb" : "#8696a0"} />
    </svg>
  );
}

function WABotBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 ml-1.5 rounded-sm bg-[#00a884]/20 px-1 py-0 text-[9px] font-bold text-[#00a884] uppercase tracking-wider">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00a884" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
      Bot
    </span>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function WhatsAppPage() {
  const [activeChat, setActiveChat] = useState("compliance");
  const chat = CONVERSATIONS.find((c) => c.id === activeChat)!;

  return (
    <div className="h-screen flex flex-col bg-[#111b21]">
      {/* Top green bar */}
      <div className="h-[110px] bg-[#00a884] shrink-0" />

      {/* Main container */}
      <div className="flex-1 -mt-[90px] flex justify-center px-4 pb-4 min-h-0">
        <div className="w-full max-w-[1400px] flex rounded-sm overflow-hidden shadow-xl min-h-0" style={{ height: "calc(100vh - 38px)" }}>

          {/* ==================== LEFT PANEL ==================== */}
          <div className="w-[420px] bg-[#111b21] border-r border-[#2a3942] flex flex-col shrink-0 min-h-0">
            {/* Header */}
            <div className="h-[60px] bg-[#202c33] flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00a884] to-[#00806a] flex items-center justify-center text-sm font-bold text-white">RC</div>
              </div>
              <div className="flex items-center gap-5 text-[#aebac1]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
              </div>
            </div>

            {/* Search */}
            <div className="px-2.5 py-2 shrink-0">
              <div className="flex items-center gap-3 bg-[#202c33] rounded-lg px-3 py-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                <input type="text" placeholder="Search or start new chat" className="flex-1 bg-transparent text-sm text-[#d1d7db] placeholder-[#8696a0] outline-none" readOnly />
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {CONVERSATIONS.map((conv) => {
                const lastMsg = conv.messages[conv.messages.length - 1];
                const isActive = conv.id === activeChat;
                const previewText = lastMsg.text.length > 60 ? lastMsg.text.slice(0, 60) + "…" : lastMsg.text;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveChat(conv.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 transition-colors text-left ${
                      isActive ? "bg-[#2a3942]" : "hover:bg-[#202c33]"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: conv.avatarBg }}>
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0 border-b border-[#2a3942] pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] text-[#e9edef] font-normal">{conv.name}</span>
                        <span className="text-[11px] text-[#8696a0]">{lastMsg.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-[13px] text-[#8696a0] truncate pr-2">
                          {lastMsg.from === "user" && <WACheckmarks read={lastMsg.read} />}
                          {lastMsg.from !== "user" && lastMsg.from !== "bot" && <span className="text-[#8696a0]">{lastMsg.from.split(" ")[0]}: </span>}
                          {" "}{previewText.replace(/\*/g, "")}
                        </p>
                        {conv.unread && (
                          <span className="w-5 h-5 rounded-full bg-[#00a884] text-[11px] font-bold text-[#111b21] flex items-center justify-center shrink-0">{conv.unread}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== RIGHT PANEL (Chat) ==================== */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0">
            {/* Chat header */}
            <div className="h-[60px] bg-[#202c33] flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: chat.avatarBg }}>
                  {chat.avatar}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-[15px] text-[#e9edef] font-normal">{chat.name}</span>
                    {!chat.isGroup && <WABotBadge />}
                  </div>
                  <p className="text-[12px] text-[#8696a0]">
                    {chat.isGroup ? chat.members : chat.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-[#aebac1]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-16 py-4 min-h-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundColor: "#0b141a",
              }}
            >
              <div className="max-w-[780px] mx-auto space-y-1">
                {/* Encryption notice */}
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#182229] px-3 py-1.5 text-[11px] text-[#8696a0]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                    Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                  </span>
                </div>

                {chat.messages.map((msg, i) => {
                  const isUser = msg.from === "user";
                  const isBot = msg.from === "bot";
                  const senderName = !isUser && !isBot ? msg.from : null;

                  return (
                    <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`relative max-w-[65%] rounded-lg px-2.5 pt-1.5 pb-1 ${
                          isUser
                            ? "bg-[#005c4b]"
                            : "bg-[#202c33]"
                        }`}
                        style={{ minWidth: "80px" }}
                      >
                        {/* Sender name in group chats */}
                        {senderName && (
                          <p className="text-[12px] font-medium mb-0.5" style={{
                            color: ["#e9a5ff", "#53bdeb", "#ffb74d", "#80cbc4", "#f48fb1"][
                              CONVERSATIONS.find((c) => c.id === activeChat)!.messages
                                .filter((m) => m.from !== "user" && m.from !== "bot")
                                .map((m) => m.from)
                                .filter((v, idx, a) => a.indexOf(v) === idx)
                                .indexOf(senderName) % 5
                            ],
                          }}>
                            {senderName}
                          </p>
                        )}
                        {isBot && chat.isGroup && (
                          <p className="text-[12px] font-medium text-[#00a884] mb-0.5 flex items-center gap-1">
                            Diligent AI
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00a884" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          </p>
                        )}

                        {/* Message text */}
                        <p className="text-[14px] text-[#e9edef] leading-[19px] whitespace-pre-wrap">
                          {msg.text.split(/(\*[^*]+\*)/).map((part, pi) =>
                            part.startsWith("*") && part.endsWith("*") ? (
                              <strong key={pi} className="font-semibold">{part.slice(1, -1)}</strong>
                            ) : (
                              <span key={pi}>{part}</span>
                            )
                          )}
                        </p>

                        {/* Card attachment */}
                        {msg.card && (
                          <div className="mt-2 rounded-lg bg-[#0b141a] border border-[#2a3942] p-3">
                            <p className="text-[12px] font-semibold text-[#00a884] mb-2">{msg.card.title}</p>
                            <div className="space-y-1.5">
                              {msg.card.items.map((item, ii) => (
                                <div key={ii} className="flex items-start gap-2">
                                  <span className="text-[#00a884] mt-0.5 shrink-0">•</span>
                                  <p className="text-[12px] text-[#aebac1] leading-relaxed">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Timestamp + checkmarks */}
                        <div className="flex items-center justify-end gap-0.5 mt-0.5 -mb-0.5">
                          <span className="text-[10px] text-[#ffffff99]">{msg.time}</span>
                          {isUser && <WACheckmarks read={msg.read} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Input bar */}
            <div className="h-[62px] bg-[#202c33] flex items-center gap-2 px-4 shrink-0">
              <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors p-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
              </button>
              <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors p-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              </button>
              <div className="flex-1 flex items-center rounded-lg bg-[#2a3942] px-3 py-2.5">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 bg-transparent text-[14px] text-[#d1d7db] placeholder-[#8696a0] outline-none"
                  readOnly
                />
              </div>
              <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors p-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
