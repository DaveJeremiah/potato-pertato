import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LIGHT_PALETTES = {
  orange: {
    bg: '#F5C0A1',
    ribbon: '#EA9E70',
    accent: '#C2410C',
    badgeBg: '#EA580C',
    textColor: '#1E1E24',
    subColor: '#2D2D35',
    path: 'M -20 210 C 30 90, 180 120, 210 190 C 230 230, 140 240, 120 170 C 95 90, 200 10, 310 -15'
  },
  purple: {
    bg: '#F1DFFE',
    ribbon: '#DFC3F7',
    accent: '#6D28D9',
    badgeBg: '#7C3AED',
    textColor: '#1E1E24',
    subColor: '#2D2D35',
    path: 'M 75 230 C 40 120, 200 95, 340 185 C 280 140, 250 65, 360 25'
  },
  green: {
    bg: '#C7E0CD',
    ribbon: '#ABCAB3',
    accent: '#15803D',
    badgeBg: '#16A34A',
    textColor: '#1E1E24',
    subColor: '#2D2D35',
    path: 'M 10 -20 C 30 90, 160 80, 210 -20 M 260 230 C 220 120, 310 70, 345 -10'
  },
  yellow: {
    bg: '#FCE3A1',
    ribbon: '#F5D076',
    accent: '#B45309',
    badgeBg: '#D97706',
    textColor: '#1E1E24',
    subColor: '#2D2D35',
    path: 'M 100 235 C 210 155, 250 20, 185 15 C 120 10, 140 155, 285 235'
  },
  blue: {
    bg: '#92C5E3',
    ribbon: '#74B2D7',
    accent: '#1E40AF',
    badgeBg: '#2563EB',
    textColor: '#1E1E24',
    subColor: '#2D2D35',
    path: 'M -25 115 C 80 55, 165 130, 195 235 M 115 160 C 215 180, 290 95, 265 -20'
  },
  pink: {
    bg: '#F9BDD5',
    ribbon: '#ECA1BF',
    accent: '#BE185D',
    badgeBg: '#DB2777',
    textColor: '#1E1E24',
    subColor: '#2D2D35',
    path: 'M 110 -20 C 45 95, 195 165, 275 85 C 330 30, 215 5, 190 90 C 165 170, 255 230, 315 190'
  }
};

const DARK_PALETTES = {
  orange: {
    bg: '#2F180B',
    ribbon: '#4E2711',
    accent: '#FB923C',
    badgeBg: '#C2410C',
    textColor: '#F8FAFC',
    subColor: '#D1D5DB',
    path: LIGHT_PALETTES.orange.path
  },
  purple: {
    bg: '#221133',
    ribbon: '#3C1D58',
    accent: '#C084FC',
    badgeBg: '#7C3AED',
    textColor: '#F8FAFC',
    subColor: '#D1D5DB',
    path: LIGHT_PALETTES.purple.path
  },
  green: {
    bg: '#0C2314',
    ribbon: '#163B23',
    accent: '#4ADE80',
    badgeBg: '#15803D',
    textColor: '#F8FAFC',
    subColor: '#D1D5DB',
    path: LIGHT_PALETTES.green.path
  },
  yellow: {
    bg: '#271C04',
    ribbon: '#423108',
    accent: '#FBBF24',
    badgeBg: '#B45309',
    textColor: '#F8FAFC',
    subColor: '#D1D5DB',
    path: LIGHT_PALETTES.yellow.path
  },
  blue: {
    bg: '#0B1C2E',
    ribbon: '#14314E',
    accent: '#60A5FA',
    badgeBg: '#1D4ED8',
    textColor: '#F8FAFC',
    subColor: '#D1D5DB',
    path: LIGHT_PALETTES.blue.path
  },
  pink: {
    bg: '#2E0C1C',
    ribbon: '#4B142F',
    accent: '#F472B6',
    badgeBg: '#BE185D',
    textColor: '#F8FAFC',
    subColor: '#D1D5DB',
    path: LIGHT_PALETTES.pink.path
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
  const { isDark } = useTheme();
  const paletteSet = isDark ? DARK_PALETTES : LIGHT_PALETTES;
  const p = paletteSet[theme] || paletteSet.orange;

  const borderColor = isDark ? '#384260' : '#1E1E24';
  const shadowColor = isDark ? '#000000' : '#1E1E24';

  return (
    <div
      onClick={onClick}
      className={`retro-ribbon-card ${interactive ? 'retro-card-interactive' : ''} ${className}`}
      style={{
        position: 'relative',
        backgroundColor: p.bg,
        borderRadius: '22px',
        border: `2.5px solid ${borderColor}`,
        boxShadow: `5px 5px 0px ${shadowColor}`,
        padding: '1.6rem',
        overflow: 'hidden',
        color: p.textColor,
        cursor: interactive ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...style
      }}
    >
      {/* Looping Ribbon Watermark SVG */}
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
                backgroundColor: isDark ? '#0F121C' : '#1E1E24',
                color: '#FFFFFF',
                border: isDark ? '1.5px solid #384260' : 'none',
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
              color: p.textColor
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
              color: p.subColor,
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
