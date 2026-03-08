import { useState, useEffect } from "react";

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

const STORAGE_KEY = "clonewars-checklist-v1";

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch (e) {
      console.error("Failed to save:", e);
    }
  }, [checked]);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSeason = (season) => setCollapsed((prev) => ({ ...prev, [season]: !prev[season] }));

  const totalEps = allEpisodeIds.length;
  const watchedEps = allEpisodeIds.filter((id) => checked[id]).length;
  const pct = Math.round((watchedEps / totalEps) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e8e8",
      fontFamily: "'Courier New', monospace",
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(13, 17, 23, 0.95)",
        borderBottom: "1px solid #1a1a2e",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* Top row: title + Disney+ button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <div>
              <div style={{
                fontSize: "clamp(13px, 2.5vw, 18px)",
                fontWeight: 900,
                letterSpacing: 2,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}>
                Star Wars: The Clone Wars
              </div>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, marginTop: 2 }}>
                No-Filler Episode Checklist
              </div>
            </div>
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
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#0050b8"}
              onMouseLeave={e => e.currentTarget.style.background = "#0063e5"}
            >
              ▶ DISNEY+
            </a>
          </div>

          {/* Bottom row: progress bar + stats + legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 80, background: "#1a1a2e", borderRadius: 4, height: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${pct}%`,
                background: pct === 100
                  ? "linear-gradient(90deg, #27ae60, #2ecc71)"
                  : "linear-gradient(90deg, #4a90d9, #a855f7)",
                borderRadius: 4,
                transition: "width 0.4s ease",
              }} />
            </div>
            <span style={{ fontSize: 10, color: "#555", whiteSpace: "nowrap" }}>
              {watchedEps}/{totalEps}
              <span style={{ color: pct === 100 ? "#27ae60" : "#4a90d9", marginLeft: 4 }}>{pct}%</span>
            </span>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {Object.entries(tagColors).map(([tag, c]) => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c.bg, flexShrink: 0 }} />
                  <span style={{ color: "#555", letterSpacing: 0.5 }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Arcs */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 0" }}>
        {arcs.map((season) => {
          const seasonEpIds = season.arcs.flatMap((arc) =>
            arc.episodes.map((ep) => `${season.season}-${arc.name}-${ep}`)
          );
          const seasonWatched = seasonEpIds.filter((id) => checked[id]).length;
          const isCollapsed = collapsed[season.season];

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
                  {season.season}
                </span>
                <span style={{ fontSize: 12, color: "#666" }}>
                  {seasonWatched}/{seasonEpIds.length} {isCollapsed ? "▶" : "▼"}
                </span>
              </button>

              {!isCollapsed && season.arcs.map((arc) => {
                const arcEpIds = arc.episodes.map((ep) => `${season.season}-${arc.name}-${ep}`);
                const arcDone = arcEpIds.every((id) => checked[id]);
                const tagStyle = tagColors[arc.tag];

                return (
                  <div key={arc.name} style={{
                    background: arcDone ? "rgba(39, 174, 96, 0.05)" : "#0f0f1a",
                    border: `1px solid ${arcDone ? "#27ae6040" : "#1a1a2e"}`,
                    borderRadius: 8,
                    padding: "14px 16px",
                    marginBottom: 12,
                    transition: "all 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                      <span style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: arcDone ? "#27ae60" : "#e8e8e8",
                        letterSpacing: 0.5,
                      }}>
                        {arcDone && "✓ "}{arc.name}
                      </span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 2,
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: tagStyle.bg,
                        color: tagStyle.text,
                      }}>
                        {arc.tag}
                      </span>
                    </div>

                    <p style={{ fontSize: 12, color: "#888", margin: "0 0 12px", lineHeight: 1.6 }}>
                      {arc.note}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {arc.episodes.map((ep) => {
                        const id = `${season.season}-${arc.name}-${ep}`;
                        const isDone = checked[id];
                        return (
                          <label key={ep} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            cursor: "pointer",
                            padding: "5px 8px",
                            borderRadius: 4,
                            background: isDone ? "rgba(74, 144, 217, 0.08)" : "transparent",
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
                              border: `2px solid ${isDone ? "#4a90d9" : "#333"}`,
                              background: isDone ? "#4a90d9" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              transition: "all 0.15s",
                            }}>
                              {isDone && <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>}
                            </div>
                            <span style={{
                              fontSize: 13,
                              color: isDone ? "#555" : "#ccc",
                              textDecoration: isDone ? "line-through" : "none",
                              transition: "all 0.15s",
                            }}>
                              {ep}
                            </span>
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
          borderTop: "1px solid #1a1a2e",
          paddingTop: 24,
          fontSize: 12,
          color: "#555",
          lineHeight: 1.8,
        }}>
          <p>⚡ <strong style={{ color: "#888" }}>Pro tip:</strong> Season 7 Siege of Mandalore runs simultaneously with Revenge of the Sith. Watch them intercut or back-to-back for maximum impact.</p>
          <p>🎬 After finishing Clone Wars, consider watching <strong style={{ color: "#888" }}>Star Wars Rebels</strong> — many characters and plot threads continue there.</p>
        </div>
      </div>
    </div>
  );
}
