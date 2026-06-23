import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStore, FaUtensils, FaArrowLeft, FaMapMarkerAlt, FaStar, FaClock, FaFireAlt } from "react-icons/fa"
import FoodCard from '../components/FoodCard'
import Nav from '../components/Nav'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.sp{min-height:100vh;background:#FAFAF8;padding-top:72px;font-family:'Outfit',sans-serif;}
.sp-hero{position:relative;height:420px;overflow:hidden;}
.sp-hero img{width:100%;height:100%;object-fit:cover;transition:transform 6s ease;}
.sp-hero:hover img{transform:scale(1.04);}
.sp-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,21,7,0.96) 0%,rgba(28,21,7,0.4) 50%,rgba(28,21,7,0.1) 100%);}
.sp-back{
  position:absolute;top:88px;left:5%;
  background:rgba(255,255,255,0.15);border:1.5px solid rgba(255,255,255,0.25);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border-radius:14px;padding:10px 18px;cursor:pointer;
  display:flex;align-items:center;gap:8px;
  font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:white;
  z-index:10;transition:all 0.25s;
}
.sp-back:hover{background:rgba(255,255,255,0.25);}
.sp-hero-bottom{position:absolute;bottom:0;left:0;right:0;padding:32px 5% 36px;}
.sp-hero-inner{max-width:1300px;margin:0 auto;}
.sp-restaurant-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(244,123,31,0.25);border:1px solid rgba(244,123,31,0.4);border-radius:50px;padding:5px 14px;font-size:11px;color:#FAA040;font-weight:800;margin-bottom:14px;}
.sp-title{font-family:'Fraunces',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:700;color:#FAFAF8;letter-spacing:-1.5px;margin-bottom:10px;line-height:1.05;}
.sp-meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.sp-meta-item{display:flex;align-items:center;gap:7px;color:rgba(250,250,248,0.7);font-size:13px;font-weight:600;}
.sp-rating-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(244,123,31,0.2);border:1px solid rgba(244,123,31,0.35);border-radius:10px;padding:5px 12px;color:#FAA040;font-size:13px;font-weight:800;}
/* CONTENT */
.sp-content{max-width:1300px;margin:0 auto;padding:40px 5% 72px;}
.sp-content-hd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;gap:16px;flex-wrap:wrap;}
.sp-menu-title{font-family:'Fraunces',serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:#1C1507;letter-spacing:-0.5px;}
.sp-menu-title span{color:#F47B1F;}
.sp-filter-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;}
.sp-filter{padding:8px 20px;border-radius:50px;border:2px solid;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.22s;}
.sp-grid{display:flex;flex-wrap:wrap;gap:22px;}
.sp-empty{background:white;border-radius:24px;padding:64px 40px;text-align:center;box-shadow:0 4px 28px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.07);width:100%;}
.sp-info-cards{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:36px;}
.sp-info-card{background:white;border-radius:18px;padding:16px 20px;box-shadow:0 3px 16px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.07);flex:1;min-width:120px;text-align:center;}
.sp-info-val{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#F47B1F;}
.sp-info-label{font-size:11px;color:#917850;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;}
@media(max-width:768px){.sp-grid{justify-content:center;}.sp-hero{height:320px;}.sp-info-cards{gap:10px;}}
`

function Shop() {
  const { shopId } = useParams()
  const [items, setItems] = useState([])
  const [shop, setShop] = useState(null)
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const r = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`, { withCredentials: true })
        setShop(r.data.shop); setItems(r.data.items)
      } catch (e) { console.log(e) }
    }
    load()
  }, [shopId])

  const cats = ['All', ...new Set(items.map(i => i.category))]
  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)
  const avgRating = items.length ? 4.5 : null

  return (
    <div className="sp">
      <style>{S}</style>
      <Nav />
      {shop && (
        <div className="sp-hero">
          <img src={shop.image} alt={shop.name} />
          <div className="sp-overlay" />
          <button className="sp-back" onClick={() => navigate('/')}><FaArrowLeft size={13} />Back</button>
          <div className="sp-hero-bottom">
            <div className="sp-hero-inner">
              <div className="sp-restaurant-badge"><FaStore size={10} />Restaurant</div>
              <h1 className="sp-title">{shop.name}</h1>
              <div className="sp-meta">
                <div className="sp-meta-item"><FaMapMarkerAlt size={13} color="#F47B1F" />{shop.address}, {shop.city}</div>
                {avgRating && <div className="sp-rating-badge"><FaStar size={12} />{avgRating} rating</div>}
                <div className="sp-meta-item"><FaClock size={12} color="#FAA040" />25–35 min</div>
                <div className="sp-meta-item"><FaFireAlt size={12} color="#FAA040" />{items.length} dishes</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sp-content">
        {/* Info Cards */}
        <div className="sp-info-cards">
          {[{ v: `${items.length}`, l: 'Menu Items' }, { v: '₹200+', l: 'Min Order' }, { v: '25 min', l: 'Delivery' }, { v: '4.5★', l: 'Rating' }].map(c => (
            <div key={c.l} className="sp-info-card">
              <div className="sp-info-val">{c.v}</div>
              <div className="sp-info-label">{c.l}</div>
            </div>
          ))}
        </div>

        <div className="sp-content-hd">
          <div>
            <div className="sp-menu-title"><FaUtensils color="#F47B1F" size={20} style={{ marginRight: 10, verticalAlign: 'middle' }} />Our <span>Menu</span></div>
          </div>
          <div style={{ fontSize: 13, color: '#917850', fontWeight: 600 }}>{filtered.length} items</div>
        </div>

        <div className="sp-filter-bar">
          {cats.map(c => (
            <button key={c} className="sp-filter" onClick={() => setFilter(c)}
              style={{ background: filter === c ? 'linear-gradient(135deg,#F47B1F,#E8620A)' : 'white', color: filter === c ? 'white' : '#917850', borderColor: filter === c ? '#F47B1F' : 'rgba(0,0,0,0.1)', boxShadow: filter === c ? '0 4px 16px rgba(244,123,31,0.35)' : 'none' }}>
              {c}
            </button>
          ))}
        </div>

        <div className="sp-grid">
          {filtered.map((item, i) => <FoodCard key={i} data={item} />)}
          {filtered.length === 0 && (
            <div className="sp-empty">
              <div style={{ fontSize: 52, marginBottom: 14 }}>🍽️</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: '#1C1507', marginBottom: 8 }}>No items in this category</div>
              <div style={{ fontSize: 14, color: '#917850' }}>Try selecting a different category above</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Shop
