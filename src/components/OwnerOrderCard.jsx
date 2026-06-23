import axios from 'axios'
import React, { useState } from 'react'
import { MdPhone } from "react-icons/md"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { updateOrderStatus } from '../redux/userSlice'
import { FaClock } from "react-icons/fa"

const STATUS_COLOR = { pending: '#f59e0b', preparing: '#F47B1F', 'out of delivery': '#3b82f6', delivered: '#22c55e' }
const STATUS_ICONS = { pending: '⏳', preparing: '👨‍🍳', 'out of delivery': '🛵', delivered: '✅' }

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.ooc{background:white;border-radius:22px;overflow:hidden;box-shadow:0 4px 22px rgba(0,0,0,0.08);border:2px solid rgba(244,123,31,0.08);font-family:'Outfit',sans-serif;transition:all 0.3s;}
.ooc:hover{box-shadow:0 8px 32px rgba(0,0,0,0.12);}
.ooc-hd{padding:18px 20px;background:linear-gradient(135deg,rgba(244,123,31,0.05),rgba(232,98,10,0.02));border-bottom:1px solid rgba(244,123,31,0.08);}
.ooc-body{padding:18px 20px;}
.ooc-items{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;margin-bottom:14px;scrollbar-width:thin;}
.ooc-item{flex-shrink:0;text-align:center;}
.ooc-item img{width:76px;height:62px;object-fit:cover;border-radius:12px;margin-bottom:5px;border:1.5px solid rgba(244,123,31,0.1);}
.ooc-item-img-fallback{width:76px;height:62px;border-radius:12px;background:#FEF6EC;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:5px;border:1.5px solid rgba(244,123,31,0.1);}
.ooc-item-name{font-size:10px;font-weight:700;color:#4a3728;width:76px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ooc-footer{padding:14px 20px;border-top:1px solid rgba(244,123,31,0.08);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:rgba(250,250,248,0.6);}
.ooc-select{border:1.5px solid rgba(244,123,31,0.25);border-radius:12px;padding:9px 14px;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:#F47B1F;background:rgba(244,123,31,0.05);outline:none;cursor:pointer;transition:all 0.2s;}
.ooc-select:focus{border-color:#F47B1F;box-shadow:0 0 0 3px rgba(244,123,31,0.1);}
.ooc-driver-box{background:linear-gradient(135deg,rgba(244,123,31,0.06),rgba(232,98,10,0.03));border:1.5px solid rgba(244,123,31,0.15);border-radius:14px;padding:12px 16px;display:flex;align-items:center;gap:12px;margin-top:12px;}
.ooc-status-pill{display:inline-flex;align-items:center;gap:6px;border-radius:50px;padding:5px 14px;font-size:11px;font-weight:800;border:1.5px solid;}
`

function OwnerOrderCard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([])
  const [currentStatus, setCurrentStatus] = useState(null)
  const dispatch = useDispatch()

  // data is the full order object; shopOrders is a single object for owner (filtered by backend)
  const shopOrder = data?.shopOrders
  const st = currentStatus || shopOrder?.status

  const handleUpdateStatus = async (status) => {
    if (!data?._id || !shopOrder?.shop?._id) return
    try {
      const r = await axios.post(
        `${serverUrl}/api/order/update-status/${data._id}/${shopOrder.shop._id}`,
        { status },
        { withCredentials: true }
      )
      setCurrentStatus(status)
      dispatch(updateOrderStatus({ orderId: data._id, shopId: shopOrder.shop._id, status }))
      if (r.data.availableBoys) setAvailableBoys(r.data.availableBoys)
    } catch (e) { console.log(e) }
  }

  if (!shopOrder) return null

  const formatDate = (d) => new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="ooc">
      <style>{S}</style>

      {/* Header */}
      <div className="ooc-hd">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 17, color: '#1C1507' }}>
              {data.user?.fullName || 'Customer'}
            </div>
            <div style={{ fontSize: 12, color: '#917850', marginTop: 3, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {data.user?.email && <span>✉ {data.user.email}</span>}
              {data.user?.mobile && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MdPhone size={12} />{data.user.mobile}
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: '#917850', marginTop: 4 }}>
              🕐 {data.createdAt ? formatDate(data.createdAt) : ''}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="ooc-status-pill" style={{
              background: `${STATUS_COLOR[st] || '#917850'}15`,
              color: STATUS_COLOR[st] || '#917850',
              borderColor: `${STATUS_COLOR[st] || '#917850'}30`
            }}>
              <span>{STATUS_ICONS[st] || '📦'}</span>
              <span style={{ textTransform: 'capitalize' }}>{st || 'pending'}</span>
            </div>
            <div style={{
              background: data.paymentMethod === 'online' ? 'rgba(99,102,241,0.1)' : 'rgba(34,197,94,0.1)',
              color: data.paymentMethod === 'online' ? '#6366f1' : '#16a34a',
              borderRadius: 8, padding: '4px 10px', fontSize: 10, fontWeight: 800
            }}>
              {data.paymentMethod === 'online' ? `💳 ${data.payment ? 'Paid' : 'Pending'}` : '💵 COD'}
            </div>
          </div>
        </div>
        {data.deliveryAddress?.text && (
          <div style={{ marginTop: 10, fontSize: 13, color: '#917850', background: 'rgba(244,123,31,0.05)', borderRadius: 10, padding: '8px 12px' }}>
            📍 {data.deliveryAddress.text}
          </div>
        )}
      </div>

      {/* Items */}
      <div className="ooc-body">
        <div style={{ fontSize: 11, fontWeight: 700, color: '#917850', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Items Ordered · {shopOrder.shopOrderItems?.length || 0} items
        </div>
        <div className="ooc-items">
          {shopOrder.shopOrderItems?.map((item, i) => (
            <div className="ooc-item" key={i}>
              {item?.item?.image
                ? <img src={item.item.image} alt={item.name} />
                : <div className="ooc-item-img-fallback">🍽️</div>
              }
              <div className="ooc-item-name">{item.name}</div>
              <div style={{ fontSize: 10, color: '#917850' }}>x{item.quantity} · ₹{item.price}</div>
            </div>
          ))}
        </div>

        {/* Delivery Boy Info */}
        {st === 'out of delivery' && (
          <div className="ooc-driver-box">
            {shopOrder.assignedDeliveryBoy ? (
              <>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#F47B1F,#E8620A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {shopOrder.assignedDeliveryBoy.fullName?.[0] || '🛵'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#1C1507' }}>{shopOrder.assignedDeliveryBoy.fullName}</div>
                  <div style={{ fontSize: 12, color: '#917850', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <MdPhone size={11} />{shopOrder.assignedDeliveryBoy.mobile}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700, background: 'rgba(34,197,94,0.1)', borderRadius: 8, padding: '4px 10px' }}>✓ Assigned</div>
              </>
            ) : availableBoys?.length > 0 ? (
              <div style={{ width: '100%' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#917850', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Available Delivery Partners</div>
                {availableBoys.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < availableBoys.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(244,123,31,0.15),rgba(232,98,10,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F47B1F', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                      {b.fullName?.[0] || '?'}
                    </div>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: '#1C1507' }}>{b.fullName}</div>
                    <div style={{ fontSize: 12, color: '#917850' }}>{b.mobile}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: '#a16207', fontWeight: 600 }}>
                <FaClock size={14} />Waiting for delivery partner to accept...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="ooc-footer">
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 700, color: '#1C1507' }}>
          Total: <span style={{ color: '#F47B1F' }}>₹{shopOrder.subtotal}</span>
        </div>
        {st !== 'delivered' && (
          <select
            className="ooc-select"
            onChange={e => e.target.value && handleUpdateStatus(e.target.value)}
            value=""
          >
            <option value="">Update Status</option>
            {st === 'pending' && <option value="preparing">👨‍🍳 Preparing</option>}
            {(st === 'pending' || st === 'preparing') && <option value="out of delivery">🛵 Out for Delivery</option>}
          </select>
        )}
        {st === 'delivered' && (
          <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
            ✅ Order Delivered
          </div>
        )}
      </div>
    </div>
  )
}
export default OwnerOrderCard
