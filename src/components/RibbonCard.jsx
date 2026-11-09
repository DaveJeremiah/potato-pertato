import React from 'react';

const PALETTES = {
  orange: {
    bg: '#F5C0A1',
    ribbon: '#EA9E70',
    accent: '#C2410C',
    badgeBg: '#EA580C',
    path: 'M -20 210 C 30 90, 180 120, 210 190 C 230 230, 140 240, 120 170 C 95 90, 200 10, 310 -15'
  },
  purple: {
    bg: '#F1DFFE',
    ribbon: '#DFC3F7',
    accent: '#6D28D9',
    badgeBg: '#7C3AED',
    path: 'M 75 230 C 40 120, 200 95, 340 185 C 280 140, 250 65, 360 25'
  },
  green: {
    bg: '#C7E0CD',
    ribbon: '#ABCAB3',
    accent: '#15803D',
    badgeBg: '#16A34A',
    path: 'M 10 -20 C 30 90, 160 80, 210 -20 M 260 230 C 220 120, 310 70, 345 -10'
  },
  yellow: {
    bg: '#FCE3A1',
    ribbon: '#F5D076',
    accent: '#B45309',
    badgeBg: '#D97706',
    path: 'M 100 235 C 210 155, 250 20, 185 15 C 120 10, 140 155, 285 235'
  },
  blue: {
    bg: '#92C5E3',
    ribbon: '#74B2D7',
    accent: '#1E40AF',
    badgeBg: '#2563EB',
    path: 'M -25 115 C 80 55, 165 130, 195 235 M 115 160 C 215 180, 290 95, 265 -20'
  },
  pink: {
    bg: '#F9BDD5',
    ribbon: '#ECA1BF',
    accent: '#BE185D',
    badgeBg: '#DB2777',
    path: 'M 110 -20 C 45 95, 195 165, 275 85 C 330 30, 215 5, 190 90 C 165 170, 255 230, 315 190'
  }
};

export default function RibbonCard({
  theme = 'orange',
  badgeText,
  title,
  subtitle,
  children,
  onClick,
  style = {},
  className = '',
  interactive = false
}) {
  const p = PALETTES[theme] || PALETTES.orange;

  return (
    <div
      onClick={onClick}
      className={`retro-ribbon-card ${interactive ? 'retro-card-interactive' : ''} ${className}`}
      style={{
        position: 'relative',
        backgroundColor: p.bg,
        borderRadius: '22px',
        border: '2.5px solid #1E1E24',
        boxShadow: '5px 5px 0px #1E1E24',
        padding: '1.6rem',
        overflow: 'hidden',
        color: '#1E1E24',
        cursor: interactive ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...style
      }}
    >
      {/* Looping Ribbon Watermark SVG inspired by Image 1 */}
      <svg
        viewBox="0 0 340 220"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <path
          d={p.path}
          fill="none"
          stroke={p.ribbon}
          strokeWidth="36"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {badgeText && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', gap: '0.5rem' }}>
            <span
              style={{
                backgroundColor: '#1E1E24',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '0.32rem 0.75rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {badgeText}
            </span>
          </div>
        )}

        {title && (
          <h3
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: subtitle ? '0.45rem' : '0.85rem',
              color: '#1E1E24'
            }}
          >
            {title}
          </h3>
        )}

        {subtitle && (
          <p
            style={{
              fontSize: '0.98rem',
              fontWeight: 500,
              color: '#2D2D35',
              lineHeight: 1.45,
              marginBottom: '1.1rem'
            }}
          >
            {subtitle}
          </p>
        )}

        <div style={{ marginTop: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}

