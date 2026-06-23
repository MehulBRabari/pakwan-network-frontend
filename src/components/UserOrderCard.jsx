import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { FaStar } from "react-icons/fa"
import { MdOutlineTrackChanges } from "react-icons/md"

const STATUS_COLOR = { pending: '#f59e0b', preparing: '#F47B1F', 'out of delivery': '#3b82f6', delivered: '#22c55e' }
const STATUS_ICONS = { pending: '⏳', preparing: '👨‍🍳', 'out of delivery': '🛵', delivered: '✅' }

const S = `
.uoc{background:white;border-radius:22px;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,0.09);border:2px solid rgba(244,123,31,0.08);font-family:'Outfit',sans-serif;transition:all 0.3s;border-radius:22px;}
.uoc:hover{box-shadow:0 8px 32px rgba(0,0,0,0.12);}
.uoc-hd{padding:18px 20px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,rgba(244,123,31,0.04),rgba(232,98,10,0.02));border-bottom:1px solid rgba(244,123,31,0.08);}
.uoc-body{padding:16px 20px;}
.uoc-shop{padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.05);}
.uoc-shop:last-child{border-bottom:none;}
.uoc-shop-name{font-weight:800;font-size:14px;color:#1C1507;margin-bottom:8px;}
.uoc-item-row{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px;}
.uoc-item{flex-shrink:0;width:90px;text-align:center;}
.uoc-item img{width:80px;height:65px;object-fit:cover;border-radius:12px;margin-bottom:6px;}
.uoc-item-name{font-size:10px;font-weight:600;color:#4a3728;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.uoc-item-price{font-size:10px;color:#917850;margin-top:2px;}
.uoc-stars{display:flex;gap:3px;justify-content:center;margin-top:6px;}
.uoc-footer{padding:14px 20px;background:rgba(250,250,248,0.7);border-top:1px solid rgba(244,123,31,0.08);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.uoc-track-btn{display:flex;align-items:center;gap:7px;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:12px;padding:9px 18px;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 3px 12px rgba(244,123,31,0.38);transition:all 0.25s;}
.uoc-track-btn:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(244,123,31,0.48);}
.uoc-status-pill{display:inline-flex;align-items:center;gap:6px;border-radius:50px;padding:5px 14px;font-size:11px;font-weight:800;border:1.5px solid;}
`

function UserOrderCard({ data }) {
  const navigate = useNavigate()
  const [selectedRating, setSelectedRating] = useState({})

  // shopOrders is an array for user role
  const shopOrdersArr = Array.isArray(data.shopOrders) ? data.shopOrders : [data.shopOrders].filter(Boolean)
  const latestStatus = shopOrdersArr?.[0]?.status

  const handleRating = async (itemId, rating) => {
    if (!itemId) return
    try {
      await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating }, { withCredentials: true })
      setSelectedRating(p => ({ ...p, [itemId]: rating }))
    } catch (e) { console.log(e) }
  }

  const formatDate = (d) => new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="uoc">
      <style>{S}</style>
      <div className="uoc-hd">
        <div>
          <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 16, color: '#1C1507' }}>Order #{data._id.slice(-8).toUpperCase()}</div>
          <div style={{ fontSize: 12, color: '#917850', marginTop: 2 }}>{formatDate(data.createdAt)}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="uoc-status-pill" style={{ background: `${STATUS_COLOR[latestStatus] || '#917850'}15`, color: STATUS_COLOR[latestStatus] || '#917850', borderColor: `${STATUS_COLOR[latestStatus] || '#917850'}30` }}>
            <span>{STATUS_ICONS[latestStatus] || '📦'}</span>
            <span style={{ textTransform: 'capitalize' }}>{latestStatus || 'pending'}</span>
          </div>
          <div style={{ background: data.paymentMethod === 'online' ? 'rgba(99,102,241,0.1)' : 'rgba(34,197,94,0.1)', color: data.paymentMethod === 'online' ? '#6366f1' : '#16a34a', borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 800 }}>
            {data.paymentMethod === 'online' ? '💳 Online' : '💵 COD'}
          </div>
        </div>
      </div>

      <div className="uoc-body">
        {shopOrdersArr.map((shopOrder, i) => (
          <div className="uoc-shop" key={i}>
            <div className="uoc-shop-name">🏪 {shopOrder?.shop?.name || 'Restaurant'}</div>
            <div className="uoc-item-row">
              {shopOrder?.shopOrderItems?.map((item, j) => (
                <div className="uoc-item" key={j}>
                  {item?.item?.image
                    ? <img src={item.item.image} alt={item.name} />
                    : <div style={{ width: 80, height: 65, borderRadius: 12, background: '#FEF6EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🍽️</div>
                  }
                  <div className="uoc-item-name">{item.name}</div>
                  <div className="uoc-item-price">x{item.quantity} · ₹{item.price}</div>
                  {shopOrder.status === 'delivered' && item?.item?._id && (
                    <div className="uoc-stars">
                      {[1, 2, 3, 4, 5].map(s => (
                        <FaStar key={s} size={12} color={selectedRating[item.item._id] >= s ? '#F47B1F' : '#e5e7eb'} style={{ cursor: 'pointer' }} onClick={() => handleRating(item.item._id, s)} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 13 }}>
              <span style={{ color: '#917850' }}>Subtotal</span>
              <span style={{ fontWeight: 800, color: '#1C1507' }}>₹{shopOrder.subtotal}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="uoc-footer">
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, color: '#1C1507' }}>Total: <span style={{ color: '#F47B1F' }}>₹{data.totalAmount}</span></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="uoc-track-btn" onClick={() => navigate(`/invoice/${data._id}`)} style={{ background: 'rgba(244,123,31,0.08)', color: '#F47B1F', boxShadow: 'none', border: '1.5px solid rgba(244,123,31,0.25)' }}>
            🧾 Invoice
          </button>
          <button className="uoc-track-btn" onClick={() => navigate(`/track-order/${data._id}`)}>
            <MdOutlineTrackChanges size={16} />Track Order
          </button>
        </div>
      </div>
    </div>
  )
}
export default UserOrderCard
