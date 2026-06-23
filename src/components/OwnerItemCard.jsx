import axios from 'axios'
import React, { useState } from 'react'
import { FaPen, FaTrashAlt, FaLeaf, FaDrumstickBite } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'

const S = `
.oic{
  display:flex;background:white;border-radius:20px;overflow:hidden;
  border:2px solid rgba(244,123,31,0.09);box-shadow:0 4px 20px rgba(0,0,0,0.07);
  transition:all 0.3s;font-family:'Outfit',sans-serif;
}
.oic:hover{border-color:rgba(244,123,31,0.22);box-shadow:0 10px 32px rgba(0,0,0,0.12);}
.oic-img{width:130px;flex-shrink:0;position:relative;overflow:hidden;}
.oic-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;}
.oic:hover .oic-img img{transform:scale(1.08);}
.oic-body{flex:1;padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;}
.oic-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
.oic-name{font-weight:800;font-size:16px;color:#1C1507;margin-bottom:7px;}
.oic-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px;}
.oic-tag{display:inline-flex;align-items:center;gap:4px;border-radius:50px;padding:4px 11px;font-size:11px;font-weight:700;}
.oic-price{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#1C1507;}
.oic-price-sub{font-size:11px;color:#917850;margin-top:2px;}
.oic-actions{display:flex;gap:8px;margin-top:14px;}
.oic-act{display:flex;align-items:center;gap:6px;padding:9px 16px;border-radius:12px;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;transition:all 0.22s;}
.oic-act:hover{transform:translateY(-1px);}
`

function OwnerItemCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [deleting, setDeleting] = useState(false)
  const isVeg = data.foodType === 'veg'

  const handleDelete = async () => {
    if (!confirm(`Delete "${data.name}"?`)) return
    setDeleting(true)
    try {
      const r = await axios.get(`${serverUrl}/api/item/delete/${data._id}`, { withCredentials: true })
      dispatch(setMyShopData(r.data))
    } catch (e) { console.log(e) }
    setDeleting(false)
  }

  return (
    <div className={`oic${deleting ? ' opacity-50 pointer-events-none' : ''}`}>
      <style>{S}</style>
      <div className="oic-img"><img src={data.image} alt={data.name} /></div>
      <div className="oic-body">
        <div>
          <div className="oic-top">
            <div className="oic-name">{data.name}</div>
            <div className="oic-price">
              <div>₹{data.price}</div>
              <div className="oic-price-sub">per item</div>
            </div>
          </div>
          <div className="oic-tags">
            <span className="oic-tag" style={{ background: isVeg ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)', color: isVeg ? '#16a34a' : '#dc2626' }}>
              {isVeg ? <FaLeaf size={9} /> : <FaDrumstickBite size={9} />}{isVeg ? 'Veg' : 'Non-Veg'}
            </span>
            <span className="oic-tag" style={{ background: 'rgba(244,123,31,0.1)', color: '#E8620A' }}>{data.category}</span>
          </div>
        </div>
        <div className="oic-actions">
          <button className="oic-act" style={{ background: 'rgba(244,123,31,0.08)', color: '#F47B1F', border: '1.5px solid rgba(244,123,31,0.2)' }} onClick={() => navigate(`/edit-item/${data._id}`)}>
            <FaPen size={11} />Edit
          </button>
          <button className="oic-act" style={{ background: 'rgba(220,38,38,0.07)', color: '#dc2626', border: '1.5px solid rgba(220,38,38,0.15)' }} onClick={handleDelete}>
            <FaTrashAlt size={11} />{deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default OwnerItemCard
