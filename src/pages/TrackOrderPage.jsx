import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { IoIosArrowRoundBack } from "react-icons/io"
import { MdDeliveryDining, MdPhone } from "react-icons/md"
import { FaStore, FaCheckCircle, FaClock, FaFire } from "react-icons/fa"
import DeliveryBoyTracking from '../components/DeliveryBoyTracking'
import { useSelector } from 'react-redux'
import Nav from '../components/Nav'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.to-wrap{min-height:100vh;background:linear-gradient(160deg,#FAFAF8 0%,#FEF6EC 60%,#FAFAF8 100%);padding-top:80px;font-family:'Outfit',sans-serif;}
.to-container{max-width:900px;margin:0 auto;padding:32px 5% 60px;}
.to-hd{display:flex;align-items:center;gap:14px;margin-bottom:32px;}
.to-back{background:rgba(244,123,31,0.08);border:1.5px solid rgba(244,123,31,0.2);border-radius:13px;padding:10px 14px;cursor:pointer;display:flex;align-items:center;color:#F47B1F;transition:all 0.2s;}
.to-back:hover{background:rgba(244,123,31,0.15);}
.to-card{background:white;border-radius:22px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:1px solid rgba(244,123,31,0.08);margin-bottom:20px;}
.to-shop-name{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#F47B1F;margin-bottom:4px;}
.to-status-bar{display:flex;gap:0;margin:20px 0;}
.to-step{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;}
.to-step::after{content:'';position:absolute;top:18px;left:50%;right:-50%;height:3px;background:rgba(0,0,0,0.08);z-index:0;}
.to-step:last-child::after{display:none;}
.to-step-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:1;font-size:14px;border:3px solid transparent;transition:all 0.3s;}
.to-step-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-top:8px;text-align:center;color:#917850;}
.to-driver-card{background:linear-gradient(135deg,rgba(244,123,31,0.06),rgba(232,98,10,0.03));border:1.5px solid rgba(244,123,31,0.15);border-radius:16px;padding:16px;display:flex;align-items:center;gap:14px;margin-top:16px;}
.to-driver-avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0;}
`

const STATUS_STEPS = ['pending', 'preparing', 'out of delivery', 'delivered']
const STATUS_ICONS = { pending: '⏳', preparing: '👨‍🍳', 'out of delivery': '🛵', delivered: '✅' }
const STATUS_LABELS = { pending: 'Pending', preparing: 'Preparing', 'out of delivery': 'Out for Delivery', delivered: 'Delivered' }

function TrackOrderPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()
  const { socket } = useSelector(s => s.user)
  const [liveLocations, setLiveLocations] = useState({})

  const loadOrder = React.useCallback(async () => {
    try {
      const r = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
      setOrder(r.data)
    } catch (e) {
      console.log(e)
    }
  }, [orderId])

  useEffect(() => { loadOrder() }, [loadOrder])

  useEffect(() => {
    if (!socket) return

    const handleLocation = ({ deliveryBoyId, latitude, longitude }) => {
      setLiveLocations(p => ({ ...p, [deliveryBoyId]: { lat: Number(latitude), lon: Number(longitude) } }))
    }

    const handleStatus = ({ orderId: changedOrderId, shopId, status }) => {
      if (String(changedOrderId) !== String(orderId)) return
      setOrder(prev => {
        if (!prev?.shopOrders) return prev
        return {
          ...prev,
          shopOrders: prev.shopOrders.map(so =>
            String(so.shop?._id || so.shop) === String(shopId) ? { ...so, status } : so
          )
        }
      })
    }

    const handleAssignment = ({ orderId: changedOrderId }) => {
      if (String(changedOrderId) === String(orderId)) loadOrder()
    }

    socket.on('updateDeliveryLocation', handleLocation)
    socket.on('update-status', handleStatus)
    socket.on('deliveryBoyAssigned', handleAssignment)

    return () => {
      socket.off('updateDeliveryLocation', handleLocation)
      socket.off('update-status', handleStatus)
      socket.off('deliveryBoyAssigned', handleAssignment)
    }
  }, [socket, orderId, loadOrder])

  const getStepStatus = (step, currentStatus) => {
    const stepIdx = STATUS_STEPS.indexOf(step)
    const currentIdx = STATUS_STEPS.indexOf(currentStatus)
    if (stepIdx < currentIdx) return 'done'
    if (stepIdx === currentIdx) return 'active'
    return 'pending'
  }

  return (
    <div className="to-wrap">
      <style>{S}</style>
      <Nav />
      <div className="to-container">
        <div className="to-hd">
          <button className="to-back" onClick={() => navigate('/my-orders')}><IoIosArrowRoundBack size={22} /></button>
          <div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700, color: '#1C1507', letterSpacing: -0.5 }}>Track Order</h1>
            <p style={{ color: '#917850', fontSize: 13, marginTop: 2 }}>Order #{orderId?.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        {order?.shopOrders?.map((shopOrder, i) => {
          const statusIdx = STATUS_STEPS.indexOf(shopOrder.status)
          return (
            <div className="to-card" key={i}>
              {/* Shop Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,rgba(244,123,31,0.1),rgba(232,98,10,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FaStore color="#F47B1F" size={18} />
                </div>
                <div>
                  <div className="to-shop-name">{shopOrder.shop.name}</div>
                  <div style={{ fontSize: 12, color: '#917850' }}>{shopOrder.shopOrderItems?.map(i => i.name).join(', ')}</div>
                </div>
                <div style={{ marginLeft: 'auto', background: shopOrder.status === 'delivered' ? 'rgba(34,197,94,0.1)' : 'rgba(244,123,31,0.1)', color: shopOrder.status === 'delivered' ? '#16a34a' : '#F47B1F', borderRadius: 50, padding: '5px 14px', fontSize: 11, fontWeight: 800, border: `1px solid ${shopOrder.status === 'delivered' ? 'rgba(34,197,94,0.3)' : 'rgba(244,123,31,0.3)'}` }}>
                  {STATUS_LABELS[shopOrder.status] || shopOrder.status}
                </div>
              </div>

              {/* Status Timeline */}
              <div className="to-status-bar">
                {STATUS_STEPS.map(step => {
                  const st = getStepStatus(step, shopOrder.status)
                  return (
                    <div className="to-step" key={step}>
                      <div className="to-step-dot" style={{ background: st === 'done' ? '#22c55e' : st === 'active' ? '#F47B1F' : '#f3f4f6', border: st === 'active' ? '3px solid rgba(244,123,31,0.3)' : 'none', boxShadow: st === 'active' ? '0 0 0 4px rgba(244,123,31,0.15)' : 'none' }}>
                        <span>{STATUS_ICONS[step]}</span>
                      </div>
                      <div className="to-step-label" style={{ color: st === 'active' ? '#F47B1F' : st === 'done' ? '#22c55e' : '#917850' }}>{STATUS_LABELS[step]}</div>
                    </div>
                  )
                })}
              </div>

              {/* Delivery Address */}
              <div style={{ background: 'rgba(244,123,31,0.05)', borderRadius: 12, padding: '12px 14px', marginBottom: 16, fontSize: 13, color: '#917850' }}>
                📍 <strong style={{ color: '#1C1507' }}>Delivery Address:</strong> {order.deliveryAddress?.text}
              </div>

              {/* Driver Info */}
              {shopOrder.status !== 'delivered' && (
                shopOrder.assignedDeliveryBoy ? (
                  <div className="to-driver-card">
                    <div className="to-driver-avatar">{shopOrder.assignedDeliveryBoy.fullName[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: '#1C1507', fontSize: 15 }}>{shopOrder.assignedDeliveryBoy.fullName}</div>
                      <div style={{ fontSize: 12, color: '#917850', marginTop: 2 }}>Your Delivery Partner</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(244,123,31,0.1)', border: '1.5px solid rgba(244,123,31,0.2)', borderRadius: 12, padding: '9px 14px', color: '#F47B1F', fontWeight: 700, fontSize: 13 }}>
                      <MdPhone size={15} />{shopOrder.assignedDeliveryBoy.mobile}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#a16207', fontWeight: 600 }}>
                    <FaClock size={14} />Waiting for a delivery partner to accept your order...
                  </div>
                )
              )}
              {shopOrder.status === 'delivered' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '14px 16px', fontSize: 14, color: '#16a34a', fontWeight: 700 }}>
                  <FaCheckCircle size={16} />Order Delivered Successfully! Enjoy your meal 🎉
                </div>
              )}

              {/* Live Map */}
              {shopOrder.assignedDeliveryBoy && shopOrder.status !== 'delivered' && (
                <div style={{ marginTop: 20 }}>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 700, color: '#1C1507', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />Live Tracking
                  </h3>
                  <div style={{ borderRadius: 18, overflow: 'hidden', border: '1.5px solid rgba(244,123,31,0.15)' }}>
                    <DeliveryBoyTracking data={{
                      deliveryBoyLocation: liveLocations[shopOrder.assignedDeliveryBoy._id] || {
                        lat: shopOrder.assignedDeliveryBoy.location?.coordinates?.[1],
                        lon: shopOrder.assignedDeliveryBoy.location?.coordinates?.[0]
                      },
                      customerLocation: { lat: order.deliveryAddress.latitude, lon: order.deliveryAddress.longitude }
                    }} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default TrackOrderPage
