import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItemCard from '../components/CartItemCard'
import Nav from '../components/Nav'
import { FaShieldAlt, FaTruck, FaTag, FaShoppingBag, FaArrowRight } from "react-icons/fa"

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@400;500;600;700;800&display=swap');
.cp{min-height:100vh;background:#FAFAF8;padding-top:72px;font-family:'Outfit',sans-serif;}
.cp-hero{
  background:linear-gradient(145deg,#1C1507 0%,#2E1E08 55%,#3d2610 100%);
  padding:56px 5% 48px;position:relative;overflow:hidden;
}
.cp-hero-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.08) 1px,transparent 0);background-size:28px 28px;}
.cp-hero-orb{position:absolute;top:-15%;right:-5%;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(244,123,31,0.18),transparent 65%);pointer-events:none;}
.cp-hero-inner{max-width:1300px;margin:0 auto;position:relative;z-index:1;}
.cp-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(244,123,31,0.15);border:1px solid rgba(244,123,31,0.3);border-radius:50px;padding:6px 16px;font-size:12px;color:#FAA040;font-weight:700;margin-bottom:18px;}
.cp-title{font-family:'Fraunces',serif;font-size:clamp(1.9rem,4vw,2.8rem);font-weight:700;color:#FAFAF8;letter-spacing:-1px;margin-bottom:8px;}
.cp-title span{color:#F47B1F;font-style:italic;}
.cp-sub{color:rgba(250,250,248,0.5);font-size:14px;}
/* BODY */
.cp-body{max-width:1100px;margin:0 auto;padding:40px 5% 80px;}
.cp-grid{display:grid;grid-template-columns:1fr 370px;gap:28px;align-items:start;}
.cp-items-section{display:flex;flex-direction:column;gap:14px;}
.cp-items-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
.cp-items-title{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:700;color:#1C1507;}
.cp-back-btn{display:inline-flex;align-items:center;gap:6px;background:rgba(244,123,31,0.08);border:1.5px solid rgba(244,123,31,0.2);border-radius:13px;padding:8px 16px;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:#F47B1F;transition:all 0.2s;}
.cp-back-btn:hover{background:rgba(244,123,31,0.15);}
/* SUMMARY */
.cp-summary{background:white;border-radius:26px;padding:26px;box-shadow:0 6px 40px rgba(0,0,0,0.09);border:2px solid rgba(244,123,31,0.09);position:sticky;top:88px;}
.cp-summary-title{font-family:'Fraunces',serif;font-size:1.3rem;font-weight:700;color:#1C1507;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid rgba(244,123,31,0.08);}
.cp-summary-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:14px;color:#917850;font-weight:600;border-bottom:1px solid rgba(0,0,0,0.04);}
.cp-summary-row.grand{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#1C1507;padding-top:16px;border-bottom:none;border-top:2px solid rgba(244,123,31,0.12);}
.cp-free-tag{background:rgba(34,197,94,0.12);color:#16a34a;border-radius:8px;padding:3px 10px;font-size:11px;font-weight:800;}
.cp-checkout-btn{
  width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;
  border:none;border-radius:18px;padding:18px;
  font-family:'Outfit',sans-serif;font-weight:800;font-size:16px;cursor:pointer;
  box-shadow:0 6px 28px rgba(244,123,31,0.45);transition:all 0.3s;
  margin-top:20px;display:flex;align-items:center;justify-content:center;gap:10px;
}
.cp-checkout-btn:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(244,123,31,0.55);}
.cp-trust{display:flex;gap:16px;margin-top:18px;}
.cp-trust-item{display:flex;align-items:center;gap:7px;font-size:12px;color:#917850;font-weight:600;}
/* EMPTY */
.cp-empty{background:white;border-radius:28px;padding:80px 40px;text-align:center;box-shadow:0 4px 30px rgba(0,0,0,0.07);border:2px solid rgba(244,123,31,0.07);}
@media(max-width:860px){.cp-grid{grid-template-columns:1fr;}.cp-summary{position:static;}}
`

function CartPage() {
  const navigate = useNavigate()
  const { cartItems, totalAmount } = useSelector(s => s.user)
  const deliveryFee = totalAmount > 500 ? 0 : 40
  const total = totalAmount + deliveryFee
  const savings = deliveryFee === 0 ? 40 : 0

  return (
    <div className="cp">
      <style>{S}</style>
      <Nav />
      <section className="cp-hero">
        <div className="cp-hero-grid" /><div className="cp-hero-orb" />
        <div className="cp-hero-inner">
          <div className="cp-badge"><FaShoppingBag size={11} />{cartItems.length} items in your cart</div>
          <h1 className="cp-title">
            {cartItems.length === 0 ? 'Your cart is' : 'Review your'} <span>{cartItems.length === 0 ? 'empty' : 'order'}</span>
          </h1>
          <p className="cp-sub">Free delivery on orders above ₹500</p>
        </div>
      </section>

      <div className="cp-body">
        {cartItems.length === 0 ? (
          <div className="cp-empty">
            <div style={{ fontSize: 72, marginBottom: 18 }}>🛒</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 700, color: '#1C1507', marginBottom: 10 }}>Your cart is hungry</div>
            <div style={{ fontSize: 14, color: '#917850', marginBottom: 28 }}>Add some delicious dishes to get started!</div>
            <button onClick={() => navigate('/')} style={{ background: 'linear-gradient(135deg,#F47B1F,#E8620A)', color: 'white', border: 'none', borderRadius: 16, padding: '14px 32px', fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 5px 20px rgba(244,123,31,0.4)' }}>
              Explore Restaurants 🍽️
            </button>
          </div>
        ) : (
          <div className="cp-grid">
            <div className="cp-items-section">
              <div className="cp-items-hd">
                <div className="cp-items-title">{cartItems.length} Item{cartItems.length > 1 ? 's' : ''}</div>
                <button className="cp-back-btn" onClick={() => navigate('/')}><IoIosArrowRoundBack size={18} />Continue Shopping</button>
              </div>
              {cartItems.map((item, i) => <CartItemCard key={i} data={item} />)}
            </div>

            <div className="cp-summary">
              <div className="cp-summary-title">Order Summary</div>
              <div className="cp-summary-row"><span>Subtotal</span><span style={{ color: '#1C1507', fontWeight: 700 }}>₹{totalAmount}</span></div>
              <div className="cp-summary-row">
                <span>Delivery</span>
                <span style={{ color: deliveryFee === 0 ? '#16a34a' : '#1C1507', fontWeight: 700 }}>
                  {deliveryFee === 0 ? <span className="cp-free-tag">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              {savings > 0 && <div className="cp-summary-row"><span style={{ color: '#16a34a' }}>🎉 You saved</span><span style={{ color: '#16a34a', fontWeight: 700 }}>₹{savings}</span></div>}
              <div className="cp-summary-row grand"><span>Total</span><span style={{ color: '#F47B1F' }}>₹{total}</span></div>
              <button className="cp-checkout-btn" onClick={() => navigate('/checkout')}>
                Place Order <FaArrowRight size={14} />
              </button>
              <div className="cp-trust">
                <div className="cp-trust-item"><FaShieldAlt size={13} color="#16a34a" />Secure checkout</div>
                <div className="cp-trust-item"><FaTruck size={13} color="#F47B1F" />Fast delivery</div>
                <div className="cp-trust-item"><FaTag size={13} color="#6366f1" />Best prices</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default CartPage
