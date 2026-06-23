import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineTrackChanges } from "react-icons/md"
import { FaHome, FaCheckCircle, FaClock, FaMotorcycle, FaSmile } from "react-icons/fa"
import BrandLogo from '../components/BrandLogo'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;}
.op{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;background:linear-gradient(165deg,#1C1507 0%,#2E1E08 45%,#3d2610 100%);position:relative;overflow:hidden;padding:24px;}
.op-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.08) 1px,transparent 0);background-size:32px 32px;}
.op-orb1{position:absolute;top:-8%;right:-6%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(244,123,31,0.16),transparent 65%);}
.op-orb2{position:absolute;bottom:-12%;left:-6%;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(250,160,64,0.09),transparent 65%);}
.op-card{background:rgba(255,255,255,0.98);border-radius:36px;padding:60px 52px;text-align:center;max-width:560px;width:100%;position:relative;z-index:2;box-shadow:0 40px 100px rgba(0,0,0,0.4),0 0 0 1px rgba(244,123,31,0.1);animation:slideUp 0.65s cubic-bezier(0.16,1,0.3,1);}
@keyframes slideUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
.op-logo{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:32px;}
.op-logo-icon{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 4px 14px rgba(244,123,31,0.4);}
.op-logo-text{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#1C1507;}
.op-check{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a);display:flex;align-items:center;justify-content:center;margin:0 auto 28px;box-shadow:0 12px 40px rgba(34,197,94,0.5);animation:popIn 0.5s 0.4s cubic-bezier(0.34,1.56,0.64,1) both;}
@keyframes popIn{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
.op-checkmark{font-size:44px;animation:checkDraw 0.3s 0.7s both;}
@keyframes checkDraw{from{opacity:0;transform:scale(0.5);}to{opacity:1;transform:scale(1);}}
.op-h1{font-family:'Fraunces',serif;font-size:2rem;font-weight:700;color:#1C1507;margin-bottom:8px;letter-spacing:-0.5px;}
.op-sub{font-size:15px;color:#917850;line-height:1.6;margin-bottom:28px;}
/* ETA */
.op-eta{background:linear-gradient(135deg,rgba(244,123,31,0.08),rgba(232,98,10,0.04));border:2px solid rgba(244,123,31,0.15);border-radius:20px;padding:20px 24px;margin-bottom:28px;display:flex;align-items:center;justify-content:space-between;}
.op-eta-time{font-family:'Fraunces',serif;font-size:2.2rem;font-weight:700;color:#F47B1F;}
.op-eta-label{font-size:12px;color:#917850;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;}
/* STEPS */
.op-steps{background:#FAFAF8;border-radius:18px;padding:16px 20px;margin-bottom:28px;text-align:left;}
.op-step{display:flex;align-items:center;gap:14px;padding:10px 0;position:relative;}
.op-step:not(:last-child)::after{content:'';position:absolute;left:18px;top:40px;width:2px;height:calc(100% - 8px);background:rgba(244,123,31,0.15);}
.op-step-icon{width:36px;height:36px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px;position:relative;z-index:1;}
.op-step-text{font-size:13px;font-weight:700;color:#1C1507;}
.op-step-sub{font-size:11px;color:#917850;margin-top:2px;}
/* BTNS */
.op-btns{display:flex;gap:12px;}
.op-btn{display:flex;align-items:center;justify-content:center;gap:9px;border:none;border-radius:18px;padding:16px 24px;font-family:'Outfit',sans-serif;font-weight:800;font-size:14px;cursor:pointer;transition:all 0.3s;flex:1;}
.op-btn.primary{background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;box-shadow:0 6px 24px rgba(244,123,31,0.45);}
.op-btn.primary:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(244,123,31,0.55);}
.op-btn.ghost{background:rgba(244,123,31,0.07);color:#F47B1F;border:2px solid rgba(244,123,31,0.2);}
.op-btn.ghost:hover{background:rgba(244,123,31,0.14);}
/* CONFETTI */
.op-confetti{position:fixed;pointer-events:none;z-index:1000;}
@keyframes fall{from{opacity:1;transform:translateY(-20px) rotate(0);}to{opacity:0;transform:translateY(110vh) rotate(720deg);}}
`

function OrderPlaced() {
  const navigate = useNavigate()
  const location = useLocation()
  const [eta] = useState(Math.floor(Math.random() * 15) + 22)
  const [confetti, setConfetti] = useState([])

  // Get order data from navigation state
  const order = location.state?.order || null

  useEffect(() => {
    setConfetti(Array.from({ length: 24 }, (_, i) => ({
      id: i, x: Math.random() * 100, delay: Math.random() * 1, size: Math.random() * 9 + 6,
      color: ['#F47B1F','#FAA040','#22c55e','#3b82f6','#a855f7','#E8620A','#fbbf24'][i % 7],
      dur: Math.random() * 1.8 + 1.5, shape: Math.random() > 0.5
    })))
  }, [])

  const steps = [
    { icon: '✅', bg: 'rgba(34,197,94,0.15)', text: 'Order Confirmed', sub: 'Your order has been received' },
    { icon: '👨‍🍳', bg: 'rgba(244,123,31,0.15)', text: 'Preparing Your Food', sub: 'Restaurant is cooking' },
    { icon: '🛵', bg: 'rgba(59,130,246,0.15)', text: 'Out For Delivery', sub: `Estimated ${eta} minutes` },
  ]

  return (
    <div className="op">
      <style>{S}</style>
      <div className="op-grid" /><div className="op-orb1" /><div className="op-orb2" />
      {confetti.map(c => (
        <div key={c.id} className="op-confetti" style={{ left: `${c.x}%`, top: 0, width: c.size, height: c.size, borderRadius: c.shape ? '50%' : 3, background: c.color, animation: `fall ${c.dur}s ${c.delay}s ease-in infinite` }} />
      ))}
      <div className="op-card">
        <BrandLogo size="md" theme="light" tagline="Network" style={{ justifyContent: 'center', marginBottom: 32 }} />
        <div className="op-check"><span className="op-checkmark">✓</span></div>
        <h1 className="op-h1">Order Placed! 🎉</h1>
        <p className="op-sub">Your food is on its way! Sit back, relax, and get ready for something delicious.</p>

        <div className="op-eta">
          <div>
            <div className="op-eta-time">{eta} min</div>
            <div className="op-eta-label">Estimated arrival</div>
          </div>
          <div style={{ fontSize: 48 }}>🛵</div>
        </div>

        <div className="op-steps">
          {steps.map((s, i) => (
            <div key={i} className="op-step">
              <div className="op-step-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div><div className="op-step-text">{s.text}</div><div className="op-step-sub">{s.sub}</div></div>
            </div>
          ))}
        </div>

        <div className="op-btns">
          <button className="op-btn primary" onClick={() => navigate('/my-orders')}><MdOutlineTrackChanges size={18} />Track Order</button>
          <button className="op-btn ghost" onClick={() => {
            if (order?._id) {
              navigate(`/invoice/${order._id}`)
            } else {
              navigate('/my-orders')
            }
          }}>
            🧾 View Invoice
          </button>
          <button className="op-btn ghost" onClick={() => navigate('/')}><FaHome size={15} />Back to Home</button>
        </div>
      </div>
    </div>
  )
}
export default OrderPlaced
