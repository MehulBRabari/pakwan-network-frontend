import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import UserOrderCard from '../components/UserOrderCard'
import OwnerOrderCard from '../components/OwnerOrderCard'
import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice'
import Nav from '../components/Nav'
import { FaClipboardList, FaFilter } from 'react-icons/fa'
import { TbChefHat } from 'react-icons/tb'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.mo{min-height:100vh;background:#FAFAF8;padding-top:72px;font-family:'Outfit',sans-serif;}
.mo-hero{background:linear-gradient(145deg,#1C1507 0%,#2E1E08 55%,#3d2610 100%);padding:56px 5% 48px;position:relative;overflow:hidden;}
.mo-hero-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.08) 1px,transparent 0);background-size:28px 28px;}
.mo-hero-orb{position:absolute;top:-15%;right:-5%;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(244,123,31,0.18),transparent 65%);pointer-events:none;}
.mo-hero-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1;}
.mo-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(244,123,31,0.15);border:1px solid rgba(244,123,31,0.3);border-radius:50px;padding:6px 16px;font-size:12px;color:#FAA040;font-weight:700;margin-bottom:18px;}
.mo-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,4vw,2.8rem);font-weight:700;color:#FAFAF8;letter-spacing:-1px;margin-bottom:8px;}
.mo-title span{color:#F47B1F;font-style:italic;}
.mo-sub{color:rgba(250,250,248,0.5);font-size:14px;}
/* STATS BAR */
.mo-stats{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px;}
.mo-stat{background:rgba(244,123,31,0.1);border:1px solid rgba(244,123,31,0.2);border-radius:16px;padding:12px 20px;display:flex;align-items:center;gap:10px;}
.mo-stat-val{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#F47B1F;}
.mo-stat-label{font-size:11px;color:rgba(250,250,248,0.5);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;}
/* BODY */
.mo-body{max-width:960px;margin:0 auto;padding:36px 5% 72px;}
.mo-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
.mo-section-title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:#1C1507;}
.mo-section-title span{color:#F47B1F;}
.mo-filter-tabs{display:flex;gap:8px;flex-wrap:wrap;}
.mo-tab{padding:8px 18px;border-radius:50px;border:2px solid;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;}
.mo-orders-list{display:flex;flex-direction:column;gap:18px;}
.mo-empty{background:white;border-radius:28px;padding:72px 40px;text-align:center;box-shadow:0 4px 28px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.07);}
.mo-back-btn{display:inline-flex;align-items:center;gap:6px;background:rgba(244,123,31,0.08);border:1.5px solid rgba(244,123,31,0.2);border-radius:13px;padding:9px 18px;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:#F47B1F;transition:all 0.2s;}
.mo-back-btn:hover{background:rgba(244,123,31,0.14);}
`

const STATUS_FILTERS_USER = ['All', 'Pending', 'Preparing', 'Out For Delivery', 'Delivered']
const STATUS_FILTERS_OWNER = ['All', 'Pending', 'Preparing', 'Out For Delivery', 'Delivered']

function MyOrders() {
  const { userData, myOrders, socket } = useSelector(s => s.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    socket?.on('newOrder', (data) => {
      if (data.shopOrders?.owner._id == userData._id) dispatch(setMyOrders([data, ...myOrders]))
    })
    socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId == userData._id) dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }))
    })
    return () => { socket?.off('newOrder'); socket?.off('update-status') }
  }, [socket])

  const isOwner = userData?.role === 'owner'

  const getStatus = (o) => {
    if (Array.isArray(o.shopOrders)) return o.shopOrders?.[0]?.status
    return o.shopOrders?.status
  }

  const filteredOrders = filter === 'All' ? myOrders : myOrders?.filter(o => {
    const st = getStatus(o)
    return st?.toLowerCase().includes(filter.toLowerCase())
  })

  const pendingCount = myOrders?.filter(o => getStatus(o) === 'pending').length || 0
  const deliveredCount = myOrders?.filter(o => getStatus(o) === 'delivered').length || 0

  return (
    <div className="mo">
      <style>{S}</style>
      <Nav />
      <section className="mo-hero">
        <div className="mo-hero-grid" /><div className="mo-hero-orb" />
        <div className="mo-hero-inner">
          <div className="mo-badge">{isOwner ? <TbChefHat size={13} /> : <FaClipboardList size={11} />}{isOwner ? 'Restaurant Dashboard' : 'My Orders'}</div>
          <h1 className="mo-title">
            {isOwner ? <>Incoming <span>Orders</span></> : <>My <span>Orders</span></>}
          </h1>
          <p className="mo-sub">{isOwner ? 'Manage and track your restaurant orders in real-time.' : `${myOrders?.length || 0} total orders placed`}</p>
          <div className="mo-stats">
            {[
              { v: myOrders?.length || 0, l: 'Total Orders' },
              { v: pendingCount, l: 'Pending' },
              { v: deliveredCount, l: 'Delivered' }
            ].map(s => (
              <div key={s.l} className="mo-stat">
                <div><div className="mo-stat-val">{s.v}</div><div className="mo-stat-label">{s.l}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mo-body">
        <div className="mo-toolbar">
          <div className="mo-section-title">Order <span>History</span></div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="mo-back-btn" onClick={() => navigate('/')}><IoIosArrowRoundBack size={18} />Back</button>
            <div className="mo-filter-tabs">
              {STATUS_FILTERS_USER.map(f => (
                <button key={f} className="mo-tab" onClick={() => setFilter(f)}
                  style={{ background: filter === f ? 'linear-gradient(135deg,#F47B1F,#E8620A)' : 'white', color: filter === f ? 'white' : '#917850', borderColor: filter === f ? '#F47B1F' : 'rgba(0,0,0,0.1)', boxShadow: filter === f ? '0 4px 14px rgba(244,123,31,0.3)' : 'none' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredOrders?.length > 0 ? (
          <div className="mo-orders-list">
            {filteredOrders.map((o, i) => isOwner ? <OwnerOrderCard key={i} data={o} /> : <UserOrderCard key={i} data={o} />)}
          </div>
        ) : (
          <div className="mo-empty">
            <div style={{ fontSize: 64, marginBottom: 16 }}>{isOwner ? '🍳' : '📦'}</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700, color: '#1C1507', marginBottom: 10 }}>
              {filter !== 'All' ? `No ${filter} orders` : isOwner ? 'No orders yet' : 'No orders placed yet'}
            </div>
            <div style={{ fontSize: 14, color: '#917850', marginBottom: 28 }}>
              {isOwner ? 'Orders will appear here when customers place them.' : "Time to order something delicious!"}
            </div>
            {!isOwner && (
              <button onClick={() => navigate('/')} style={{ background: 'linear-gradient(135deg,#F47B1F,#E8620A)', color: 'white', border: 'none', borderRadius: 16, padding: '14px 32px', fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 5px 20px rgba(244,123,31,0.4)' }}>
                Explore Restaurants 🍽️
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default MyOrders
