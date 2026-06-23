import React, { useEffect, useRef, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6"
import { IoIosSearch } from "react-icons/io"
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setSearchItems, setUserData } from '../redux/userSlice'
import { FaPlus } from "react-icons/fa6"
import { FaUtensils } from "react-icons/fa"
import { TbReceipt2, TbLayoutDashboard } from "react-icons/tb"
import { MdOutlineLocalShipping } from "react-icons/md"
import { useNavigate, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Outfit:wght@400;500;600;700;800&display=swap');
.nav-root{position:fixed;top:0;left:0;right:0;z-index:9999;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);}
.nav-root.at-top{background:transparent;}
.nav-root.scrolled,.nav-root.solid{
  background:rgba(250,250,248,0.97);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  box-shadow:0 1px 0 rgba(244,123,31,0.1),0 4px 40px rgba(0,0,0,0.07);
}
.nav-inner{display:flex;align-items:center;gap:18px;padding:0 5%;height:72px;max-width:1440px;margin:0 auto;}
.nav-logo{display:flex;align-items:center;gap:11px;cursor:pointer;flex-shrink:0;text-decoration:none;}
.nav-logo-icon{
  width:44px;height:44px;border-radius:14px;
  background:linear-gradient(135deg,#F47B1F,#E8620A);
  display:flex;align-items:center;justify-content:center;
  font-size:21px;box-shadow:0 4px 16px rgba(244,123,31,0.45);
  transition:all 0.3s;
}
.nav-logo:hover .nav-logo-icon{transform:rotate(-8deg) scale(1.06);}
.nav-logo-text{display:flex;flex-direction:column;line-height:1;}
.nav-logo-name{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:#1C1507;letter-spacing:-0.3px;}
.nav-logo-sub{font-family:'Outfit',sans-serif;font-size:9px;color:#917850;letter-spacing:2.5px;text-transform:uppercase;margin-top:2px;}
.nav-search{
  flex:1;max-width:500px;display:flex;align-items:center;
  background:white;border:2px solid rgba(244,123,31,0.15);
  border-radius:18px;height:50px;overflow:hidden;
  box-shadow:0 2px 18px rgba(0,0,0,0.06);transition:all 0.25s;
}
.nav-search:focus-within{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1),0 2px 18px rgba(0,0,0,0.06);}
.nav-city{
  display:flex;align-items:center;gap:7px;padding:0 13px;
  border-right:2px solid rgba(244,123,31,0.1);height:100%;
  font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;
  color:#F47B1F;white-space:nowrap;min-width:110px;max-width:130px;
  overflow:hidden;text-overflow:ellipsis;
}
.nav-input{
  flex:1;padding:0 14px;font-family:'Outfit',sans-serif;
  font-size:14px;color:#1C1507;border:none;outline:none;background:transparent;
}
.nav-input::placeholder{color:#C4A07A;}
.nav-search-btn{
  background:linear-gradient(135deg,#F47B1F,#E8620A);
  color:white;border:none;height:100%;padding:0 18px;
  cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;
  transition:all 0.2s;white-space:nowrap;
}
.nav-search-btn:hover{background:linear-gradient(135deg,#E8620A,#C8500A);}
.nav-actions{display:flex;align-items:center;gap:10px;margin-left:auto;}
.nav-btn{
  display:flex;align-items:center;gap:7px;
  background:rgba(244,123,31,0.07);
  border:1.5px solid rgba(244,123,31,0.15);border-radius:14px;
  padding:9px 16px;cursor:pointer;color:#F47B1F;
  font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;
  transition:all 0.25s;white-space:nowrap;position:relative;
}
.nav-btn:hover{background:rgba(244,123,31,0.14);border-color:rgba(244,123,31,0.3);transform:translateY(-1px);}
.nav-cart-badge{
  position:absolute;top:-7px;right:-7px;
  width:20px;height:20px;border-radius:50%;
  background:linear-gradient(135deg,#F47B1F,#E8620A);
  color:white;font-size:10px;font-weight:900;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 8px rgba(244,123,31,0.5);
  animation:badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes badgePop{from{transform:scale(0);}to{transform:scale(1);}}
.nav-avatar{
  width:42px;height:42px;border-radius:14px;
  background:linear-gradient(135deg,#F47B1F,#E8620A);
  display:flex;align-items:center;justify-content:center;
  color:white;font-family:'Fraunces',serif;font-size:17px;font-weight:700;
  cursor:pointer;border:2px solid rgba(244,123,31,0.3);
  box-shadow:0 3px 14px rgba(244,123,31,0.35);
  transition:all 0.25s;position:relative;
}
.nav-avatar:hover{transform:scale(1.07);}
.nav-dropdown{
  position:absolute;top:calc(100% + 12px);right:0;
  background:white;border-radius:20px;min-width:220px;
  box-shadow:0 20px 60px rgba(0,0,0,0.18),0 0 0 1px rgba(244,123,31,0.08);
  padding:8px;z-index:1000;
  animation:dropIn 0.2s cubic-bezier(0.16,1,0.3,1);
}
@keyframes dropIn{from{opacity:0;transform:translateY(-8px) scale(0.96);}to{opacity:1;transform:translateY(0) scale(1);}}
.nav-dd-item{
  display:flex;align-items:center;gap:11px;padding:11px 14px;
  border-radius:14px;cursor:pointer;transition:all 0.2s;
  font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;color:#1C1507;
}
.nav-dd-item:hover{background:rgba(244,123,31,0.07);}
.nav-dd-item.danger{color:#dc2626;}
.nav-dd-item.danger:hover{background:rgba(220,38,38,0.07);}
.nav-dd-divider{height:1px;background:rgba(244,123,31,0.08);margin:5px 0;}
.nav-dd-user{padding:12px 14px 10px;border-bottom:1px solid rgba(244,123,31,0.08);margin-bottom:5px;}
.nav-dd-user-name{font-family:'Fraunces',serif;font-size:15px;font-weight:700;color:#1C1507;}
.nav-dd-user-email{font-size:12px;color:#917850;margin-top:2px;}
.nav-mobile-toggle{display:none;background:rgba(244,123,31,0.08);border:1.5px solid rgba(244,123,31,0.15);border-radius:12px;padding:9px;cursor:pointer;color:#F47B1F;transition:all 0.2s;}
.nav-mobile-toggle:hover{background:rgba(244,123,31,0.15);}
.nav-mobile-menu{
  display:none;position:fixed;inset:0;z-index:9998;
  background:rgba(28,21,7,0.7);backdrop-filter:blur(4px);
}
.nav-mobile-panel{
  position:absolute;top:0;right:0;bottom:0;width:300px;max-width:90vw;
  background:white;padding:24px 20px;overflow-y:auto;
  animation:slideIn 0.3s cubic-bezier(0.16,1,0.3,1);
}
@keyframes slideIn{from{transform:translateX(100%);}to{transform:translateX(0);}}
.nav-mobile-menu.open{display:block;}
@media(max-width:900px){
  .nav-search{display:none;}
  .nav-actions .nav-btn:not(.cart-btn){display:none;}
}
@media(max-width:640px){.nav-mobile-toggle{display:flex;}}
`

function Nav() {
  const { userData, cartItems, currentCity } = useSelector(s => s.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const [showDrop, setShowDrop] = useState(false)
  const [showMobile, setShowMobile] = useState(false)
  const dropRef = useRef()

  const isOnHeroPage = ['/', '/home'].includes(location.pathname) || location.pathname === '/'
  const isSolidPage = !['/'].includes(location.pathname)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDrop(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return dispatch(setSearchItems([]))
    try {
      const { data } = await axios.get(`${serverUrl}/api/item/search?q=${query}&city=${currentCity}`, { withCredentials: true })
      dispatch(setSearchItems(data))
    } catch (e) { console.log(e) }
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
      dispatch(setUserData(null))
      navigate('/landing')
    } catch (e) { console.log(e) }
  }

  const cartCount = cartItems?.reduce((a, b) => a + b.quantity, 0) || 0
  const initial = userData?.fullName?.[0]?.toUpperCase() || '?'

  const navLinks = userData?.role === 'owner'
    ? [{ icon: <TbLayoutDashboard size={16} />, label: 'Dashboard', path: '/' }, { icon: <FaPlus size={14} />, label: 'Add Item', path: '/add-item' }, { icon: <TbReceipt2 size={16} />, label: 'Orders', path: '/my-orders' }]
    : userData?.role === 'deliveryBoy'
    ? [{ icon: <MdOutlineLocalShipping size={16} />, label: 'Deliveries', path: '/' }]
    : [{ icon: <FaUtensils size={14} />, label: 'Explore', path: '/' }, { icon: <TbReceipt2 size={16} />, label: 'Orders', path: '/my-orders' }]

  return (
    <>
      <style>{CSS}</style>
      <nav className={`nav-root ${scrolled ? 'scrolled' : isSolidPage ? 'solid' : 'at-top'}`}>
        <div className="nav-inner">
          <BrandLogo size="md" theme="light" tagline="Network" onClick={() => navigate('/')} style={{ flexShrink: 0 }} />

          {/* Search */}
          <div className="nav-search">
            <div className="nav-city">
              <FaLocationDot size={12} color="#F47B1F" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentCity || 'Locating...'}</span>
            </div>
            <input className="nav-input" placeholder="Search dishes, restaurants..." value={query}
              onChange={e => { setQuery(e.target.value); if (!e.target.value.trim()) dispatch(setSearchItems([])) }}
              onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            <button className="nav-search-btn" onClick={handleSearch}><IoIosSearch size={18} /></button>
          </div>

          <div className="nav-actions">
            {navLinks.map(l => (
              <button key={l.path} className="nav-btn" style={{ background: location.pathname === l.path ? 'rgba(244,123,31,0.14)' : undefined, borderColor: location.pathname === l.path ? 'rgba(244,123,31,0.3)' : undefined }} onClick={() => navigate(l.path)}>
                {l.icon}{l.label}
              </button>
            ))}

            {userData?.role === 'user' && (
              <button className="nav-btn cart-btn" onClick={() => navigate('/cart')} style={{ padding: '9px 16px' }}>
                <FiShoppingCart size={17} />
                Cart
                {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
              </button>
            )}

            <div style={{ position: 'relative' }} ref={dropRef}>
              <div className="nav-avatar" onClick={() => setShowDrop(!showDrop)}>{initial}</div>
              {showDrop && (
                <div className="nav-dropdown">
                  <div className="nav-dd-user">
                    <div className="nav-dd-user-name">{userData?.fullName}</div>
                    <div className="nav-dd-user-email">{userData?.email}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(244,123,31,0.1)', borderRadius: 8, padding: '3px 10px', fontSize: 11, color: '#F47B1F', fontWeight: 700, marginTop: 6 }}>
                      {userData?.role === 'owner' ? '🍳 Restaurant Owner' : userData?.role === 'deliveryBoy' ? '🛵 Delivery Partner' : '🛒 Customer'}
                    </div>
                  </div>
                  {navLinks.map(l => (
                    <div key={l.path} className="nav-dd-item" onClick={() => { navigate(l.path); setShowDrop(false) }}>
                      {l.icon}{l.label}
                    </div>
                  ))}
                  {userData?.role === 'user' && (
                    <div className="nav-dd-item" onClick={() => { navigate('/cart'); setShowDrop(false) }}>
                      <FiShoppingCart size={16} />Cart {cartCount > 0 && `(${cartCount})`}
                    </div>
                  )}
                  <div className="nav-dd-divider" />
                  <div className="nav-dd-item danger" onClick={handleLogout}>
                    <span style={{ fontSize: 16 }}>👋</span>Sign Out
                  </div>
                </div>
              )}
            </div>

            <button className="nav-mobile-toggle" onClick={() => setShowMobile(true)}><FiMenu size={20} /></button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${showMobile ? 'open' : ''}`} onClick={() => setShowMobile(false)}>
        <div className="nav-mobile-panel" onClick={e => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: '#1C1507' }}>Menu</div>
            <button onClick={() => setShowMobile(false)} style={{ background: 'rgba(244,123,31,0.08)', border: '1.5px solid rgba(244,123,31,0.15)', borderRadius: 12, padding: 9, cursor: 'pointer', color: '#F47B1F' }}><FiX size={18} /></button>
          </div>
          {/* Search in mobile */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input style={{ flex: 1, border: '2px solid rgba(244,123,31,0.2)', borderRadius: 14, padding: '11px 14px', fontFamily: "'Outfit',sans-serif", fontSize: 14, color: '#1C1507', outline: 'none', background: '#FAFAF8' }}
              placeholder="Search food..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            <button onClick={handleSearch} style={{ background: 'linear-gradient(135deg,#F47B1F,#E8620A)', color: 'white', border: 'none', borderRadius: 14, padding: '0 16px', cursor: 'pointer', fontSize: 18 }}><IoIosSearch /></button>
          </div>
          {navLinks.map(l => (
            <div key={l.path} className="nav-dd-item" style={{ marginBottom: 4 }} onClick={() => { navigate(l.path); setShowMobile(false) }}>
              {l.icon}{l.label}
            </div>
          ))}
          {userData?.role === 'user' && (
            <div className="nav-dd-item" style={{ marginBottom: 4 }} onClick={() => { navigate('/cart'); setShowMobile(false) }}>
              <FiShoppingCart size={16} />Cart {cartCount > 0 && `(${cartCount})`}
            </div>
          )}
          <div className="nav-dd-divider" style={{ margin: '12px 0' }} />
          <div className="nav-dd-item danger" onClick={handleLogout}>
            <span>👋</span>Sign Out
          </div>
        </div>
      </div>
    </>
  )
}
export default Nav
