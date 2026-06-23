import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5"
import { TbCurrentLocation } from "react-icons/tb"
import { IoLocationSharp } from "react-icons/io5"
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import "leaflet/dist/leaflet.css"
import { setAddress, setLocation } from '../redux/mapSlice'
import { MdDeliveryDining } from "react-icons/md"
import { FaCreditCard, FaLeaf, FaDrumstickBite, FaShieldAlt } from "react-icons/fa"
import { FaMobileScreenButton, FaLock } from "react-icons/fa6"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { addMyOrder, setTotalAmount, clearCart } from '../redux/userSlice'
import Nav from '../components/Nav'
import { ClipLoader } from 'react-spinners'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.co-wrap{min-height:100vh;background:#FAFAF8;padding-top:72px;font-family:'Outfit',sans-serif;}
.co-container{max-width:1000px;margin:0 auto;padding:32px 5% 60px;}
.co-hd{display:flex;align-items:center;gap:14px;margin-bottom:36px;}
.co-back{background:rgba(244,123,31,0.08);border:1.5px solid rgba(244,123,31,0.2);border-radius:13px;padding:10px 14px;cursor:pointer;display:flex;align-items:center;color:#F47B1F;transition:all 0.2s;}
.co-back:hover{background:rgba(244,123,31,0.15);}
.co-title{font-family:'Fraunces',serif;font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:#1C1507;letter-spacing:-0.5px;}
.co-grid{display:grid;grid-template-columns:1fr 380px;gap:24px;align-items:start;}
.co-card{background:white;border-radius:22px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.08);margin-bottom:20px;}
.co-section-title{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:#1C1507;margin-bottom:18px;display:flex;align-items:center;gap:10px;}
.co-input{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:13px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;transition:all 0.2s;background:#FAFAF8;}
.co-input:focus{border-color:#F47B1F;box-shadow:0 0 0 3px rgba(244,123,31,0.1);background:white;}
.co-map-btn{border:none;border-radius:12px;padding:12px 16px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;transition:all 0.25s;white-space:nowrap;}
.co-pay-opt{border:2px solid rgba(0,0,0,0.08);border-radius:16px;padding:16px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:14px;}
.co-pay-opt.active{border-color:#F47B1F;background:linear-gradient(135deg,rgba(244,123,31,0.05),rgba(232,98,10,0.03));}
.co-pay-opt:hover{border-color:rgba(244,123,31,0.4);}
.co-summary-row{display:flex;justify-content:space-between;align-items:center;font-size:14px;padding:8px 0;color:#917850;}
.co-summary-row.total{font-family:'Fraunces',serif;font-size:20px;font-weight:700;color:#1C1507;padding-top:14px;border-top:2px solid rgba(244,123,31,0.12);}
.co-place-btn{width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:16px;padding:17px;font-family:'Outfit',sans-serif;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 6px 24px rgba(244,123,31,0.42);transition:all 0.3s;display:flex;align-items:center;justify-content:center;gap:10px;}
.co-place-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(244,123,31,0.52);}
.co-place-btn:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
@media(max-width:840px){.co-grid{grid-template-columns:1fr;}}
`

function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap()
    map.setView([location.lat, location.lon], 16, { animate: true })
  }
  return null
}

function CheckOut() {
  const { location, address } = useSelector(s => s.map)
  const { cartItems, totalAmount, userData } = useSelector(s => s.user)
  const [addressInput, setAddressInput] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [placing, setPlacing] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const apiKey = import.meta.env.VITE_GEOAPIKEY
  const deliveryFee = totalAmount > 500 ? 0 : 40
  const total = totalAmount + deliveryFee

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLatLng(lat, lng)
  }
  const getCurrentLocation = () => {
    const lat = userData.location.coordinates[1]
    const lon = userData.location.coordinates[0]
    dispatch(setLocation({ lat, lon }))
    getAddressByLatLng(lat, lon)
  }
  const getAddressByLatLng = async (lat, lng) => {
    try {
      const r = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
      dispatch(setAddress(r?.data?.results[0].address_line2))
    } catch (e) { console.log(e) }
  }
  const getLatLngByAddress = async () => {
    try {
      const r = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
      const { lat, lon } = r.data.features[0].properties
      dispatch(setLocation({ lat, lon }))
    } catch (e) { console.log(e) }
  }
  const handlePlaceOrder = async () => {
    setPlacing(true)
    try {
      const r = await axios.post(`${serverUrl}/api/order/place-order`, { paymentMethod, deliveryAddress: { text: addressInput, latitude: location.lat, longitude: location.lon }, cartItems }, { withCredentials: true })
      if (paymentMethod === "cod") { dispatch(addMyOrder(r.data)); dispatch(clearCart()); navigate("/order-placed", { state: { order: r.data } }) }
      else { openRazorpay(r.data.orderId, r.data.razorOrder) }
    } catch (e) { console.log(e) }
    setPlacing(false)
  }
  const openRazorpay = (orderId, razorOrder) => {
    const opts = { key: import.meta.env.VITE_RAZORPAY_KEY_ID, amount: razorOrder.amount, currency: 'INR', name: "Pakwan Network", description: "Food Delivery", order_id: razorOrder.id, handler: async (resp) => {
      try { const r = await axios.post(`${serverUrl}/api/order/verify-payment`, { razorpay_payment_id: resp.razorpay_payment_id, razorpay_order_id: resp.razorpay_order_id, razorpay_signature: resp.razorpay_signature, orderId }, { withCredentials: true }); dispatch(addMyOrder(r.data)); dispatch(clearCart()); navigate("/order-placed", { state: { order: r.data } }) } catch (e) { console.log(e) }
    }}
    new window.Razorpay(opts).open()
  }
  useEffect(() => { setAddressInput(address) }, [address])

  return (
    <div className="co-wrap">
      <style>{S}</style>
      <Nav />
      <div className="co-container">
        <div className="co-hd">
          <button className="co-back" onClick={() => navigate('/')}><IoIosArrowRoundBack size={22} /></button>
          <div>
            <h1 className="co-title">Checkout</h1>
            <p style={{ color: '#917850', fontSize: 13, marginTop: 2 }}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} · ₹{total} total</p>
          </div>
        </div>

        <div className="co-grid">
          {/* LEFT */}
          <div>
            {/* Delivery Location */}
            <div className="co-card">
              <h2 className="co-section-title"><IoLocationSharp color="#F47B1F" size={20} />Delivery Location</h2>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <input className="co-input" placeholder="Enter your delivery address..." value={addressInput} onChange={e => setAddressInput(e.target.value)} />
                <button className="co-map-btn" style={{ background: 'linear-gradient(135deg,#F47B1F,#E8620A)', color: 'white', boxShadow: '0 3px 12px rgba(244,123,31,0.38)' }} onClick={getLatLngByAddress}><IoSearchOutline size={16} /></button>
                <button className="co-map-btn" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1.5px solid rgba(59,130,246,0.2)' }} onClick={getCurrentLocation}><TbCurrentLocation size={16} /></button>
              </div>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(244,123,31,0.15)', height: 260 }}>
                <MapContainer className="w-full h-full" center={[location?.lat || 23.02, location?.lon || 72.57]} zoom={15} style={{ height: 260 }}>
                  <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <RecenterMap location={location} />
                  <Marker position={[location?.lat || 23.02, location?.lon || 72.57]} draggable eventHandlers={{ dragend: onDragEnd }} />
                </MapContainer>
              </div>
              {addressInput && <p style={{ fontSize: 12, color: '#917850', marginTop: 10, padding: '8px 12px', background: 'rgba(244,123,31,0.05)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6 }}>📍 {addressInput}</p>}
            </div>

            {/* Payment Method */}
            <div className="co-card">
              <h2 className="co-section-title">💳 Payment Method</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className={`co-pay-opt ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,rgba(34,197,94,0.1),rgba(22,163,74,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MdDeliveryDining size={22} color="#16a34a" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: '#1C1507', fontSize: 14 }}>Cash on Delivery</div>
                    <div style={{ fontSize: 12, color: '#917850', marginTop: 2 }}>Pay when your food arrives at your door</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === 'cod' ? '#F47B1F' : '#ddd'}`, background: paymentMethod === 'cod' ? '#F47B1F' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    {paymentMethod === 'cod' && <span style={{ fontSize: 10, color: 'white', fontWeight: 800 }}>✓</span>}
                  </div>
                </div>
                <div className={`co-pay-opt ${paymentMethod === 'online' ? 'active' : ''}`} onClick={() => setPaymentMethod('online')}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(79,70,229,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexShrink: 0 }}>
                    <FaMobileScreenButton size={14} color="#6366f1" />
                    <FaCreditCard size={14} color="#4f46e5" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: '#1C1507', fontSize: 14 }}>UPI / Card / Net Banking</div>
                    <div style={{ fontSize: 12, color: '#917850', marginTop: 2 }}>Secure online payment via Razorpay</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === 'online' ? '#F47B1F' : '#ddd'}`, background: paymentMethod === 'online' ? '#F47B1F' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    {paymentMethod === 'online' && <span style={{ fontSize: 10, color: 'white', fontWeight: 800 }}>✓</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Order Summary */}
          <div>
            <div className="co-card" style={{ position: 'sticky', top: 96 }}>
              <h2 className="co-section-title">🧾 Order Summary</h2>
              <div style={{ maxHeight: 280, overflowY: 'auto', paddingRight: 4, scrollbarWidth: 'thin' }}>
                {cartItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <img src={item.image} alt={item.name} style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#1C1507' }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: '#917850', marginTop: 2 }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#1C1507' }}>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="co-summary-row"><span>Subtotal</span><span style={{ fontWeight: 700, color: '#1C1507' }}>₹{totalAmount}</span></div>
                <div className="co-summary-row"><span>Delivery Fee</span><span style={{ fontWeight: 700, color: deliveryFee === 0 ? '#22c55e' : '#1C1507' }}>{deliveryFee === 0 ? '🎉 FREE' : `₹${deliveryFee}`}</span></div>
                {deliveryFee === 0 && <div style={{ fontSize: 11, color: '#22c55e', marginTop: -4, marginBottom: 6, fontWeight: 600 }}>✓ Free delivery on orders above ₹500</div>}
                <div className="co-summary-row total"><span>Total</span><span style={{ color: '#F47B1F' }}>₹{total}</span></div>
              </div>
              <button className="co-place-btn" style={{ marginTop: 20 }} onClick={handlePlaceOrder} disabled={placing || !addressInput}>
                {placing ? <ClipLoader size={20} color="white" /> : paymentMethod === 'cod' ? (<><MdDeliveryDining size={18} />Place Order</>) : (<><FaLock size={14} />Pay ₹{total}</>)}
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, fontSize: 12, color: '#917850' }}>
                <FaShieldAlt size={12} color="#22c55e" />Secured by Razorpay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckOut
