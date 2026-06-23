import React from 'react'
import { FaMinus, FaPlus, FaLeaf, FaDrumstickBite } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { useDispatch } from 'react-redux'
import { removeCartItem, updateQuantity } from '../redux/userSlice'

const S = `
.cic{
  display:flex;align-items:center;gap:16px;background:white;border-radius:20px;
  padding:16px;box-shadow:0 4px 20px rgba(0,0,0,0.07);
  border:2px solid rgba(244,123,31,0.07);font-family:'Outfit',sans-serif;
  transition:all 0.3s;
}
.cic:hover{border-color:rgba(244,123,31,0.18);box-shadow:0 8px 28px rgba(0,0,0,0.11);}
.cic-img{width:84px;height:78px;border-radius:16px;object-fit:cover;flex-shrink:0;border:2px solid rgba(244,123,31,0.1);}
.cic-content{flex:1;min-width:0;}
.cic-name{font-weight:800;font-size:15px;color:#1C1507;margin-bottom:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.cic-meta{font-size:12px;color:#917850;display:flex;align-items:center;gap:7px;margin-bottom:5px;}
.cic-price{font-family:'Fraunces',serif;font-size:19px;font-weight:700;color:#F47B1F;}
.cic-unit{font-size:11px;color:#C4A07A;margin-top:2px;}
.cic-actions{display:flex;align-items:center;gap:10px;flex-shrink:0;}
.cic-controls{display:flex;align-items:center;border:2px solid rgba(244,123,31,0.18);border-radius:50px;overflow:hidden;background:white;}
.cic-ctrl{width:34px;height:34px;display:flex;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;transition:background 0.15s;color:#917850;}
.cic-ctrl:hover{background:rgba(244,123,31,0.1);color:#F47B1F;}
.cic-qty{width:30px;text-align:center;font-weight:900;font-size:14px;color:#1C1507;}
.cic-del{width:38px;height:38px;border-radius:13px;background:rgba(220,38,38,0.07);border:2px solid rgba(220,38,38,0.12);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;color:#dc2626;}
.cic-del:hover{background:rgba(220,38,38,0.14);border-color:rgba(220,38,38,0.28);transform:scale(1.07);}
`

function CartItemCard({ data }) {
  const dispatch = useDispatch()
  return (
    <div className="cic">
      <style>{S}</style>
      <img className="cic-img" src={data.image} alt={data.name} />
      <div className="cic-content">
        <div className="cic-name">{data.name}</div>
        <div className="cic-meta">
          {data.foodType === 'veg' ? <><FaLeaf size={10} color="#16a34a" />Veg</> : <><FaDrumstickBite size={10} color="#dc2626" />Non-Veg</>}
          <span>·</span><span>{data.shopName || 'Restaurant'}</span>
        </div>
        <div className="cic-price">₹{data.price * data.quantity}</div>
        <div className="cic-unit">₹{data.price} × {data.quantity}</div>
      </div>
      <div className="cic-actions">
        <div className="cic-controls">
          <button className="cic-ctrl" onClick={() => data.quantity > 1 ? dispatch(updateQuantity({ id: data.id, quantity: data.quantity - 1 })) : dispatch(removeCartItem(data.id))}><FaMinus size={10} /></button>
          <span className="cic-qty">{data.quantity}</span>
          <button className="cic-ctrl" onClick={() => dispatch(updateQuantity({ id: data.id, quantity: data.quantity + 1 }))}><FaPlus size={10} /></button>
        </div>
        <button className="cic-del" onClick={() => dispatch(removeCartItem(data.id))}><MdDeleteOutline size={19} /></button>
      </div>
    </div>
  )
}
export default CartItemCard
