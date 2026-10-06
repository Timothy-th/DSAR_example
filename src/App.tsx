import { useEffect, useState, type ReactNode } from "react";

const earthImage =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxFYXJ0aCUyMGZyb20lMjBzcGFjZSUyMG9yYml0JTIwbmlnaHQ&ixlib=rb-4.1.0&q=85&w=1800";

type IconName =
  | "arrow"
  | "chevron"
  | "city"
  | "cloud"
  | "forest"
  | "layers"
  | "pause"
  | "play"
  | "radar"
  | "satellite"
  | "search"
  | "target"
  | "volcano"
  | "wave";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  city: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l5-3v15" />
      <path d="M10 21V3l9 4v14" />
      <path d="M13 8h2M13 12h2M13 16h2M7 12h1M7 16h1" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19H6a4 4 0 0 1-.4-8A6 6 0 0 1 17 9a5 5 0 0 1 .5 10Z" />
      <path d="m8 22 2-3m3 3 2-3m3 3 2-3" />
    </>
  ),
  forest: (
    <>
      <path d="m7 3-4 8h3l-4 7h10l-4-7h3L7 3Z" />
      <path d="M7 18v3" />
      <path d="m17 6-3 6h2l-3 6h8l-3-6h2l-3-6Z" />
      <path d="M17 18v3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  pause: (
    <>
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </>
  ),
  play: <path d="m8 5 11 7-11 7V5Z" />,
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12V3" />
      <path d="m12 12 6.4 6.4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  satellite: (
    <>
      <path d="m13 7 4 4-6 6-4-4 6-6Z" />
      <path d="m17 3 4 4-3 3-4-4 3-3ZM6 14l4 4-3 3-4-4 3-3Z" />
      <path d="m14 14 4 4M10 10 6 6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
    </>
  ),
  volcano: (
    <>
      <path d="M2 21 8 9l4 4 3-7 7 15H2Z" />
      <path d="M12 5c-1-1-1-2 0-3m4 3c1-1 1-2 0-3" />
    </>
  ),
  wave: (
    <>
      <path d="M2 12h3l2-5 4 10 3-7 3 4h5" />
    </>
  ),
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      >
        {iconPaths[name]}
      </g>
    </svg>
  );
}

function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const layers = ["Deformation", "SAR Coverage", "Ground Tracks"];
const dates = ["MAY 03", "MAY 15", "MAY 27", "JUN 08", "JUN 20"];

function RadarGlobe() {
  return (
    <div className="hero-visual" aria-label="Orbital radar scan visualization">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="globe">
        <img alt="Earth viewed from orbit" src={earthImage} />
        <div className="scan-line" />
        <div className="globe-grid" />
        <span className="target-dot target-one" />
        <span className="target-dot target-two" />
      </div>
      <div className="satellite">
        <Icon name="satellite" size={26} />
      </div>
      <div className="telemetry-card telemetry-top">
        <span>ORBITAL PASS</span>
        <strong>089 / ASC</strong>
      </div>
      <div className="telemetry-card telemetry-bottom">
        <span>SIGNAL RETURN</span>
        <strong>−18.4 dB</strong>
      </div>
    </div>
  );
}

function MapPanel() {
  const [opacity, setOpacity] = useState(72);
  const [activeLayers, setActiveLayers] = useState(layers);
  const [mode, setMode] = useState<"Before" | "After">("After");
  const [playing, setPlaying] = useState(false);
  const [dateIndex, setDateIndex] = useState(3);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setDateIndex((current) => (current + 1) % dates.length),
      1100,
    );
    return () => window.clearInterval(timer);
  }, [playing]);

  const toggleLayer = (layer: string) => {
    setActiveLayers((current) =>
      current.includes(layer)
        ? current.filter((item) => item !== layer)
        : [...current, layer],
    );
  };

  return (
    <div className="map-shell">
      <div className="map-canvas">
        <img
          alt="Satellite view of Earth with synthetic radar analysis overlays"
          className="map-image"
          src={earthImage}
        />
        <div className={`map-tone map-tone-${mode.toLowerCase()}`} />
        <svg
          className="map-overlay"
          viewBox="0 0 1200 680"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="track" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#50e6ff" stopOpacity="0" />
              <stop offset=".5" stopColor="#50e6ff" />
              <stop offset="1" stopColor="#50e6ff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="change">
              <stop stopColor="#ffcc66" stopOpacity=".9" />
              <stop offset=".45" stopColor="#ff5d35" stopOpacity=".6" />
              <stop offset="1" stopColor="#ff5d35" stopOpacity="0" />
            </radialGradient>
          </defs>
          {activeLayers.includes("SAR Coverage") && (
            <g opacity={opacity / 100}>
              <path
                className="coverage-band"
                d="M-80 80 420-80l780 470-500 170Z"
              />
              <path
                className="coverage-band coverage-two"
                d="M450 720 800-80l300 40-350 800Z"
              />
            </g>
          )}
          {activeLayers.includes("Ground Tracks") && (
            <g fill="none" stroke="url(#track)" strokeWidth="2">
              <path d="M-30 610C230 550 310 110 600 35s360 235 650 120" />
              <path d="M150 730C250 470 500 470 620 180S880-40 1100 35" />
              <path d="M-40 230c260 80 400 300 680 275s330-290 610-210" />
            </g>
          )}
          {activeLayers.includes("Deformation") && (
            <g opacity={opacity / 100}>
              <ellipse fill="url(#change)" cx="733" cy="332" rx="135" ry="95" />
              <ellipse
                className="deform-ring"
                cx="733"
                cy="332"
                rx="38"
                ry="25"
              />
              <ellipse
                className="deform-ring ring-two"
                cx="733"
                cy="332"
                rx="68"
                ry="45"
              />
              <ellipse
                className="deform-ring ring-three"
                cx="733"
                cy="332"
                rx="100"
                ry="67"
              />
            </g>
          )}
        </svg>

        <div className="map-marker marker-volcano">
          <span className="marker-pulse" />
          <span className="marker-label">
            <b>Campi Flegrei</b>
            <small>40.83°N · 14.14°E</small>
          </span>
        </div>
        <div className="map-marker marker-flood">
          <span />
          <em>Flood event</em>
        </div>
        <div className="map-marker marker-forest">
          <span />
          <em>Forest loss</em>
        </div>

        <div className="map-topbar">
          <div className="search-field">
            <Icon name="search" size={16} />
            <input
              aria-label="Search location"
              placeholder="Search location or coordinates"
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="live-chip">
            <i /> LIVE DATA
          </div>
        </div>

        <div className="zoom-controls" aria-label="Map zoom controls">
          <button aria-label="Zoom in">+</button>
          <button aria-label="Zoom out">−</button>
          <button aria-label="Center map">
            <Icon name="target" size={16} />
          </button>
        </div>

        <aside className="map-controls">
          <div className="panel-heading">
            <div>
              <span>ANALYSIS CONTROLS</span>
              <strong>Surface change</strong>
            </div>
            <Icon name="layers" />
          </div>
          <label className="control-label">
            DATE RANGE <span>03 MAY — 20 JUN 2025</span>
          </label>
          <div className="date-range">
            <div>
              03<span>MAY 2025</span>
            </div>
            <Icon name="arrow" />
            <div>
              20<span>JUN 2025</span>
            </div>
          </div>
          <label className="control-label">COMPARISON</label>
          <div className="segment">
            {(["Before", "After"] as const).map((item) => (
              <button
                className={mode === item ? "active" : ""}
                key={item}
                onClick={() => setMode(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="control-label">
            LAYERS <span>{activeLayers.length} ACTIVE</span>
          </label>
          <div className="layer-list">
            {layers.map((layer, index) => (
              <button key={layer} onClick={() => toggleLayer(layer)}>
                <i className={`layer-color layer-${index}`} />
                <span>{layer}</span>
                <b className={activeLayers.includes(layer) ? "on" : ""} />
              </button>
            ))}
          </div>
          <label className="control-label opacity-label">
            OVERLAY OPACITY <span>{opacity}%</span>
          </label>
          <input
            aria-label="Overlay opacity"
            className="range"
            max="100"
            min="0"
            onChange={(event) => setOpacity(Number(event.target.value))}
            style={{ "--range-value": `${opacity}%` } as React.CSSProperties}
            type="range"
            value={opacity}
          />
          <Button className="play-button" onClick={() => setPlaying(!playing)}>
            <Icon name={playing ? "pause" : "play"} size={16} />
            {playing ? "Pause Time Series" : "Play Time Series"}
          </Button>
        </aside>

        <div className="map-legend">
          <span>LOS DISPLACEMENT</span>
          <div className="legend-gradient" />
          <div>
            <b>−12 cm</b>
            <b>0</b>
            <b>+12 cm</b>
          </div>
        </div>
        <div className="map-status">
          <span>
            SCENE <b>S1A_IW_SLC_20250620</b>
          </span>
          <span>
            POL <b>VV+VH</b>
          </span>
          <span>
            RES <b>10 m</b>
          </span>
        </div>
      </div>
      <div className="map-caption">
        <div>
          <i /> COPERNICUS SENTINEL-1 · INTERFEROMETRIC WIDE SWATH
        </div>
        <span>Last acquisition 20 JUN 2025 · 05:42 UTC</span>
      </div>
    </div>
  );
}

const revealCards = [
  {
    icon: "volcano" as IconName,
    kicker: "GEODESY",
    title: "Volcanic Deformation",
    text: "Detect subtle ground movement around active volcanoes.",
    stat: "± 2.4 cm",
    unit: "LOS SHIFT",
  },
  {
    icon: "cloud" as IconName,
    kicker: "HYDROLOGY",
    title: "Flooding",
    text: "Monitor flooded areas even through clouds and at night.",
    stat: "4,680 km²",
    unit: "MAPPED",
  },
  {
    icon: "forest" as IconName,
    kicker: "BIOMASS",
    title: "Forest Change",
    text: "Track changes in forests and vegetation structure.",
    stat: "− 18.6%",
    unit: "BACKSCATTER",
  },
  {
    icon: "city" as IconName,
    kicker: "INFRASTRUCTURE",
    title: "Land Subsidence",
    text: "Reveal gradual ground movement beneath cities and infrastructure.",
    stat: "− 8 mm/yr",
    unit: "VELOCITY",
  },
];

function MiniChart({ index }: { index: number }) {
  const paths = [
    "M0 46 C20 40 25 45 42 28 S68 12 82 27 S108 35 130 9",
    "M0 16 C25 18 32 30 48 31 S72 16 88 26 S105 50 130 38",
    "M0 20 L18 18 30 28 45 24 60 46 74 32 90 42 105 20 130 30",
    "M0 10 C18 13 32 17 45 22 S65 27 78 34 S105 39 130 49",
  ];
  return (
    <svg className="mini-chart" viewBox="0 0 130 58" preserveAspectRatio="none">
      <path className="chart-grid" d="M0 15h130M0 30h130M0 45h130" />
      <path className="chart-fill" d={`${paths[index]} L130 58 L0 58Z`} />
      <path className="chart-line" d={paths[index]} />
    </svg>
  );
}

function Comparison() {
  const [position, setPosition] = useState(58);
  const [selectedDate, setSelectedDate] = useState(3);
  return (
    <div className="comparison-layout">
      <div className="comparison-card">
        <div className="comparison-image">
          <img alt="SAR observation before surface change" src={earthImage} />
          <div className="sar-texture" />
          <div
            className="after-layer"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <img alt="SAR observation after surface change" src={earthImage} />
            <div className="after-heat" />
          </div>
          <div className="compare-line" style={{ left: `${position}%` }}>
            <span>
              <Icon name="chevron" size={16} />
              <Icon name="chevron" size={16} />
            </span>
          </div>
          <input
            aria-label="Before and after comparison"
            className="compare-range"
            max="100"
            min="0"
            onChange={(event) => setPosition(Number(event.target.value))}
            type="range"
            value={position}
          />
          <span className="image-badge badge-before">BEFORE · 03 MAY</span>
          <span className="image-badge badge-after">AFTER · 20 JUN</span>
        </div>
        <div className="comparison-info">
          <div>
            <span>CHANGE DETECTED</span>
            <strong>+6.7 cm</strong>
            <small>Maximum line-of-sight displacement</small>
          </div>
          <div className="change-bars">
            {[30, 38, 46, 40, 56, 64, 83, 74, 92, 86, 100, 95].map(
              (height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ),
            )}
          </div>
        </div>
      </div>
      <div className="timeline-panel">
        <span className="eyebrow">TEMPORAL ANALYSIS</span>
        <h2>Watch Earth change.</h2>
        <p>
          Compare repeat radar observations to reveal motion invisible to the
          human eye—measured in centimeters, across weeks.
        </p>
        <div className="location-select">
          <span>
            <Icon name="volcano" /> Campi Flegrei, Italy
          </span>
          <Icon name="chevron" />
        </div>
        <div className="timeline">
          {dates.map((date, index) => (
            <button
              className={selectedDate === index ? "active" : ""}
              key={date}
              onClick={() => setSelectedDate(index)}
            >
              <i />
              <span>{date.split(" ")[0]}</span>
              <b>{date.split(" ")[1]}</b>
            </button>
          ))}
        </div>
        <div className="timeline-readout">
          <div>
            <span>ACQUISITION</span>
            <b>{dates[selectedDate]} 2025 · 05:42 UTC</b>
          </div>
          <div>
            <span>DISPLACEMENT</span>
            <b>+{(selectedDate * 1.6 + 0.3).toFixed(1)} cm</b>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <nav className="nav">
        <button
          className="brand"
          onClick={() => scrollTo("top")}
          aria-label="Dancing with SARs home"
        >
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          <span>
            <b>DANCING WITH SARs</b>
            <small>SEE EARTH MOVE</small>
          </span>
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#explore">Explore</a>
          <a href="#data">SAR Data</a>
          <a href="#how">How It Works</a>
          <a href="#about">About</a>
        </div>
        <Button onClick={() => scrollTo("explore")}>
          Start Exploring <Icon name="arrow" />
        </Button>
        <button
          className="menu-button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>

      <header className="hero" id="top">
        <div className="star-field" />
        <div className="hero-copy">
          <div className="mission-label">
            <i /> NASA EARTH OBSERVATION <span>•</span> SAR <span>•</span>{" "}
            TIME-SERIES ANALYSIS
          </div>
          <h1>
            Dancing <em>with SARs</em>
          </h1>
          <h2>See the Earth move through radar.</h2>
          <p>
            Explore how Synthetic Aperture Radar reveals subtle changes on
            Earth’s surface that ordinary imagery can miss.
          </p>
          <div className="hero-actions">
            <Button onClick={() => scrollTo("explore")}>
              Explore Earth <Icon name="arrow" />
            </Button>
            <Button variant="secondary" onClick={() => scrollTo("how")}>
              <Icon name="radar" /> How SAR Works
            </Button>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>10 m</strong>
              <span>SPATIAL RESOLUTION</span>
            </div>
            <div>
              <strong>6–12 d</strong>
              <span>REVISIT TIME</span>
            </div>
            <div>
              <strong>24 / 7</strong>
              <span>ALL-WEATHER VIEW</span>
            </div>
          </div>
        </div>
        <RadarGlobe />
        <div className="scroll-cue">
          <i /> SCROLL TO EXPLORE
        </div>
      </header>

      <section className="map-section" id="explore">
        <div className="section-head">
          <div>
            <span className="eyebrow">INTERACTIVE EARTH</span>
            <h2>Explore the signal.</h2>
          </div>
          <p>
            Layer satellite passes, radar coverage, and surface displacement to
            investigate where—and how—the planet is changing.
          </p>
        </div>
        <MapPanel />
      </section>

      <section className="change-section">
        <Comparison />
      </section>

      <section className="reveal-section">
        <div className="section-head centered">
          <div>
            <span className="eyebrow">APPLICATIONS</span>
            <h2>Discover what SAR reveals.</h2>
          </div>
          <p>
            Radar sees through clouds and darkness, turning subtle surface
            signals into actionable science.
          </p>
        </div>
        <div className="reveal-grid">
          {revealCards.map((card, index) => (
            <article className="reveal-card" key={card.title}>
              <div className="card-top">
                <span className="card-icon">
                  <Icon name={card.icon} size={24} />
                </span>
                <span className="card-kicker">
                  0{index + 1} / {card.kicker}
                </span>
              </div>
              <MiniChart index={index} />
              <div className="card-stat">
                <strong>{card.stat}</strong>
                <span>{card.unit}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <button className="text-button">
                Explore case study <Icon name="arrow" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="how-copy">
          <span className="eyebrow">RADAR, EXPLAINED</span>
          <h2>How SAR works.</h2>
          <p>
            Unlike optical cameras, SAR actively illuminates the ground with
            microwave pulses—day or night, through cloud cover.
          </p>
          <Button variant="secondary">
            Learn the science <Icon name="arrow" />
          </Button>
        </div>
        <div className="steps-diagram">
          <div className="signal-path" />
          {[
            [
              "satellite",
              "Satellite sends radar",
              "Microwave pulses travel toward Earth.",
            ],
            ["wave", "Radar reflects", "Surfaces return a unique signal."],
            [
              "radar",
              "SAR observes again",
              "The same ground is imaged over time.",
            ],
            [
              "layers",
              "Change becomes visible",
              "Phase differences reveal movement.",
            ],
          ].map(([icon, title, text], index) => (
            <div className="step" key={title}>
              <div className="step-number">0{index + 1}</div>
              <span className="step-icon">
                <Icon name={icon as IconName} size={28} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="data-section" id="data">
        <div className="section-head">
          <div>
            <span className="eyebrow">MISSION DATA</span>
            <h2>Built on open Earth science.</h2>
          </div>
          <p>
            Analysis-ready observations from international Earth-observing
            missions, processed for exploration.
          </p>
        </div>
        <div className="data-layout">
          <div className="mission-card">
            <div className="mission-orbit">
              <Icon name="satellite" size={32} />
              <i />
              <i />
            </div>
            <div className="mission-title">
              <span>COPERNICUS PROGRAMME</span>
              <h3>Sentinel-1</h3>
              <p>
                C-band Synthetic Aperture Radar providing continuous
                all-weather, day-and-night imagery.
              </p>
            </div>
            <div className="mission-status">
              <i /> OPERATIONAL
            </div>
          </div>
          <div className="metadata-grid">
            {[
              ["Acquisition Date", "20 JUN 2025", "05:42:18 UTC"],
              ["Satellite", "SENTINEL-1A", "ASCENDING PASS"],
              ["Polarization", "VV + VH", "DUAL POL"],
              ["Resolution", "10 METERS", "IW MODE"],
              ["Location", "40.83° N", "14.14° E"],
              ["Product", "LEVEL-1 SLC", "INTERFEROMETRIC"],
            ].map(([label, value, note]) => (
              <div className="metadata-card" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="source-strip">
          <span>DATA SOURCES</span>
          <b>NASA EARTHDATA</b>
          <i /> <b>ESA COPERNICUS</b>
          <i /> <b>ALASKA SATELLITE FACILITY</b>
          <i /> <b>EARTH OBSERVATION DATA</b>
        </div>
      </section>

      <section className="final-cta" id="about">
        <div className="cta-rings" />
        <span className="eyebrow">THE PLANET IN MOTION</span>
        <h2>
          The Earth is always moving.
          <br />
          <em>SAR lets us see it.</em>
        </h2>
        <p>Follow the signal. Compare the moments. Discover the change.</p>
        <Button onClick={() => scrollTo("explore")}>
          Start Exploring <Icon name="arrow" />
        </Button>
      </section>

      <footer>
        <button className="brand" onClick={() => scrollTo("top")}>
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          <span>
            <b>DANCING WITH SARs</b>
            <small>SEE EARTH MOVE</small>
          </span>
        </button>
        <p>NASA SPACE APPS · EARTH OBSERVATION PROTOTYPE</p>
        <span>Built for exploration · 2025</span>
      </footer>
    </main>
  );
}

export default App;
