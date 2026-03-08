import { useState, useEffect, useRef } from "react";

// 🎵 Music: drop a `music.mp3` in the `public/` folder to enable background audio.
// A royalty-free Star Wars-inspired track works great here.

const episodeDescriptions = {
  "S1E5 – Rookies": "🪖 Rookie clones defend Rishi Station alone against a full droid takeover.",
  "S1E19 – Storm Over Ryloth": "🚀 Ahsoka disobeys orders during a desperate starfighter assault on the blockade.",
  "S1E20 – Innocents of Ryloth": "🕊️ Obi-Wan navigates a droid-occupied Twi'lek village to free its people.",
  "S1E21 – Liberty on Ryloth": "⚔️ Mace Windu unites with Twi'lek rebels to liberate their world.",
  "S1E22 – Hostage Crisis": "🎯 Cad Bane holds the Senate hostage to free Ziro the Hutt.",
  "S2E1 – Holocron Heist": "💎 Cad Bane breaks into the Jedi Temple itself to steal a holocron.",
  "S2E2 – Cargo of Doom": "😱 Bane uses the holocron to hunt Force-sensitive children across the galaxy.",
  "S2E3 – Children of the Force": "🔮 Anakin and Ahsoka race to rescue kidnapped Force-sensitive younglings.",
  "S2E12 – The Mandalore Plot": "🗡️ Obi-Wan uncovers a Death Watch assassination conspiracy on Mandalore.",
  "S2E13 – Voyage of Temptation": "💕 Obi-Wan and Duchess Satine reunite aboard a ship full of assassins.",
  "S2E14 – Duchess of Mandalore": "🏛️ Satine fights to keep Mandalore neutral as a coup brews.",
  "S2E20 – Death Trap": "💣 Young Boba Fett infiltrates a Republic cruiser to avenge his father.",
  "S2E21 – R2 Come Home": "🤖 R2-D2 must save soldiers trapped by one of Boba's explosions.",
  "S2E22 – Lethal Trackdown": "🔫 Plo Koon and Ahsoka hunt down Boba and Aurra Sing.",
  "S3E1 – Clone Cadets": "🎓 Five struggling cadets fight to earn their right to serve.",
  "S3E2 – ARC Troopers": "💥 The cadets must now defend Kamino from a massive Separatist assault.",
  "S3E12 – Nightsisters": "🧙 Asajj Ventress turns to dark magick to get her revenge on Dooku.",
  "S3E13 – Monster": "👹 Savage Opress is transformed into Dooku's terrifying new apprentice.",
  "S3E14 – Witches of the Mist": "⚡ The Nightsisters' deadly plot against Dooku reaches its conclusion.",
  "S3E15 – Overlords": "🌌 A mysterious Force realm pulls Anakin toward his terrifying destiny.",
  "S3E16 – Altar of Mortis": "🌑 The dark side shows Ahsoka a horrifying vision of her master's future.",
  "S3E17 – Ghosts of Mortis": "💀 Anakin glimpses his fate as Vader and must choose the Force's balance.",
  "S3E18 – The Citadel": "⛓️ Anakin leads a team disguised as droids to rescue a captured general.",
  "S3E19 – Counterattack": "🚁 The rescue team fights past deadly traps to reach extraction.",
  "S3E20 – Citadel Rescue": "🔥 A young Tarkin survives as the mission exacts a terrible toll.",
  "S4E7 – Darkness on Umbara": "😤 A ruthless Jedi general sends clones on impossible suicide missions.",
  "S4E8 – The General": "💢 General Krell's brutal orders raise the question — whose side is he on?",
  "S4E9 – Plan of Dissent": "🤯 Fives defies direct orders and executes a plan to save his brothers.",
  "S4E10 – Carnage of Krell": "⚔️ The clones must arrest and execute their own general. Dark and iconic.",
  "S4E21 – Brothers": "😲 Savage finds his brother Maul — alive, but shattered and feral.",
  "S4E22 – Revenge": "🔪 A restored Maul reconnects with the Force, driven by one obsession: Obi-Wan.",
  "S5E1 – Revival": "🗡️ Maul and Savage slaughter their way across the Outer Rim.",
  "S5E14 – Eminence": "💀 Maul forges a criminal empire: Death Watch, Black Sun, and the Pykes.",
  "S5E15 – Shades of Reason": "🏴 Maul's Shadow Collective conquers Mandalore in one devastating strike.",
  "S5E16 – The Lawless": "💔 Obi-Wan races to save Duchess Satine. Prepare to have your heart broken.",
  "S5E17 – Sabotage": "🔍 Ahsoka and Anakin investigate a bombing at the Jedi Temple.",
  "S5E18 – The Jedi Who Knew Too Much": "🏃 Framed for murder, Ahsoka flees the Republic itself.",
  "S5E19 – To Catch a Jedi": "🕵️ Ahsoka makes an unlikely alliance in the underworld to clear her name.",
  "S5E20 – The Wrong Jedi": "😭 The Jedi Council puts Ahsoka on trial. The outcome changes everything.",
  "S6E1 – The Unknown": "🧠 Clone trooper Tup spontaneously executes a Jedi — and no one knows why.",
  "S6E2 – Conspiracy": "🔬 Fives discovers a hidden inhibitor chip buried in every clone's brain.",
  "S6E3 – Fugitive": "🚨 Fives goes rogue with knowledge that could expose Order 66.",
  "S6E4 – Orders": "💔 Fives reaches Anakin with the truth — but the truth dies with him.",
  "S6E10 – Voices": "👻 Qui-Gon Jinn's voice calls Yoda on a mysterious spiritual journey.",
  "S6E11 – Destiny": "🌿 Yoda faces the Five Priestesses on a world beyond the living Force.",
  "S6E12 – Sacrifice": "🌀 Yoda confronts the dark side itself to unlock the secret of immortality.",
  "S7E1 – The Bad Batch": "🧬 Clone Force 99 is sent to rescue a soldier — and finds more than expected.",
  "S7E2 – A Distant Echo": "📡 A faint signal leads to a Separatist base — and a terrible discovery.",
  "S7E3 – On the Wings of Keeradaks": "🦅 The squad fights through Skako Minor with Echo barely hanging on.",
  "S7E4 – Unfinished Business": "💥 Echo turns the tide of war — then must choose his future.",
  "S7E5 – Gone with a Trace": "🔧 Ahsoka lands in Coruscant's underbelly and meets the Martez sisters.",
  "S7E6 – Deal No Deal": "📦 Rafa drags them into a dangerous spice run with the Pykes.",
  "S7E7 – Dangerous Debt": "⛓️ Captured by Pykes, the trio must find a way out together.",
  "S7E8 – Together Again": "🤝 The sisters and Ahsoka escape — but Ahsoka's path is changing.",
  "S7E9 – Old Friends Not Forgotten": "🔔 Ahsoka rejoins the 501st for one final mission: capture Maul on Mandalore.",
  "S7E10 – The Phantom Apprentice": "🏆 Ahsoka vs. Maul. One of the greatest fights in all of Star Wars.",
  "S7E11 – Shattered": "😱 Order 66 hits mid-mission. Everything falls apart in real time.",
  "S7E12 – Victory and Death": "💫 A silent, haunting finale. Nothing can prepare you.",
};

const arcEmojis = {
  "Rookies": "🪖",
  "Ryloth Arc": "🌅",
  "Hostage Crisis": "🎯",
  "Cad Bane Arc": "🤠",
  "Mandalore Arc (Part 1)": "🛡️",
  "Boba Fett Arc": "💣",
  "Clone Cadets / ARC Troopers": "🎓",
  "Nightsisters Trilogy": "🧙",
  "Mortis Arc": "🌌",
  "Citadel Arc": "⛓️",
  "Umbara Arc": "💀",
  "Maul Returns": "⚡",
  "Mandalore Takeover (Maul Arc)": "🔥",
  "Ahsoka Framed Arc": "⚖️",
  "Order 66 Conspiracy": "😰",
  "Yoda's Journey": "🌿",
  "Bad Batch Arc": "💪",
  "Ahsoka & the Martez Sisters": "🔧",
  "Siege of Mandalore": "💫",
};

const seasonEmojis = {
  "SEASON 1": "🌟",
  "SEASON 2": "🤠",
  "SEASON 3": "🌌",
  "SEASON 4": "💀",
  "SEASON 5": "⚖️",
  "SEASON 6 (The Lost Missions)": "🔮",
  "SEASON 7 (Final Season)": "🏆",
};

const THEMES = {
  dark: {
    label: "🌑 Dark",
    bg: "#0a0a0f",
    headerBg: "rgba(13,17,23,0.97)",
    cardBg: "#0f0f1a",
    cardDoneBg: "rgba(39,174,96,0.05)",
    border: "#1a1a2e",
    borderDone: "#27ae6040",
    text: "#e8e8e8",
    sub: "#888",
    muted: "#555",
    progressBg: "#1a1a2e",
    accent: "#4a90d9",
    accentDone: "#27ae60",
    seasonBtnBg: "none",
    episodeDoneBg: "rgba(74,144,217,0.08)",
    checkBorder: "#333",
    checkDoneBg: "#4a90d9",
  },
  light: {
    label: "☀️ Light",
    bg: "#f0f2fa",
    headerBg: "rgba(240,242,250,0.97)",
    cardBg: "#ffffff",
    cardDoneBg: "rgba(39,174,96,0.07)",
    border: "#d8dced",
    borderDone: "#27ae6060",
    text: "#1a1a2e",
    sub: "#555",
    muted: "#999",
    progressBg: "#d8dced",
    accent: "#1a5cc8",
    accentDone: "#1a8a45",
    seasonBtnBg: "none",
    episodeDoneBg: "rgba(26,92,200,0.07)",
    checkBorder: "#bbb",
    checkDoneBg: "#1a5cc8",
  },
  sith: {
    label: "⚡ Sith",
    bg: "#0d0000",
    headerBg: "rgba(20,0,0,0.97)",
    cardBg: "#150000",
    cardDoneBg: "rgba(200,0,0,0.05)",
    border: "#3a0000",
    borderDone: "#cc000040",
    text: "#ffdddd",
    sub: "#cc8888",
    muted: "#774444",
    progressBg: "#3a0000",
    accent: "#cc2200",
    accentDone: "#ff4444",
    seasonBtnBg: "none",
    episodeDoneBg: "rgba(200,0,0,0.08)",
    checkBorder: "#550000",
    checkDoneBg: "#cc2200",
  },
  mandalore: {
    label: "🪖 Mandalore",
    bg: "#060f08",
    headerBg: "rgba(6,15,8,0.97)",
    cardBg: "#0a1a0d",
    cardDoneBg: "rgba(39,174,96,0.08)",
    border: "#163d1e",
    borderDone: "#27ae6060",
    text: "#cce8d0",
    sub: "#5a9a6a",
    muted: "#2a5a38",
    progressBg: "#163d1e",
    accent: "#27ae60",
    accentDone: "#2ecc71",
    seasonBtnBg: "none",
    episodeDoneBg: "rgba(39,174,96,0.08)",
    checkBorder: "#163d1e",
    checkDoneBg: "#27ae60",
  },
};

const arcs = [
  {
    season: "SEASON 1",
    color: "#4a90d9",
    arcs: [
      {
        name: "Rookies",
        tag: "ESSENTIAL",
        episodes: ["S1E5 – Rookies"],
        note: "Introduces clone trooper culture. The start of Fives & Echo's story.",
      },
      {
        name: "Ryloth Arc",
        tag: "RECOMMENDED",
        episodes: [
          "S1E19 – Storm Over Ryloth",
          "S1E20 – Innocents of Ryloth",
          "S1E21 – Liberty on Ryloth",
        ],
        note: "Good Anakin/Ahsoka development. Fan favorite. Skip if tight on time.",
      },
      {
        name: "Hostage Crisis",
        tag: "RECOMMENDED",
        episodes: ["S1E22 – Hostage Crisis"],
        note: "Introduces bounty hunter Cad Bane. Leads into Season 2 opener.",
      },
    ],
  },
  {
    season: "SEASON 2",
    color: "#e8a320",
    arcs: [
      {
        name: "Cad Bane Arc",
        tag: "RECOMMENDED",
        episodes: [
          "S2E1 – Holocron Heist",
          "S2E2 – Cargo of Doom",
          "S2E3 – Children of the Force",
        ],
        note: "Cad Bane at his best. Showcases Anakin & Padmé too.",
      },
      {
        name: "Mandalore Arc (Part 1)",
        tag: "ESSENTIAL",
        episodes: [
          "S2E12 – The Mandalore Plot",
          "S2E13 – Voyage of Temptation",
          "S2E14 – Duchess of Mandalore",
        ],
        note: "Introduces Mandalore, Duchess Satine, Death Watch. Essential lore for The Mandalorian & Rebels.",
      },
      {
        name: "Boba Fett Arc",
        tag: "RECOMMENDED",
        episodes: [
          "S2E20 – Death Trap",
          "S2E21 – R2 Come Home",
          "S2E22 – Lethal Trackdown",
        ],
        note: "Young Boba's revenge story. Fun arc, decent character work.",
      },
    ],
  },
  {
    season: "SEASON 3",
    color: "#c0392b",
    arcs: [
      {
        name: "Clone Cadets / ARC Troopers",
        tag: "RECOMMENDED",
        episodes: [
          "S3E1 – Clone Cadets",
          "S3E2 – ARC Troopers",
        ],
        note: "Prequel to Rookies (S1E5). Best watched before it, actually. Great clone character building.",
      },
      {
        name: "Nightsisters Trilogy",
        tag: "ESSENTIAL",
        episodes: [
          "S3E12 – Nightsisters",
          "S3E13 – Monster",
          "S3E14 – Witches of the Mist",
        ],
        note: "Introduces Nightsisters of Dathomir & a major new villain. Has big implications for the rest of the series.",
      },
      {
        name: "Mortis Arc",
        tag: "ESSENTIAL",
        episodes: [
          "S3E15 – Overlords",
          "S3E16 – Altar of Mortis",
          "S3E17 – Ghosts of Mortis",
        ],
        note: "Clone Wars at its most bizarre and brilliant. Deep Force lore, the Chosen One prophecy. Ties directly into Ahsoka and Rebels.",
      },
      {
        name: "Citadel Arc",
        tag: "RECOMMENDED",
        episodes: [
          "S3E18 – The Citadel",
          "S3E19 – Counterattack",
          "S3E20 – Citadel Rescue",
        ],
        note: "Action-heavy rescue mission. Great Anakin/clone depth. One of the best season 3 arcs.",
      },
    ],
  },
  {
    season: "SEASON 4",
    color: "#8e44ad",
    arcs: [
      {
        name: "Umbara Arc",
        tag: "ESSENTIAL",
        episodes: [
          "S4E7 – Darkness on Umbara",
          "S4E8 – The General",
          "S4E9 – Plan of Dissent",
          "S4E10 – Carnage of Krell",
        ],
        note: "One of the absolute best arcs in the show. Dark, intense clone-focused war story. Do not skip.",
      },
      {
        name: "Maul Returns",
        tag: "ESSENTIAL",
        episodes: [
          "S4E21 – Brothers",
          "S4E22 – Revenge",
        ],
        note: "Darth Maul is back. Shocking at the time. Essential for everything that comes after.",
      },
    ],
  },
  {
    season: "SEASON 5",
    color: "#27ae60",
    arcs: [
      {
        name: "Mandalore Takeover (Maul Arc)",
        tag: "ESSENTIAL",
        episodes: [
          "S5E1 – Revival",
          "S5E14 – Eminence",
          "S5E15 – Shades of Reason",
          "S5E16 – The Lawless",
        ],
        note: "Peak Maul. Obi-Wan vs. Maul. One of the most emotionally devastating episodes in the series is here.",
      },
      {
        name: "Ahsoka Framed Arc",
        tag: "ESSENTIAL",
        episodes: [
          "S5E17 – Sabotage",
          "S5E18 – The Jedi Who Knew Too Much",
          "S5E19 – To Catch a Jedi",
          "S5E20 – The Wrong Jedi",
        ],
        note: "The best arc in the whole series. Game-changing for Ahsoka, Anakin, and the Jedi Order. Don't you dare skip this.",
      },
    ],
  },
  {
    season: "SEASON 6 (The Lost Missions)",
    color: "#16a085",
    arcs: [
      {
        name: "Order 66 Conspiracy",
        tag: "ESSENTIAL",
        episodes: [
          "S6E1 – The Unknown",
          "S6E2 – Conspiracy",
          "S6E3 – Fugitive",
          "S6E4 – Orders",
        ],
        note: "Fives uncovers the truth about the clone inhibitor chips and Order 66. Heartbreaking and essential.",
      },
      {
        name: "Yoda's Journey",
        tag: "ESSENTIAL",
        episodes: [
          "S6E10 – Voices",
          "S6E11 – Destiny",
          "S6E12 – Sacrifice",
        ],
        note: "Yoda learns the secret of becoming a Force ghost. Huge lore. Sets up Revenge of the Sith and beyond.",
      },
    ],
  },
  {
    season: "SEASON 7 (Final Season)",
    color: "#e74c3c",
    arcs: [
      {
        name: "Bad Batch Arc",
        tag: "RECOMMENDED",
        episodes: [
          "S7E1 – The Bad Batch",
          "S7E2 – A Distant Echo",
          "S7E3 – On the Wings of Keeradaks",
          "S7E4 – Unfinished Business",
        ],
        note: "Introduces Clone Force 99 (the Bad Batch). High production value. Leads into their own series.",
      },
      {
        name: "Ahsoka & the Martez Sisters",
        tag: "OPTIONAL",
        episodes: [
          "S7E5 – Gone with a Trace",
          "S7E6 – Deal No Deal",
          "S7E7 – Dangerous Debt",
          "S7E8 – Together Again",
        ],
        note: "Generally considered the weakest arc of the final season. Shows Ahsoka post-Jedi Order. Skip if needed, but it does bridge into the Siege.",
      },
      {
        name: "Siege of Mandalore",
        tag: "ESSENTIAL",
        episodes: [
          "S7E9 – Old Friends Not Forgotten",
          "S7E10 – The Phantom Apprentice",
          "S7E11 – Shattered",
          "S7E12 – Victory and Death",
        ],
        note: "The greatest arc in the series. Runs parallel to Revenge of the Sith. Ahsoka vs Maul. Order 66. Watch this and feel things.",
      },
    ],
  },
];

const tagColors = {
  ESSENTIAL: { bg: "#ff4444", text: "#fff" },
  RECOMMENDED: { bg: "#f0a500", text: "#000" },
  OPTIONAL: { bg: "#555", text: "#ccc" },
};

const tagEmojis = {
  ESSENTIAL: "🔴",
  RECOMMENDED: "🟡",
  OPTIONAL: "⚪",
};

const STORAGE_KEY = "clonewars-checklist-v1";
const THEME_KEY = "clonewars-theme-v1";
const themeKeys = Object.keys(THEMES);

export default function App() {
  const allEpisodeIds = arcs.flatMap((s) =>
    s.arcs.flatMap((arc) => arc.episodes.map((ep) => `${s.season}-${arc.name}-${ep}`))
  );

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [collapsed, setCollapsed] = useState({});
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  const theme = THEMES[themeKey];

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch {}
  }, [checked]);

  useEffect(() => {
    try { localStorage.setItem(THEME_KEY, themeKey); } catch {}
  }, [themeKey]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [muted]);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSeason = (season) => setCollapsed((prev) => ({ ...prev, [season]: !prev[season] }));
  const cycleTheme = () => setThemeKey((k) => themeKeys[(themeKeys.indexOf(k) + 1) % themeKeys.length]);

  const totalEps = allEpisodeIds.length;
  const watchedEps = allEpisodeIds.filter((id) => checked[id]).length;
  const pct = Math.round((watchedEps / totalEps) * 100);

  const btnBase = {
    background: "none",
    border: `1px solid ${theme.border}`,
    color: theme.sub,
    fontSize: 10,
    fontFamily: "'Courier New', monospace",
    fontWeight: 700,
    letterSpacing: 1,
    padding: "4px 9px",
    borderRadius: 4,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.text,
      fontFamily: "'Courier New', monospace",
      padding: "0 0 60px",
      transition: "background 0.3s, color 0.3s",
    }}>
      {/* 🎵 Background music — drop music.mp3 in /public to enable */}
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Header */}
      <div style={{
        background: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        transition: "background 0.3s",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
            <div>
              <div style={{
                fontSize: "clamp(13px, 2.5vw, 18px)",
                fontWeight: 900,
                letterSpacing: 2,
                color: theme.text,
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}>
                ⚔️ Star Wars: The Clone Wars
              </div>
              <div style={{ fontSize: 10, color: theme.muted, letterSpacing: 1, marginTop: 2 }}>
                🎬 No-Filler Episode Checklist
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, flexWrap: "wrap" }}>
              {/* Theme button */}
              <button onClick={cycleTheme} style={btnBase} title="Change theme">
                {theme.label}
              </button>
              {/* Mute button */}
              <button
                onClick={() => setMuted((m) => !m)}
                style={{ ...btnBase, color: muted ? theme.muted : theme.accent }}
                title={muted ? "Play music 🎵" : "Mute music 🔇"}
              >
                {muted ? "🔇 MUSIC" : "🎵 MUSIC"}
              </button>
              {/* Disney+ link */}
              <a
                href="https://www.disneyplus.com/browse/entity-314f14b4-b70a-4ec6-b634-2559f0b1f77e"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "#0063e5",
                  color: "#fff",
                  fontSize: 10,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  letterSpacing: 1,
                  padding: "5px 10px",
                  borderRadius: 4,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#0050b8"}
                onMouseLeave={e => e.currentTarget.style.background = "#0063e5"}
              >
                ▶ DISNEY+
              </a>
            </div>
          </div>

          {/* Progress row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 80, background: theme.progressBg, borderRadius: 4, height: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${pct}%`,
                background: pct === 100
                  ? "linear-gradient(90deg, #27ae60, #2ecc71)"
                  : `linear-gradient(90deg, ${theme.accent}, #a855f7)`,
                borderRadius: 4,
                transition: "width 0.4s ease",
              }} />
            </div>
            <span style={{ fontSize: 10, color: theme.muted, whiteSpace: "nowrap" }}>
              {watchedEps}/{totalEps}
              <span style={{ color: pct === 100 ? "#27ae60" : theme.accent, marginLeft: 4 }}>
                {pct === 100 ? "🎉 100%" : `${pct}%`}
              </span>
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(tagColors).map(([tag, c]) => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 2, background: c.bg, flexShrink: 0 }} />
                  <span style={{ color: theme.muted, letterSpacing: 0.5 }}>{tagEmojis[tag]} {tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🎉 Completion banner */}
      {pct === 100 && (
        <div style={{
          background: "linear-gradient(90deg, #27ae60, #2ecc71)",
          color: "#fff",
          textAlign: "center",
          padding: "12px",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 2,
        }}>
          🎉 YOU FINISHED THE CLONE WARS! MAY THE FORCE BE WITH YOU 🎉
        </div>
      )}

      {/* Arcs */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 0" }}>
        {arcs.map((season) => {
          const seasonEpIds = season.arcs.flatMap((arc) =>
            arc.episodes.map((ep) => `${season.season}-${arc.name}-${ep}`)
          );
          const seasonWatched = seasonEpIds.filter((id) => checked[id]).length;
          const isCollapsed = collapsed[season.season];
          const seasonDone = seasonWatched === seasonEpIds.length;

          return (
            <div key={season.season} style={{ marginBottom: 32 }}>
              <button
                onClick={() => toggleSeason(season.season)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${season.color}`,
                  padding: "8px 0",
                  cursor: "pointer",
                  marginBottom: 16,
                }}
              >
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 3,
                  color: season.color,
                  textTransform: "uppercase",
                }}>
                  {seasonEmojis[season.season] || "🎬"} {season.season}
                  {seasonDone && " ✅"}
                </span>
                <span style={{ fontSize: 12, color: theme.muted }}>
                  {seasonWatched}/{seasonEpIds.length} {isCollapsed ? "▶" : "▼"}
                </span>
              </button>

              {!isCollapsed && season.arcs.map((arc) => {
                const arcEpIds = arc.episodes.map((ep) => `${season.season}-${arc.name}-${ep}`);
                const arcDone = arcEpIds.every((id) => checked[id]);
                const tagStyle = tagColors[arc.tag];
                const emoji = arcEmojis[arc.name] || "🎬";

                return (
                  <div key={arc.name} style={{
                    background: arcDone ? theme.cardDoneBg : theme.cardBg,
                    border: `1px solid ${arcDone ? theme.borderDone : theme.border}`,
                    borderRadius: 8,
                    padding: "14px 16px",
                    marginBottom: 12,
                    transition: "all 0.2s",
                  }}>
                    {/* Arc header */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                      {/* Emoji badge */}
                      <div style={{
                        fontSize: 32,
                        lineHeight: 1,
                        flexShrink: 0,
                        filter: arcDone ? "grayscale(0)" : "grayscale(0.3)",
                        transition: "filter 0.3s",
                      }}>
                        {arcDone ? "✅" : emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                          <span style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: arcDone ? theme.accentDone : theme.text,
                            letterSpacing: 0.5,
                          }}>
                            {arc.name}
                          </span>
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            padding: "2px 7px",
                            borderRadius: 3,
                            background: tagStyle.bg,
                            color: tagStyle.text,
                          }}>
                            {tagEmojis[arc.tag]} {arc.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: 11, color: theme.sub, margin: 0, lineHeight: 1.6 }}>
                          {arc.note}
                        </p>
                      </div>
                    </div>

                    {/* Episodes */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {arc.episodes.map((ep) => {
                        const id = `${season.season}-${arc.name}-${ep}`;
                        const isDone = checked[id];
                        const desc = episodeDescriptions[ep];
                        return (
                          <label key={ep} style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            cursor: "pointer",
                            padding: "6px 8px",
                            borderRadius: 4,
                            background: isDone ? theme.episodeDoneBg : "transparent",
                            transition: "background 0.15s",
                          }}>
                            <input
                              type="checkbox"
                              checked={!!isDone}
                              onChange={() => toggle(id)}
                              style={{ display: "none" }}
                            />
                            <div style={{
                              width: 16,
                              height: 16,
                              borderRadius: 3,
                              border: `2px solid ${isDone ? theme.checkDoneBg : theme.checkBorder}`,
                              background: isDone ? theme.checkDoneBg : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 1,
                              transition: "all 0.15s",
                            }}>
                              {isDone && <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>}
                            </div>
                            <div>
                              <div style={{
                                fontSize: 13,
                                color: isDone ? theme.muted : theme.text,
                                textDecoration: isDone ? "line-through" : "none",
                                transition: "all 0.15s",
                                lineHeight: 1.3,
                              }}>
                                {ep}
                              </div>
                              {desc && (
                                <div style={{
                                  fontSize: 11,
                                  color: isDone ? theme.muted : theme.sub,
                                  marginTop: 2,
                                  lineHeight: 1.4,
                                  fontStyle: "italic",
                                  opacity: isDone ? 0.6 : 1,
                                }}>
                                  {desc}
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div style={{
          borderTop: `1px solid ${theme.border}`,
          paddingTop: 24,
          fontSize: 12,
          color: theme.muted,
          lineHeight: 1.8,
        }}>
          <p>⚡ <strong style={{ color: theme.sub }}>Pro tip:</strong> Season 7 Siege of Mandalore runs simultaneously with Revenge of the Sith. Watch them intercut or back-to-back for maximum impact.</p>
          <p>🎬 After finishing Clone Wars, consider watching <strong style={{ color: theme.sub }}>Star Wars Rebels</strong> — many characters and plot threads continue there.</p>
          <p>🎵 <strong style={{ color: theme.sub }}>Music:</strong> Drop a <code style={{ color: theme.accent }}>music.mp3</code> in the <code style={{ color: theme.accent }}>public/</code> folder and hit the 🔇 button above to enable background music!</p>
        </div>
      </div>
    </div>
  );
}
