import React from 'react'
import { FaUtensils } from 'react-icons/fa'

const sizes = {
  sm: { box: 38, radius: 11, icon: 17, name: 18, sub: 9, gap: 10 },
  md: { box: 44, radius: 12, icon: 20, name: 19, sub: 9, gap: 10 },
  lg: { box: 52, radius: 15, icon: 24, name: 22, sub: 10, gap: 14 },
}

function BrandLogo({ size = 'md', theme = 'light', tagline = 'Network', showTagline = true, onClick, style = {} }) {
  const s = sizes[size] || sizes.md
  const isDark = theme === 'dark'
  const networkColor = isDark ? '#FAFAF8' : '#1C1507'
  const subColor = '#917850'

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: s.gap,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      <div
        style={{
          width: s.box,
          height: s.box,
          borderRadius: s.radius,
          background: 'linear-gradient(135deg,#F47B1F,#E8620A)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(244,123,31,0.38)',
          flexShrink: 0,
        }}
      >
        <FaUtensils size={s.icon} />
      </div>
      <div style={{ fontFamily: "'Fraunces',serif", lineHeight: 1.1 }}>
        <div style={{ fontSize: s.name, fontWeight: 700 }}>
          <span style={{ color: '#F47B1F' }}>Pakwan</span><span style={{ color: networkColor }}> Network</span>
        </div>
        {showTagline && (
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: s.sub, color: subColor, letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>
            {tagline}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandLogo
