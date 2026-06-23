import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { useEffect } from 'react'
import { useState } from 'react'
import DeliveryBoyTracking from './DeliveryBoyTracking'
import { ClipLoader } from 'react-spinners'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FaMotorcycle, FaCheckCircle, FaBoxOpen, FaRupeeSign } from 'react-icons/fa'
import { MdLocationOn, MdAssignment, MdDeliveryDining } from 'react-icons/md'
import { IoMdTime } from 'react-icons/io'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.db-wrap{min-height:100vh;background:#FAFAF8;padding-top:72px;font-family:'Outfit',sans-serif;}
.db-hero{background:linear-gradient(145deg,#1C1507 0%,#2E1E08 55%,#3d2610 100%);padding:52px 5% 44px;position:relative;overflow:hidden;}
.db-hero::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.08) 1px,transparent 0);background-size:28px 28px;}
.db-hero-orb1{position:absolute;top:-20%;right:-5%;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(244,123,31,0.18),transparent 65%);pointer-events:none;}
.db-hero-orb2{position:absolute;bottom:-25%;left:10%;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(250,160,64,0.1),transparent 65%);pointer-events:none;}
.db-hero-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1;}
.db-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(244,123,31,0.15);border:1px solid rgba(244,123,31,0.3);border-radius:50px;padding:6px 16px;font-size:12px;color:#FAA040;font-weight:700;margin-bottom:20px;}
.db-hero-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,4vw,2.8rem);font-weight:700;color:#FAFAF8;letter-spacing:-1px;line-height:1.1;margin-bottom:10px;}
.db-hero-title span{color:#F47B1F;font-style:italic;}
.db-hero-sub{color:rgba(250,250,248,0.5);font-size:15px;margin-bottom:28px;max-width:480px;}
.db-loc-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.15);border-radius:50px;padding:8px 18px;font-size:13px;color:rgba(250,250,248,0.8);font-weight:600;backdrop-filter:blur(8px);}
.db-stats-row{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px;}
.db-stat{background:rgba(244,123,31,0.1);border:1px solid rgba(244,123,31,0.2);border-radius:16px;padding:14px 22px;}
.db-stat-v{font-family:'Fraunces',serif;font-size:24px;font-weight:700;color:#F47B1F;}
.db-stat-l{font-size:11px;color:rgba(250,250,248,0.4);font-weight:700;letter-spacing:0.7px;text-transform:uppercase;margin-top:3px;}
.db-body{max-width:1000px;margin:0 auto;padding:36px 5% 72px;}
.db-card{background:white;border-radius:22px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.08);margin-bottom:20px;}
.db-card-title{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;color:#1C1507;margin-bottom:18px;display:flex;align-items:center;gap:10px;}
.db-assignment{border:1.5px solid rgba(244,123,31,0.15);border-radius:16px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:all 0.2s;background:rgba(250,250,248,0.5);}
.db-assignment:hover{border-color:rgba(244,123,31,0.35);background:rgba(244,123,31,0.03);}
.db-assignment-info p{margin:0;font-family:'Outfit',sans-serif;}
.db-accept-btn{background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:14px;padding:11px 22px;font-family:'Outfit',sans-serif;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 4px 16px rgba(244,123,31,0.42);transition:all 0.25s;white-space:nowrap;}
.db-accept-btn:hover{transform:translateY(-2px);box-shadow:0 7px 22px rgba(244,123,31,0.52);}
.db-current-order{border:2px solid rgba(244,123,31,0.2);border-radius:16px;padding:16px 20px;background:linear-gradient(135deg,rgba(244,123,31,0.04),rgba(232,98,10,0.02));}
.db-deliver-btn{width:100%;margin-top:18px;background:linear-gradient(135deg,#22c55e,#16a34a);color:white;border:none;border-radius:16px;padding:16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 5px 20px rgba(34,197,94,0.42);transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:10px;}
.db-deliver-btn:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(34,197,94,0.52);}
.db-deliver-btn:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
.db-otp-box{margin-top:18px;padding:20px;background:#FAFAF8;border-radius:16px;border:1.5px solid rgba(244,123,31,0.12);}
.db-otp-input{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:13px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:15px;text-align:center;letter-spacing:6px;font-weight:800;color:#1C1507;outline:none;transition:all 0.2s;background:white;margin:12px 0;}
.db-otp-input:focus{border-color:#F47B1F;box-shadow:0 0 0 3px rgba(244,123,31,0.1);}
.db-submit-btn{width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:14px;padding:14px;font-family:'Outfit',sans-serif;font-weight:800;font-size:14px;cursor:pointer;box-shadow:0 4px 16px rgba(244,123,31,0.42);transition:all 0.25s;}
.db-submit-btn:hover{transform:translateY(-2px);}
.db-empty{text-align:center;padding:40px 20px;color:#917850;font-size:14px;}
.db-empty-icon{font-size:48px;margin-bottom:12px;}
.db-earning-card{background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(22,163,74,0.04));border:2px solid rgba(34,197,94,0.15);border-radius:20px;padding:24px;text-align:center;margin-top:20px;}
.db-earning-label{font-size:12px;color:#917850;font-weight:700;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:8px;}
.db-earning-amount{font-family:'Fraunces',serif;font-size:2.5rem;font-weight:700;color:#16a34a;}
`

function DeliveryBoy() {
  const {userData, socket} = useSelector(state => state.user)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [availableAssignments, setAvailableAssignments] = useState([])
  const [otp, setOtp] = useState("")
  const [todayDeliveries, setTodayDeliveries] = useState([])
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const totalDeliveriesToday = todayDeliveries.reduce((sum, d) => sum + d.count, 0)
  const ratePerDelivery = 50
  const totalEarning = totalDeliveriesToday * ratePerDelivery

  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return
    let watchId
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          setDeliveryBoyLocation({ lat: latitude, lon: longitude })
          socket.emit('updateLocation', { latitude, longitude, userId: userData._id })
        },
        (error) => { console.log(error) },
        { enableHighAccuracy: true }
      )
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId) }
  }, [socket, userData])

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true })
      setAvailableAssignments(result.data)
    } catch (error) { console.log(error) }
  }

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      setCurrentOrder(result.data)
    } catch (error) { console.log(error) }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      await axios.post(`${serverUrl}/api/order/accept-order/${assignmentId}`, {}, { withCredentials: true })
      setAvailableAssignments([])
      await getCurrentOrder()
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    if (!socket) return
    socket.on('newAssignment', (data) => {
      setAvailableAssignments(prev => ([...prev, data]))
    })
    return () => { socket.off('newAssignment') }
  }, [socket])

  const sendOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id
      }, { withCredentials: true })
      setShowOtpBox(true)
    } catch (error) { console.log(error) }
    setLoading(false)
  }

  const verifyOtp = async () => {
    setMessage("")
    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp
      }, { withCredentials: true })
      setMessage(result.data.message)
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) { console.log(error) }
  }

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`, { withCredentials: true })
      setTodayDeliveries(result.data)
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    getAssignments()
    getCurrentOrder()
    handleTodayDeliveries()
  }, [userData?._id])

  const liveLocation = deliveryBoyLocation || (
    userData.location?.coordinates?.length === 2
      ? { lat: userData.location.coordinates[1], lon: userData.location.coordinates[0] }
      : null
  )

  return (
    <div className="db-wrap">
      <style>{S}</style>
      <Nav />

      {/* Hero Section */}
      <section className="db-hero">
        <div className="db-hero-orb1" />
        <div className="db-hero-orb2" />
        <div className="db-hero-inner">
          <div className="db-badge"><FaMotorcycle size={12} />Delivery Partner Dashboard</div>
          <h1 className="db-hero-title">
            Welcome back,<br /><span>{userData.fullName}!</span>
          </h1>
          <p className="db-hero-sub">Manage your deliveries, track earnings and stay on top of your assignments.</p>
          {liveLocation && (
            <div className="db-loc-pill">
              <MdLocationOn size={15} color="#F47B1F" />
              Live: {liveLocation.lat?.toFixed(4)}, {liveLocation.lon?.toFixed(4)}
            </div>
          )}
          <div className="db-stats-row">
            <div className="db-stat">
              <div className="db-stat-v">{totalDeliveriesToday}</div>
              <div className="db-stat-l">Today's Deliveries</div>
            </div>
            <div className="db-stat">
              <div className="db-stat-v">₹{totalEarning}</div>
              <div className="db-stat-l">Today's Earnings</div>
            </div>
            <div className="db-stat">
              <div className="db-stat-v">{availableAssignments.length}</div>
              <div className="db-stat-l">Pending Assignments</div>
            </div>
          </div>
        </div>
      </section>

      <div className="db-body">

        {/* Current Order */}
        {currentOrder && (
          <div className="db-card">
            <h2 className="db-card-title"><MdDeliveryDining color="#F47B1F" size={22} />Current Delivery</h2>
            <div className="db-current-order">
              <p style={{ fontWeight: 800, fontSize: 15, color: '#1C1507', marginBottom: 4 }}>
                {currentOrder?.shopOrder?.shopOrderItems?.length} items · ₹{currentOrder?.shopOrder?.subtotal}
              </p>
              <p style={{ fontSize: 13, color: '#917850', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MdLocationOn size={14} color="#F47B1F" />
                {currentOrder.deliveryAddress.text}
              </p>
              <p style={{ fontSize: 13, color: '#917850', marginTop: 4 }}>
                Customer: <strong style={{ color: '#1C1507' }}>{currentOrder.user?.fullName}</strong> · {currentOrder.user?.mobile}
              </p>
            </div>

            {liveLocation && currentOrder.deliveryAddress?.latitude && (
              <div style={{ marginTop: 16, borderRadius: 16, overflow: 'hidden' }}>
                <DeliveryBoyTracking data={{
                  deliveryBoyLocation: liveLocation,
                  customerLocation: {
                    lat: currentOrder.deliveryAddress.latitude,
                    lon: currentOrder.deliveryAddress.longitude
                  }
                }} />
              </div>
            )}

            {!showOtpBox ? (
              <button className="db-deliver-btn" onClick={sendOtp} disabled={loading}>
                {loading ? <ClipLoader size={20} color="white" /> : <><FaCheckCircle size={16} />Mark As Delivered</>}
              </button>
            ) : (
              <div className="db-otp-box">
                <p style={{ fontWeight: 700, fontSize: 14, color: '#1C1507', marginBottom: 4 }}>
                  Enter OTP sent to <span style={{ color: '#F47B1F' }}>{currentOrder.user?.fullName}</span>
                </p>
                <p style={{ fontSize: 12, color: '#917850', marginBottom: 0 }}>Check their registered email/phone</p>
                <input
                  type="text"
                  className="db-otp-input"
                  placeholder="• • • •"
                  maxLength={4}
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
                {message && (
                  <p style={{ textAlign: 'center', color: '#22c55e', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
                    ✓ {message}
                  </p>
                )}
                <button className="db-submit-btn" onClick={verifyOtp}>Confirm Delivery</button>
              </div>
            )}
          </div>
        )}

        {/* Available Assignments */}
        {!currentOrder && (
          <div className="db-card">
            <h2 className="db-card-title"><MdAssignment color="#F47B1F" size={22} />Available Orders</h2>
            {availableAssignments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {availableAssignments.map((a, index) => (
                  <div className="db-assignment" key={index}>
                    <div className="db-assignment-info">
                      <p style={{ fontWeight: 800, fontSize: 14, color: '#1C1507', marginBottom: 4 }}>{a?.shopName}</p>
                      <p style={{ fontSize: 13, color: '#917850', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <MdLocationOn size={13} color="#F47B1F" />{a?.deliveryAddress?.text}
                      </p>
                      <p style={{ fontSize: 12, color: '#917850', marginTop: 4 }}>
                        {a.items?.length} items · ₹{a.subtotal}
                      </p>
                    </div>
                    <button className="db-accept-btn" onClick={() => acceptOrder(a.assignmentId)}>
                      Accept
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="db-empty">
                <div className="db-empty-icon">🛵</div>
                <p style={{ fontWeight: 700, color: '#1C1507', marginBottom: 4 }}>No assignments yet</p>
                <p>New orders will appear here automatically</p>
              </div>
            )}
          </div>
        )}

        {/* Today's Deliveries Chart */}
        <div className="db-card">
          <h2 className="db-card-title"><IoMdTime color="#F47B1F" size={22} />Today's Activity</h2>
          {todayDeliveries.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={todayDeliveries} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} tick={{ fontSize: 11, fontFamily: 'Outfit', fill: '#917850' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fontFamily: 'Outfit', fill: '#917850' }} />
                <Tooltip
                  formatter={(value) => [value, "Deliveries"]}
                  labelFormatter={label => `${label}:00`}
                  contentStyle={{ fontFamily: 'Outfit', borderRadius: 12, border: '1.5px solid rgba(244,123,31,0.2)' }}
                />
                <Bar dataKey="count" fill="#F47B1F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="db-empty">
              <div className="db-empty-icon">📊</div>
              <p>No deliveries recorded today yet</p>
            </div>
          )}

          <div className="db-earning-card">
            <div className="db-earning-label">Total Earnings Today</div>
            <div className="db-earning-amount">₹{totalEarning}</div>
            <p style={{ fontSize: 12, color: '#917850', marginTop: 6 }}>
              {totalDeliveriesToday} deliveries × ₹{ratePerDelivery} per delivery
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DeliveryBoy
