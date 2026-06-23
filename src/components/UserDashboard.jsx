import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import { FaCircleChevronLeft, FaCircleChevronRight, FaFire, FaStar, FaMapPin } from "react-icons/fa6"
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard'
import { useNavigate } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
.ud{min-height:100vh;background:#FAFAF8;font-family:'Outfit',sans-serif;}
/* HERO */
.ud-hero{
  min-height:500px;display:flex;align-items:flex-end;
  background:linear-gradient(145deg,#1C1507 0%,#2E1E08 55%,#3d2610 100%);
  padding:100px 5% 56px;position:relative;overflow:hidden;
}
.ud-hero-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.09) 1px,transparent 0);background-size:28px 28px;}
.ud-hero-orb{position:absolute;border-radius:50%;pointer-events:none;}
.ud-hero-content{position:relative;z-index:2;width:100%;max-width:1300px;margin:0 auto;}
.ud-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(244,123,31,0.15);border:1px solid rgba(244,123,31,0.3);border-radius:50px;padding:6px 16px;margin-bottom:20px;font-size:12px;color:#FAA040;font-weight:700;letter-spacing:0.5px;}
.ud-badge-dot{width:7px;height:7px;border-radius:50%;background:#F47B1F;animation:blink 1.8s infinite;}
@keyframes blink{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(244,123,31,0.4);}50%{opacity:0.6;box-shadow:0 0 0 5px rgba(244,123,31,0);}}
.ud-title{font-family:'Fraunces',serif;font-size:clamp(2.2rem,5vw,3.4rem);font-weight:700;color:#FAFAF8;line-height:1.06;letter-spacing:-1.5px;margin-bottom:14px;}
.ud-title span{color:#F47B1F;font-style:italic;}
.ud-sub{color:rgba(250,250,248,0.5);font-size:15px;line-height:1.7;margin-bottom:32px;max-width:520px;}
.ud-hero-search{
  display:flex;align-items:center;background:white;border-radius:20px;
  height:58px;overflow:hidden;max-width:560px;
  box-shadow:0 8px 40px rgba(0,0,0,0.35);
  border:2px solid rgba(244,123,31,0.15);
}
.ud-hero-search input{flex:1;padding:0 20px;font-family:'Outfit',sans-serif;font-size:15px;color:#1C1507;border:none;outline:none;background:transparent;}
.ud-hero-search input::placeholder{color:#C4A07A;}
.ud-hero-search-btn{
  background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;
  height:100%;padding:0 24px;cursor:pointer;font-family:'Outfit',sans-serif;
  font-weight:800;font-size:14px;display:flex;align-items:center;gap:8px;
  transition:all 0.2s;white-space:nowrap;
}
.ud-hero-search-btn:hover{background:linear-gradient(135deg,#E8620A,#c8500a);}
.ud-stats-row{display:flex;gap:32px;flex-wrap:wrap;margin-top:32px;}
.ud-stat-item{display:flex;flex-direction:column;}
.ud-stat-v{font-family:'Fraunces',serif;font-size:26px;font-weight:700;color:#F47B1F;}
.ud-stat-l{font-size:11px;color:rgba(250,250,248,0.4);font-weight:700;letter-spacing:0.7px;text-transform:uppercase;margin-top:3px;}
/* BODY */
.ud-body{max-width:1380px;margin:0 auto;padding:0 5%;}
.ud-section{padding:48px 0 0;}
.ud-sec-hd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;}
.ud-sec-title{font-family:'Fraunces',serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:700;color:#1C1507;letter-spacing:-0.5px;line-height:1.1;}
.ud-sec-title span{color:#F47B1F;}
.ud-sec-sub{font-size:13px;color:#917850;margin-top:4px;}
.ud-see-all{font-family:'Outfit',sans-serif;font-size:13px;font-weight:800;color:#F47B1F;cursor:pointer;display:flex;align-items:center;gap:5px;transition:gap 0.2s;white-space:nowrap;}
.ud-see-all:hover{gap:9px;}
/* FILTERS */
.ud-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px;}
.ud-filter{padding:8px 20px;border-radius:50px;border:2px solid;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.22s;white-space:nowrap;}
/* SCROLL */
.ud-scroll-wrap{position:relative;}
.ud-scroll-btn{
  position:absolute;top:50%;transform:translateY(-50%);
  background:white;border:2px solid rgba(244,123,31,0.2);color:#F47B1F;
  border-radius:50%;width:40px;height:40px;cursor:pointer;z-index:10;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(0,0,0,0.12);transition:all 0.25s;
}
.ud-scroll-btn:hover{background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border-color:#F47B1F;transform:translateY(-50%) scale(1.1);}
.ud-hscroll{display:flex;overflow-x:auto;gap:14px;padding:4px 2px 14px;scrollbar-width:none;}
.ud-hscroll::-webkit-scrollbar{display:none;}
/* CATEGORY CARDS */
.ud-cat{
  flex-shrink:0;width:140px;height:140px;border-radius:22px;overflow:hidden;
  position:relative;cursor:pointer;
  box-shadow:0 4px 18px rgba(0,0,0,0.1);
  transition:all 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
  border:2px solid transparent;
}
.ud-cat:hover{transform:translateY(-7px) scale(1.03);box-shadow:0 16px 40px rgba(0,0,0,0.18);}
.ud-cat.active{border-color:#F47B1F;box-shadow:0 4px 20px rgba(244,123,31,0.4);}
.ud-cat img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;}
.ud-cat:hover img{transform:scale(1.12);}
.ud-cat-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,21,7,0.85) 0%,transparent 60%);}
.ud-cat-label{position:absolute;bottom:0;left:0;right:0;padding:10px 10px 12px;color:#FAFAF8;font-size:12px;font-weight:800;text-align:center;letter-spacing:0.2px;}
.ud-cat-check{position:absolute;top:9px;right:9px;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:11px;color:white;font-weight:900;box-shadow:0 2px 8px rgba(244,123,31,0.5);}
/* SHOP CARDS */
.ud-shop{
  flex-shrink:0;width:210px;border-radius:22px;overflow:hidden;background:white;cursor:pointer;
  box-shadow:0 4px 20px rgba(0,0,0,0.08);border:2px solid rgba(244,123,31,0.07);
  transition:all 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
}
.ud-shop:hover{transform:translateY(-9px);box-shadow:0 20px 50px rgba(0,0,0,0.15);border-color:rgba(244,123,31,0.2);}
.ud-shop-img{width:100%;height:120px;object-fit:cover;transition:transform 0.4s;}
.ud-shop:hover .ud-shop-img{transform:scale(1.07);}
.ud-shop-body{padding:12px 14px 14px;}
.ud-shop-name{font-weight:800;font-size:14px;color:#1C1507;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:5px;}
.ud-shop-tag{font-size:11px;color:#917850;display:flex;align-items:center;gap:5px;}
.ud-shop-rating{display:inline-flex;align-items:center;gap:4px;background:rgba(244,123,31,0.08);border-radius:8px;padding:2px 8px;font-size:11px;font-weight:800;color:#E8620A;margin-top:7px;}
/* FOOD GRID */
.ud-food-grid{display:flex;flex-wrap:wrap;gap:22px;}
/* SEARCH RESULT */
.ud-search-bar{
  background:white;border-radius:24px;padding:22px 24px;
  box-shadow:0 4px 30px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.1);
  margin-top:32px;
}
/* EMPTY STATE */
.ud-empty{background:white;border-radius:24px;padding:64px 40px;text-align:center;box-shadow:0 4px 28px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.07);width:100%;}
/* OFFER BANNER */
.ud-offer{
  background:linear-gradient(135deg,#1C1507,#2E1E08);border-radius:28px;
  padding:28px 32px;display:flex;align-items:center;justify-content:space-between;
  overflow:hidden;position:relative;margin-top:40px;cursor:pointer;
  box-shadow:0 8px 40px rgba(28,21,7,0.3);border:1px solid rgba(244,123,31,0.15);
  transition:transform 0.3s;
}
.ud-offer:hover{transform:translateY(-3px);}
.ud-offer::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.07) 1px,transparent 0);background-size:24px 24px;}
.ud-offer-orb{position:absolute;border-radius:50%;pointer-events:none;}
@media(max-width:768px){
  .ud-hero{padding:88px 5% 40px;}
  .ud-title{font-size:2rem;}
  .ud-body{padding:0 4%;}
  .ud-food-grid{justify-content:center;}
  .ud-stats-row{gap:18px;}
  .ud-offer{flex-direction:column;gap:16px;text-align:center;}
}
`

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(s => s.user)
  const cateRef = useRef(); const shopRef = useRef()
  const navigate = useNavigate()
  const [catLeft, setCatLeft] = useState(false); const [catRight, setCatRight] = useState(false)
  const [shopLeft, setShopLeft] = useState(false); const [shopRight, setShopRight] = useState(false)
  const [items, setItems] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQ, setSearchQ] = useState('')
  const dispatch = useSelector(s => s.user) // just to get dispatch
  const reduxDispatch = React.useReducer(null, null)[1]

  const handleFilter = cat => {
    setActiveFilter(cat)
    setItems(cat === 'All' ? itemsInMyCity : itemsInMyCity?.filter(i => i.category === cat))
  }
  useEffect(() => { setItems(itemsInMyCity) }, [itemsInMyCity])

  const upd = (ref, setL, setR) => { const el = ref.current; if (el) { setL(el.scrollLeft > 0); setR(el.scrollLeft + el.clientWidth < el.scrollWidth) } }
  const scrl = (ref, dir) => ref.current?.scrollBy({ left: dir === 'left' ? -230 : 230, behavior: 'smooth' })

  useEffect(() => {
    const pairs = [[cateRef, setCatLeft, setCatRight], [shopRef, setShopLeft, setShopRight]]
    const hs = pairs.map(([r, l, ri]) => () => upd(r, l, ri))
    pairs.forEach(([r, l, ri], i) => { if (r.current) { upd(r, l, ri); r.current.addEventListener('scroll', hs[i]) } })
    return () => pairs.forEach(([r], i) => r?.current?.removeEventListener('scroll', hs[i]))
  }, [shopInMyCity])

  return (
    <div className="ud">
      <style>{S}</style>
      <Nav />

      {/* HERO */}
      <section className="ud-hero">
        <div className="ud-hero-grid" />
        <div className="ud-hero-orb" style={{ top: '-10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(244,123,31,0.2),transparent 65%)' }} />
        <div className="ud-hero-orb" style={{ bottom: '-15%', left: '15%', width: 280, height: 280, background: 'radial-gradient(circle,rgba(250,160,64,0.12),transparent 65%)' }} />
        <div className="ud-hero-content">
          <div className="ud-badge">
            <span className="ud-badge-dot" />
            <FaMapPin size={10} color="#FAA040" />
            {currentCity || 'Detecting location...'}
          </div>
          <h1 className="ud-title">
            What's on your<br />
            <span>plate today?</span>
          </h1>
          <p className="ud-sub">
            {itemsInMyCity?.length || 0}+ dishes from {shopInMyCity?.length || 0} restaurants. Delivered in 25 minutes.
          </p>
          <div className="ud-hero-search">
            <input placeholder="Search biryani, pizza, sushi..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchQ.trim()) {
                  const filtered = itemsInMyCity?.filter(i => i.name.toLowerCase().includes(searchQ.toLowerCase()) || i.category.toLowerCase().includes(searchQ.toLowerCase()))
                  setItems(filtered); setActiveFilter('Search')
                }
              }} />
            <button className="ud-hero-search-btn" onClick={() => {
              if (searchQ.trim()) {
                const filtered = itemsInMyCity?.filter(i => i.name.toLowerCase().includes(searchQ.toLowerCase()) || i.category.toLowerCase().includes(searchQ.toLowerCase()))
                setItems(filtered); setActiveFilter('Search')
              } else { setItems(itemsInMyCity); setActiveFilter('All') }
            }}>
              <IoIosSearch size={18} />Search
            </button>
          </div>
          <div className="ud-stats-row">
            {[{ v: `${shopInMyCity?.length || 0}+`, l: 'Restaurants' }, { v: `${itemsInMyCity?.length || 0}+`, l: 'Dishes' }, { v: '25 min', l: 'Avg Delivery' }, { v: '4.8★', l: 'Avg Rating' }].map(s => (
              <div className="ud-stat-item" key={s.l}><div className="ud-stat-v">{s.v}</div><div className="ud-stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="ud-body">
        {/* Search Results (Nav search) */}
        {searchItems && searchItems.length > 0 && (
          <div className="ud-search-bar">
            <div className="ud-sec-hd" style={{ marginBottom: 16 }}>
              <div>
                <div className="ud-sec-title" style={{ fontSize: '1.3rem' }}>Search Results</div>
                <div className="ud-sec-sub">{searchItems.length} dishes found</div>
              </div>
            </div>
            <div className="ud-food-grid">{searchItems.map(item => <FoodCard data={item} key={item._id} />)}</div>
          </div>
        )}

        {/* Offer Banner */}
        <div className="ud-offer">
          <div className="ud-offer-orb" style={{ top: '-30%', right: '10%', width: 280, height: 280, background: 'radial-gradient(circle,rgba(244,123,31,0.2),transparent 65%)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(244,123,31,0.2)', border: '1px solid rgba(244,123,31,0.35)', borderRadius: 50, padding: '4px 14px', fontSize: 11, color: '#FAA040', fontWeight: 800, marginBottom: 12, letterSpacing: 0.5 }}>🎉 LIMITED TIME OFFER</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: '#FAFAF8', letterSpacing: -0.5, marginBottom: 8 }}>Free delivery on<br /><span style={{ color: '#F47B1F' }}>orders above ₹500</span></div>
            <div style={{ fontSize: 13, color: 'rgba(250,250,248,0.5)' }}>Use code PAKWAN50 for 50% off your first order</div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, fontSize: 72, filter: 'drop-shadow(0 8px 24px rgba(244,123,31,0.4))' }}>🛵</div>
        </div>

        {/* Categories */}
        <div className="ud-section">
          <div className="ud-sec-hd">
            <div>
              <div className="ud-sec-title">Browse <span>Categories</span></div>
              <div className="ud-sec-sub">{categories.length} cuisines available</div>
            </div>
          </div>
          <div className="ud-filters">
            <button className="ud-filter" onClick={() => handleFilter('All')}
              style={{ background: activeFilter === 'All' ? 'linear-gradient(135deg,#F47B1F,#E8620A)' : 'white', color: activeFilter === 'All' ? 'white' : '#917850', borderColor: activeFilter === 'All' ? '#F47B1F' : 'rgba(0,0,0,0.1)', boxShadow: activeFilter === 'All' ? '0 4px 16px rgba(244,123,31,0.35)' : 'none' }}>
              🍽️ All
            </button>
            {categories.map(c => (
              <button key={c.category} className="ud-filter" onClick={() => handleFilter(c.category)}
                style={{ background: activeFilter === c.category ? 'linear-gradient(135deg,#F47B1F,#E8620A)' : 'white', color: activeFilter === c.category ? 'white' : '#917850', borderColor: activeFilter === c.category ? '#F47B1F' : 'rgba(0,0,0,0.1)', boxShadow: activeFilter === c.category ? '0 4px 16px rgba(244,123,31,0.35)' : 'none' }}>
                {c.category}
              </button>
            ))}
          </div>
          <div className="ud-scroll-wrap">
            {catLeft && <button className="ud-scroll-btn" style={{ left: -16 }} onClick={() => scrl(cateRef, 'left')}><FaCircleChevronLeft size={17} /></button>}
            <div className="ud-hscroll" ref={cateRef}>
              {categories.map((c, i) => (
                <div key={i} className={`ud-cat${activeFilter === c.category ? ' active' : ''}`} onClick={() => handleFilter(c.category)}>
                  <img src={c.image} alt={c.category} />
                  <div className="ud-cat-overlay" />
                  <div className="ud-cat-label">{c.category}</div>
                  {activeFilter === c.category && <div className="ud-cat-check">✓</div>}
                </div>
              ))}
            </div>
            {catRight && <button className="ud-scroll-btn" style={{ right: -16 }} onClick={() => scrl(cateRef, 'right')}><FaCircleChevronRight size={17} /></button>}
          </div>
        </div>

        {/* Restaurants */}
        <div className="ud-section">
          <div className="ud-sec-hd">
            <div>
              <div className="ud-sec-title">Top Restaurants in <span>{currentCity}</span></div>
              <div className="ud-sec-sub">Tap to explore their menu</div>
            </div>
            <span className="ud-see-all">{shopInMyCity?.length || 0} restaurants →</span>
          </div>
          <div className="ud-scroll-wrap">
            {shopLeft && <button className="ud-scroll-btn" style={{ left: -16 }} onClick={() => scrl(shopRef, 'left')}><FaCircleChevronLeft size={17} /></button>}
            <div className="ud-hscroll" ref={shopRef}>
              {shopInMyCity?.map((shop, i) => (
                <div key={i} className="ud-shop" onClick={() => navigate(`/shop/${shop._id}`)}>
                  <img className="ud-shop-img" src={shop.image} alt={shop.name} />
                  <div className="ud-shop-body">
                    <div className="ud-shop-name">{shop.name}</div>
                    <div className="ud-shop-tag"><FaMapPin size={9} color="#F47B1F" />{shop.city}</div>
                    <div className="ud-shop-rating"><FaStar size={10} />4.5</div>
                  </div>
                </div>
              ))}
            </div>
            {shopRight && <button className="ud-scroll-btn" style={{ right: -16 }} onClick={() => scrl(shopRef, 'right')}><FaCircleChevronRight size={17} /></button>}
          </div>
        </div>

        {/* Food Items */}
        <div className="ud-section" style={{ paddingBottom: 72 }}>
          <div className="ud-sec-hd">
            <div>
              <div className="ud-sec-title">
                {activeFilter === 'All' || activeFilter === 'Search' ? <><FaFire size={22} color="#F47B1F" style={{ marginRight: 10, verticalAlign: 'middle' }} />Trending <span>Near You</span></> : <>✨ <span>{activeFilter}</span> Dishes</>}
              </div>
              <div className="ud-sec-sub">{items?.length || 0} dishes available</div>
            </div>
          </div>
          <div className="ud-food-grid">
            {items?.map((item, i) => <FoodCard key={i} data={item} />)}
            {(!items || items.length === 0) && (
              <div className="ud-empty">
                <div style={{ fontSize: 56, marginBottom: 14 }}>🍽️</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700, color: '#1C1507', marginBottom: 8 }}>No dishes found</div>
                <div style={{ fontSize: 14, color: '#917850' }}>Try another category or broaden your search!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserDashboard
