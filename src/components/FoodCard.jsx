import React, { useState } from 'react'
import { FaLeaf, FaDrumstickBite, FaStar, FaFire } from "react-icons/fa"
import { FaMinus, FaPlus } from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/userSlice'

const S = `
.fc{
  width:240px;border-radius:22px;background:white;overflow:hidden;
  box-shadow:0 4px 20px rgba(0,0,0,0.08);
  border:2px solid rgba(244,123,31,0.07);
  transition:all 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
  display:flex;flex-direction:column;font-family:'Outfit',sans-serif;
  position:relative;
}
.fc:hover{transform:translateY(-9px) scale(1.01);box-shadow:0 22px 50px rgba(0,0,0,0.15);border-color:rgba(244,123,31,0.2);}
.fc-img-wrap{position:relative;height:165px;overflow:hidden;background:#FEF6EC;}
.fc-img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);}
.fc:hover .fc-img{transform:scale(1.1);}
.fc-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(28,21,7,0.5) 0%,transparent 50%);}
.fc-badge{
  position:absolute;top:11px;left:11px;
  padding:4px 11px;border-radius:50px;font-size:10px;font-weight:800;
  font-family:'Outfit',sans-serif;letter-spacing:0.3px;
  backdrop-filter:blur(8px);
}
.fc-type-pill{position:absolute;top:11px;right:11px;background:rgba(255,255,255,0.95);border-radius:10px;padding:5px 8px;display:flex;align-items:center;gap:4px;font-size:10px;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,0.15);backdrop-filter:blur(8px);}
.fc-body{padding:14px 16px;flex:1;display:flex;flex-direction:column;gap:5px;}
.fc-name{font-weight:800;font-size:15px;color:#1C1507;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3;}
.fc-shop{font-size:11px;color:#917850;display:flex;align-items:center;gap:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.fc-rating{display:flex;align-items:center;gap:5px;}
.fc-rating-val{font-size:12px;font-weight:800;color:#1C1507;}
.fc-stars{display:flex;gap:2px;}
.fc-count{font-size:11px;color:#917850;}
.fc-bottom{
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 16px;border-top:1.5px solid rgba(244,123,31,0.07);
  background:rgba(250,250,248,0.5);
}
.fc-price{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#1C1507;line-height:1;}
.fc-qty-wrap{display:flex;align-items:center;border-radius:50px;border:2px solid rgba(244,123,31,0.2);overflow:hidden;background:white;}
.fc-qty-btn{width:33px;height:33px;display:flex;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;transition:background 0.15s;color:#917850;}
.fc-qty-btn:hover{background:rgba(244,123,31,0.1);color:#F47B1F;}
.fc-qty{width:30px;text-align:center;font-weight:900;font-size:14px;color:#1C1507;}
.fc-add-btn{
  width:38px;height:38px;border-radius:14px;border:none;cursor:pointer;
  background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 14px rgba(244,123,31,0.45);
  transition:all 0.25s;
}
.fc-add-btn:hover{transform:scale(1.12);box-shadow:0 7px 20px rgba(244,123,31,0.55);}
.fc-added{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,0.12);border:2px solid rgba(34,197,94,0.3);border-radius:22px;pointer-events:none;animation:fcAdded 0.4s ease;opacity:0;}
@keyframes fcAdded{0%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(1.03);}}
`

function FoodCard({ data }) {
  const dispatch = useDispatch()
  const { cartItems, userData } = useSelector(s => s.user)
  const [flash, setFlash] = useState(false)
  const inCart = cartItems?.find(c => c.id === data._id)
  const qty = inCart?.quantity || 0

  const add = () => {
    dispatch(addToCart({ id: data._id, name: data.name, price: data.price, image: data.image, shop: data.shopId, shopName: data.shopName, foodType: data.foodType, quantity: 1 }))
    setFlash(true); setTimeout(() => setFlash(false), 500)
  }
  const remove = () => {
    if (qty > 1) dispatch({ type: 'user/updateQuantity', payload: { id: data._id, quantity: qty - 1 } })
    else dispatch({ type: 'user/removeCartItem', payload: data._id })
  }

  const avgRating = data.rating?.count > 0 ? data.rating.average.toFixed(1) : null
  const ratingCount = data.rating?.count || 0
  const isVeg = data.foodType === 'veg'
  const isNew = !ratingCount || ratingCount < 3

  return (
    <div className="fc">
      <style>{S}</style>
      <div className="fc-img-wrap">
        <img className="fc-img" src={data.image} alt={data.name} />
        <div className="fc-img-overlay" />
        {isNew
          ? <div className="fc-badge" style={{ background: 'rgba(99,102,241,0.92)', color: 'white' }}>✨ New</div>
          : avgRating >= 4.5 ? <div className="fc-badge" style={{ background: 'rgba(244,123,31,0.92)', color: 'white' }}><FaFire size={9} style={{ marginRight: 3 }} />Hot</div>
          : null}
        <div className="fc-type-pill" style={{ color: isVeg ? '#16a34a' : '#dc2626' }}>
          {isVeg ? <FaLeaf size={10} /> : <FaDrumstickBite size={10} />}
          {isVeg ? 'Veg' : 'Non-Veg'}
        </div>
      </div>

      <div className="fc-body">
        <div className="fc-name">{data.name}</div>
        <div className="fc-shop">🏪 {data.shopName || 'Restaurant'}</div>
        {avgRating && (
          <div className="fc-rating">
            <div className="fc-stars">{[1,2,3,4,5].map(s => <FaStar key={s} size={10} color={s <= Math.round(avgRating) ? '#F47B1F' : '#e5e7eb'} />)}</div>
            <span className="fc-rating-val">{avgRating}</span>
            <span className="fc-count">({ratingCount})</span>
          </div>
        )}
      </div>

      <div className="fc-bottom">
        <div>
          <div className="fc-price">₹{data.price}</div>
          <div style={{ fontSize: 11, color: '#917850', marginTop: 2 }}>per item</div>
        </div>
        {userData?.role !== 'owner' && userData?.role !== 'deliveryBoy' && (
          qty > 0 ? (
            <div className="fc-qty-wrap">
              <button className="fc-qty-btn" onClick={remove}><FaMinus size={10} /></button>
              <span className="fc-qty">{qty}</span>
              <button className="fc-qty-btn" onClick={add}><FaPlus size={10} /></button>
            </div>
          ) : (
            <button className="fc-add-btn" onClick={add}><FiShoppingCart size={16} /></button>
          )
        )}
      </div>
      {flash && <div className="fc-added"><span style={{ fontSize: 28 }}>✓</span></div>}
    </div>
  )
}
export default FoodCard
