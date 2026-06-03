import React, { useState, useEffect, useRef } from "react";

const counselors = [
  {
    id: 1,
    name: "Elly Sanchez",
    title: "Licensed Professional Counselor",
    role: "Founder",
    status: "waitlist",
    quote: "Leading From the Inside Out.",
    specialties: ["Anxiety", "Somatic", "Life Transitions"],
    bio: "Perfect for life's unexpected promotions. One moment you're handling your responsibilities, the next you're suddenly in charge—at work, home, or in key relationships and no one prepared you for this part. Those contradictory thoughts making you second-guess yourself? They're not flaws—just part of being beautifully human. I work with people who never sought leadership but now have everyone looking to them for answers. Real change happens when we abandon perfection for honesty. Our work will be direct, purposeful, and surprisingly enjoyable—discovering authentic leadership that feels true to who you really are.",
    photo: "https://www.akconfluence.com/wp-content/uploads/2021/08/Elly-Web-2.jpg",
  },
  {
    id: 2,
    name: "Samuel Peterson",
    title: "Licensed Professional Counselor",
    role: null,
    status: "open",
    quote: "Helping you break barriers, find fulfillment, and stay active on your journey.",
    specialties: ["Depression", "Anxiety", "Life Fulfillment"],
    bio: "Samuel helps people who are seeking fulfillment in their lives, but feel stuck or held back by difficult events or circumstances.",
    photo: "https://www.akconfluence.com/wp-content/uploads/2021/08/Sam-Web-7.jpg",
  },
  {
    id: 3,
    name: "Jillian Thony",
    title: "Marriage & Family Therapist",
    role: null,
    status: "open",
    quote: "Gottman-trained therapist helping you find your voice and build meaningful connections.",
    specialties: ["Couples", "Anxiety", "Adolescents & Adults"],
    bio: "Jillian supports individuals and couples in navigating their emotions and finding their true selves.",
    photo: "https://www.akconfluence.com/wp-content/uploads/2025/01/jillian202521.jpg",
  },
  {
    id: 4,
    name: "Jessica Pretz",
    title: "Licensed Professional Counselor",
    role: null,
    status: "open",
    quote: "Feel understood. Specialized trauma support for life's toughest challenges.",
    specialties: ["Depression", "Grief and Loss", "PTSD & Trauma"],
    bio: "Jessica specializes in evidence-based trauma therapies, creating a safe space for healing from life's most difficult experiences.",
    photo: "/Jessica.jpg",
    bgStyle: { size: "auto 150%", position: "50% 78%" },
  },
  {
    id: 5,
    name: "Joe Mattison",
    title: "Licensed Professional Counselor",
    role: null,
    status: "open",
    quote: "Down-to-earth care using breathwork and CBT to support you through life's challenges.",
    specialties: ["Grief and Loss", "Anxiety", "Depression"],
    bio: "Joe combines practical therapeutic techniques with genuine compassion, meeting clients exactly where they are.",
    photo: "/Joe.jpg",
    bgStyle: { size: "auto 150%", position: "50% 81%" },
  },
  {
    id: 6,
    name: "Katie McNamara",
    title: "Marriage & Family Therapist",
    role: null,
    status: "open",
    quote: "Creating a space where you're truly heard and seen.",
    specialties: ["Grief and Loss", "Depression", "Anxiety"],
    bio: "Katie provides a space where you feel seen and heard in a world where we sometimes feel overlooked and forgotten.",
    photo: "https://www.akconfluence.com/wp-content/uploads/2025/01/Katie2025.jpg",
    bgStyle: { size: "auto 150%", position: "50% 63%" },
  },
];

const FILTER_SPECIALTIES = ['Anxiety', 'Couples', 'Grief and Loss', 'Depression', 'Somatic'];

export default function CounselorGrid() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [colCount, setColCount] = useState(() => window.innerWidth >= 768 ? 3 : 2);
  const detailRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e) => setColCount(e.matches ? 3 : 2);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function toggleFilter(specialty) {
    if (specialty === "All") {
      setActiveFilters([]);
    } else {
      setActiveFilters((prev) =>
        prev.includes(specialty)
          ? prev.filter((s) => s !== specialty)
          : [...prev, specialty]
      );
    }
    setExpandedId(null);
  }

  const filtered =
    activeFilters.length === 0
      ? counselors
      : counselors.filter((c) =>
          c.specialties.some((s) => activeFilters.includes(s))
        );

  function handleExpand(id) {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  }

  useEffect(() => {
    if (expandedId && detailRef.current) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [expandedId]);

  const expanded = counselors.find((c) => c.id === expandedId);

  return (
    <section id="counselors" className="py-16 lg:py-24 px-6 lg:px-20 bg-white scroll-mt-24">
      <style>{`
        .cg-card {
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(56, 56, 56, 0.08);
        }
        .cg-card:hover .cg-photo img,
        .cg-card:hover .cg-photo-bg {
          transform: scale(1.05);
        }
        .cg-pill {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cg-enter {
          animation: cgFadeUp 0.35s ease forwards;
        }
        @keyframes cgFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cg-detail-panel {
          animation: cgSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes cgSlideDown {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Our counselors
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-light text-[#383838] leading-[1.05] mb-6">
            Find your <em className="text-[#82a396] italic">counselor</em>
          </h2>
          <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed">
            Every path is different. Filter by what matters to you and find the right fit for your journey.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            className="cg-pill"
            onClick={() => toggleFilter("All")}
          >
            <span className={`inline-block text-[10px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-4 py-2 rounded-full transition-all ${
              activeFilters.length === 0
                ? 'bg-[#82a396] text-white'
                : 'bg-transparent text-[#a38d7a] border border-[#383838]/10 hover:border-[#82a396] hover:text-[#82a396]'
            }`}>
              All
            </span>
          </button>
          {FILTER_SPECIALTIES.map((s) => {
            const isActive = activeFilters.includes(s);
            return (
              <button
                key={s}
                className="cg-pill"
                onClick={() => toggleFilter(s)}
              >
                <span className={`inline-block text-[10px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#82a396] text-white'
                    : 'bg-transparent text-[#a38d7a] border border-[#383838]/10 hover:border-[#82a396] hover:text-[#82a396]'
                }`}>
                  {s}
                </span>
              </button>
            );
          })}
        </div>

        {/* Card grid — detail panel injects inline after the clicked card's row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[960px] mx-auto">
          {(() => {
            const cols = colCount;
            const rows = [];
            for (let i = 0; i < filtered.length; i += cols) {
              const rowItems = filtered.slice(i, i + cols);
              const rowIndex = i / cols;
              const rowHasExpanded = rowItems.some((c) => c.id === expandedId);

              rows.push(
                <React.Fragment key={`row-${rowIndex}`}>
                  {rowItems.map((c, j) => (
                    <div
                      key={c.id}
                      className="cg-card cg-enter rounded-xl overflow-hidden bg-[#f5f2ed]/60 border border-[#383838]/5"
                      onClick={() => handleExpand(c.id)}
                      style={{
                        animationDelay: `${(i + j) * 0.06}s`,
                        animationFillMode: "backwards",
                        outline: expandedId === c.id ? '2px solid #82a396' : 'none',
                        outlineOffset: '2px',
                      }}
                    >
                      <div className="cg-photo relative overflow-hidden aspect-square">
                        {c.bgStyle ? (
                          <div
                            role="img"
                            aria-label={`${c.name}, ${c.title}`}
                            className="cg-photo-bg w-full h-full transition-transform duration-700"
                            style={{
                              backgroundImage: `url(${c.photo})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: c.bgStyle.size,
                              backgroundPosition: c.bgStyle.position,
                            }}
                          />
                        ) : (
                          <img
                            src={c.photo}
                            alt={`${c.name}, ${c.title}`}
                            className="w-full h-full object-cover transition-transform duration-700"
                            style={{ objectPosition: c.photoPosition ?? "50% top" }}
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[9px] tracking-[0.1em] uppercase font-medium px-2 py-0.5 rounded-full">
                            <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'open' ? 'bg-[#82a396]' : 'bg-[#a38d7a]'}`} />
                            <span className={c.status === 'open' ? 'text-[#82a396]' : 'text-[#a38d7a]'}>
                              {c.status === "open" ? "Open" : "Waitlist"}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-[var(--font-heading)] text-[#383838] text-sm mb-0.5">{c.name}</p>
                        <p className="text-[#a38d7a] text-xs font-[var(--font-body)] font-light leading-tight">
                          {c.role ? `${c.role} · ` : ""}{c.title}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Detail panel — appears right after the row containing the selected card */}
                  {rowHasExpanded && expanded && (
                    <div
                      ref={detailRef}
                      className="cg-detail-panel col-span-full"
                    >
                      <div
                        ref={panelRef}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#383838]/5 overflow-hidden shadow-lg shadow-[#383838]/5"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="font-[var(--font-display)] text-[#383838] text-xl mb-1">{expanded.name}</p>
                              <p className="text-[#a38d7a] text-sm font-[var(--font-body)] font-light">
                                {expanded.role ? `${expanded.role} · ` : ""}{expanded.title}
                              </p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleExpand(expanded.id); }}
                              className="w-7 h-7 flex items-center justify-center rounded-full text-[#a38d7a] hover:text-[#383838] cursor-pointer bg-[#f5f2ed] border-none transition-colors text-lg leading-none flex-shrink-0"
                              aria-label="Close"
                            >
                              &times;
                            </button>
                          </div>

                          <p className="font-[var(--font-display)] italic text-[#82a396] text-sm mb-4 leading-relaxed">
                            &ldquo;{expanded.quote}&rdquo;
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {expanded.specialties.map((s) => (
                              <span
                                key={s}
                                className="text-[9px] font-[var(--font-mono)] uppercase tracking-wider text-[#383838]/60 bg-[#f5f2ed] px-2 py-0.5 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>

                          <p className="font-[var(--font-body)] text-[#a38d7a] text-[15px] font-light leading-relaxed mb-5">
                            {expanded.bio}
                          </p>

                          <a
                            href={`mailto:info@akconfluence.com?subject=Inquiry for ${expanded.name}`}
                            className="inline-flex items-center gap-2 bg-[#82a396] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {expanded.status === "open" ? "Send a message" : "Join waitlist"}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            }
            return rows;
          })()}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)] max-w-lg mx-auto leading-relaxed">
            Not sure who's the right fit? That's completely okay — <a href="#contact" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">reach out to us</a> and we'll help you find the best match.
          </p>
        </div>
      </div>
    </section>
  );
}
