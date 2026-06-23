import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils, FaPlus, FaPen, FaStore, FaChartLine, FaBoxOpen } from "react-icons/fa"
import { TbReceipt2 } from "react-icons/tb"
import { useNavigate } from 'react-router-dom'
import OwnerItemCard from './OwnerItemCard'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.od{min-height:100vh;background:#FAFAF8;padding-top:72px;font-family:'Outfit',sans-serif;}
.od-hero{background:linear-gradient(145deg,#1C1507 0%,#2E1E08 55%,#3d2610 100%);padding:56px 5% 52px;position:relative;overflow:hidden;}
.od-hero-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.08) 1px,transparent 0);background-size:28px 28px;}
.od-orb{position:absolute;border-radius:50%;pointer-events:none;}
.od-hero-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1;}
.od-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(244,123,31,0.15);border:1px solid rgba(244,123,31,0.3);border-radius:50px;padding:6px 16px;font-size:12px;color:#FAA040;font-weight:700;margin-bottom:20px;}
.od-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,4vw,2.9rem);font-weight:700;color:#FAFAF8;letter-spacing:-1px;line-height:1.08;margin-bottom:14px;}
.od-title span{color:#F47B1F;font-style:italic;}
.od-sub{color:rgba(250,250,248,0.5);font-size:15px;line-height:1.7;margin-bottom:28px;max-width:500px;}
.od-actions{display:flex;gap:12px;flex-wrap:wrap;}
.od-btn{background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:14px;padding:13px 24px;font-family:'Outfit',sans-serif;font-weight:800;font-size:14px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 5px 20px rgba(244,123,31,0.42);transition:all 0.3s;}
.od-btn:hover{transform:translateY(-2px);box-shadow:0 9px 28px rgba(244,123,31,0.52);}
.od-btn-ghost{background:rgba(255,255,255,0.07);color:rgba(250,250,248,0.85);border:1.5px solid rgba(255,255,255,0.2);border-radius:14px;padding:12px 22px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all 0.25s;backdrop-filter:blur(8px);}
.od-btn-ghost:hover{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.35);}
/* STATS */
.od-stats{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px;}
.od-stat{background:rgba(244,123,31,0.1);border:1px solid rgba(244,123,31,0.2);border-radius:16px;padding:14px 22px;}
.od-stat-v{font-family:'Fraunces',serif;font-size:24px;font-weight:700;color:#F47B1F;}
.od-stat-l{font-size:11px;color:rgba(250,250,248,0.4);font-weight:700;letter-spacing:0.7px;text-transform:uppercase;margin-top:3px;}
/* BODY */
.od-body{max-width:1300px;margin:0 auto;padding:44px 5% 72px;}
/* SETUP CARD */
.od-setup{background:white;border-radius:28px;padding:48px 40px;text-align:center;box-shadow:0 8px 50px rgba(0,0,0,0.08);border:2px solid rgba(244,123,31,0.08);}
.od-setup-icon{width:80px;height:80px;border-radius:24px;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;box-shadow:0 8px 28px rgba(244,123,31,0.42);}
/* SHOP CARD */
.od-shop-banner{background:linear-gradient(135deg,rgba(244,123,31,0.07),rgba(232,98,10,0.03));border:2px solid rgba(244,123,31,0.12);border-radius:24px;overflow:hidden;margin-bottom:36px;}
.od-shop-img{width:100%;height:200px;object-fit:cover;}
.od-shop-info{padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
.od-shop-name{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:#1C1507;}
.od-shop-addr{font-size:13px;color:#917850;margin-top:4px;display:flex;align-items:center;gap:6px;}
/* MENU SECTION */
.od-sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;}
.od-sec-title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:#1C1507;}
.od-sec-title span{color:#F47B1F;}
.od-menu-list{display:flex;flex-direction:column;gap:14px;}
.od-empty{background:white;border-radius:24px;padding:60px 40px;text-align:center;box-shadow:0 4px 28px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.07);}
@media(max-width:640px){.od-hero{padding:44px 5% 40px;}.od-body{padding:28px 4% 56px;}.od-setup{padding:32px 24px;}}
`

function OwnerDashboard() {
  const { myShopData } = useSelector(s => s.owner)
  const navigate = useNavigate()
  const itemCount = myShopData?.items?.length || 0

  return (
    <div className="od">
      <style>{S}</style>
      <Nav />
      <section className="od-hero">
        <div className="od-hero-grid" />
        <div className="od-orb" style={{ top: '-20%', right: '-5%', width: 420, height: 420, background: 'radial-gradient(circle,rgba(244,123,31,0.18),transparent 65%)' }} />
        <div className="od-orb" style={{ bottom: '-25%', left: '10%', width: 260, height: 260, background: 'radial-gradient(circle,rgba(250,160,64,0.1),transparent 65%)' }} />
        <div className="od-hero-inner">
          <div className="od-badge"><FaStore size={12} />Restaurant Dashboard</div>
          <h1 className="od-title">
            {myShopData
              ? <>Welcome back,<br /><span>{myShopData.name}!</span></>
              : <>Grow your<br /><span>business</span> with us</>}
          </h1>
          <p className="od-sub">
            {myShopData ? 'Manage your menu, track orders and grow your restaurant on Pakwan Network.' : 'List your restaurant and reach thousands of hungry customers every day.'}
          </p>
          <div className="od-actions">
            {myShopData ? (
              <>
                <button className="od-btn" onClick={() => navigate('/add-item')}><FaPlus size={14} />Add Food Item</button>
                <button className="od-btn-ghost" onClick={() => navigate('/create-edit-shop')}><FaPen size={13} />Edit Shop</button>
                <button className="od-btn-ghost" onClick={() => navigate('/my-orders')}><TbReceipt2 size={16} />View Orders</button>
              </>
            ) : (
              <button className="od-btn" onClick={() => navigate('/create-edit-shop')}><FaPlus size={14} />List Your Restaurant</button>
            )}
          </div>
          {myShopData && (
            <div className="od-stats">
              {[{ v: itemCount, l: 'Menu Items' }, { v: '0', l: 'Orders Today' }, { v: '4.5★', l: 'Rating' }].map(s => (
                <div key={s.l} className="od-stat"><div className="od-stat-v">{s.v}</div><div className="od-stat-l">{s.l}</div></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="od-body">
        {!myShopData ? (
          <div className="od-setup">
            <div className="od-setup-icon">🏪</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700, color: '#1C1507', marginBottom: 12 }}>Set Up Your Restaurant</div>
            <div style={{ fontSize: 14, color: '#917850', maxWidth: 400, margin: '0 auto 28px' }}>Join thousands of restaurants already growing with Pakwan Network. Start listing your menu today!</div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[{ icon: '🚀', t: 'Easy Setup', d: 'Get listed in minutes' }, { icon: '📊', t: 'Analytics', d: 'Track your orders' }, { icon: '💰', t: 'More Revenue', d: 'Grow your business' }].map(f => (
                <div key={f.t} style={{ background: 'rgba(244,123,31,0.05)', border: '2px solid rgba(244,123,31,0.1)', borderRadius: 16, padding: '16px 20px', minWidth: 130, textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#1C1507' }}>{f.t}</div>
                  <div style={{ fontSize: 12, color: '#917850', marginTop: 4 }}>{f.d}</div>
                </div>
              ))}
            </div>
            <button className="od-btn" style={{ margin: '28px auto 0' }} onClick={() => navigate('/create-edit-shop')}><FaPlus size={14} />Create Your Restaurant</button>
          </div>
        ) : (
          <>
            <div className="od-shop-banner">
              {myShopData.image && <img className="od-shop-img" src={myShopData.image} alt={myShopData.name} />}
              <div className="od-shop-info">
                <div>
                  <div className="od-shop-name">{myShopData.name}</div>
                  <div className="od-shop-addr">📍 {myShopData.address}, {myShopData.city}</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{ background: 'linear-gradient(135deg,#F47B1F,#E8620A)', color: 'white', border: 'none', borderRadius: 13, padding: '10px 18px', fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 4px 16px rgba(244,123,31,0.38)' }} onClick={() => navigate('/create-edit-shop')}><FaPen size={12} />Edit</button>
                  <button style={{ background: 'rgba(244,123,31,0.08)', color: '#F47B1F', border: '1.5px solid rgba(244,123,31,0.2)', borderRadius: 13, padding: '10px 18px', fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }} onClick={() => navigate('/my-orders')}><TbReceipt2 size={15} />Orders</button>
                </div>
              </div>
            </div>

            <div className="od-sec-hd">
              <div>
                <div className="od-sec-title">Your <span>Menu</span></div>
                <div style={{ fontSize: 13, color: '#917850', marginTop: 4 }}>{itemCount} items listed</div>
              </div>
              <button className="od-btn" onClick={() => navigate('/add-item')} style={{ fontSize: 13, padding: '11px 20px' }}><FaPlus size={13} />Add Item</button>
            </div>

            {itemCount > 0 ? (
              <div className="od-menu-list">
                {myShopData.items?.map((item, i) => <OwnerItemCard key={i} data={item} />)}
              </div>
            ) : (
              <div className="od-empty">
                <div style={{ fontSize: 56, marginBottom: 14 }}>🍽️</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: '#1C1507', marginBottom: 8 }}>No menu items yet</div>
                <div style={{ fontSize: 14, color: '#917850', marginBottom: 24 }}>Start by adding your first food item!</div>
                <button className="od-btn" onClick={() => navigate('/add-item')}><FaPlus size={13} />Add Your First Item</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default OwnerDashboard
