import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setMyShopData } from '../redux/ownerSlice'
import { ClipLoader } from 'react-spinners'
import { FaUtensils, FaLeaf, FaDrumstickBite, FaCloudUploadAlt } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Nav from '../components/Nav'

const CATS = ["Snacks","Main Course","Desserts","Pizza","Burgers","Sandwiches","South Indian","North Indian","Chinese","Fast Food","Others"]
const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;}
.ai-wrap{min-height:100vh;background:linear-gradient(160deg,#FAFAF8 0%,#FEF6EC 55%,#FAFAF8 100%);padding-top:72px;font-family:'Outfit',sans-serif;}
.ai-hero{background:linear-gradient(140deg,#1C1507,#2E1E08 60%,#3d2610);padding:44px 5%;position:relative;overflow:hidden;}
.ai-hero::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.07) 1px,transparent 0);background-size:32px 32px;}
.ai-container{max-width:680px;margin:0 auto;padding:36px 5% 60px;}
.ai-card{background:white;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.09);border:2px solid rgba(244,123,31,0.08);}
.ai-label{font-size:13px;font-weight:700;color:#4a3728;margin-bottom:7px;display:block;}
.ai-input{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:13px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;transition:all 0.25s;background:#FAFAF8;}
.ai-input:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
.ai-select{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:13px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;background:#FAFAF8;cursor:pointer;transition:all 0.25s;}
.ai-select:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
.ai-upload{border:2px dashed rgba(244,123,31,0.3);border-radius:16px;background:rgba(244,123,31,0.03);transition:all 0.25s;cursor:pointer;overflow:hidden;}
.ai-upload:hover{border-color:#F47B1F;background:rgba(244,123,31,0.06);}
.ai-type-btn{flex:1;border:2px solid;border-radius:14px;padding:14px 12px;text-align:center;cursor:pointer;transition:all 0.25s;font-family:'Outfit',sans-serif;}
.ai-type-btn:hover{transform:translateY(-2px);}
.ai-submit{width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:14px;padding:16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:16px;cursor:pointer;transition:all 0.3s;box-shadow:0 5px 22px rgba(244,123,31,0.42);display:flex;align-items:center;justify-content:center;gap:9px;}
.ai-submit:hover{transform:translateY(-2px);box-shadow:0 9px 30px rgba(244,123,31,0.52);}
.ai-submit:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
`

function AddItem() {
  const navigate = useNavigate()
  const { myShopData } = useSelector(s => s.owner)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [category, setCategory] = useState("")
  const [foodType, setFoodType] = useState("veg")
  const dispatch = useDispatch()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) { setBackendImage(file); setFrontendImage(URL.createObjectURL(file)) }
  }
  const handleDrop = (e) => {
    e.preventDefault(); const file = e.dataTransfer.files[0]
    if (file) { setBackendImage(file); setFrontendImage(URL.createObjectURL(file)) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const fd = new FormData()
      fd.append("name", name); fd.append("category", category)
      fd.append("foodType", foodType); fd.append("price", price)
      if (backendImage) fd.append("image", backendImage)
      const r = await axios.post(`${serverUrl}/api/item/add-item`, fd, { withCredentials: true })
      dispatch(setMyShopData(r.data)); navigate("/")
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  return (
    <div className="ai-wrap">
      <style>{S}</style>
      <Nav />

      <section className="ai-hero">
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,123,31,0.18),transparent 65%)' }} />
        <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(244,123,31,0.15)', border: '1px solid rgba(244,123,31,0.3)', borderRadius: 50, padding: '5px 14px', marginBottom: 14, fontSize: 11, color: '#FAA040', fontWeight: 700 }}>
            <FaUtensils size={10} />{myShopData?.name}
          </div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(1.7rem,4vw,2.4rem)', fontWeight: 700, color: '#FAFAF8', letterSpacing: -1, marginBottom: 6 }}>
            Add New <span style={{ color: '#F47B1F' }}>Dish</span>
          </h1>
          <p style={{ color: 'rgba(250,250,248,0.5)', fontSize: 14 }}>Fill in the details below to add a new item to your menu.</p>
        </div>
      </section>

      <div className="ai-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <button style={{ background: 'rgba(244,123,31,0.08)', border: '1.5px solid rgba(244,123,31,0.2)', borderRadius: 12, padding: '9px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#F47B1F', transition: 'all 0.2s' }} onClick={() => navigate('/')}>
            <IoIosArrowRoundBack size={20} />
          </button>
          <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, color: '#1C1507', fontSize: 17 }}>New Menu Item</span>
        </div>

        <form className="ai-card" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div style={{ position: 'relative' }}>
            <input type="file" accept="image/*" id="ai-img" style={{ display: 'none' }} onChange={handleImage} />
            <label htmlFor="ai-img" className="ai-upload" style={{ display: 'block' }}
              onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
              {frontendImage ? (
                <div style={{ position: 'relative' }}>
                  <img src={frontendImage} alt="Preview" style={{ width: '100%', height: 240, objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Click to change</span>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '48px 20px', textAlign: 'center' }}>
                  <FaCloudUploadAlt size={42} color="#F47B1F" style={{ marginBottom: 12, opacity: 0.7 }} />
                  <p style={{ fontWeight: 700, color: '#1C1507', fontSize: 15, marginBottom: 4 }}>Drop your dish photo here</p>
                  <p style={{ color: '#917850', fontSize: 13 }}>or click to browse · JPG, PNG, WEBP</p>
                </div>
              )}
            </label>
          </div>

          <div style={{ padding: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="ai-label">Dish Name</label>
                <input className="ai-input" placeholder="e.g. Paneer Tikka Masala" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="ai-label">Price (₹)</label>
                <input className="ai-input" type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="ai-label">Category</label>
              <select className="ai-select" value={category} onChange={e => setCategory(e.target.value)} required>
                <option value="">Select a category...</option>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Food Type Toggle */}
            <div style={{ marginBottom: 24 }}>
              <label className="ai-label">Food Type</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {[{ val: 'veg', icon: <FaLeaf size={16} />, color: '#16a34a', bg: 'rgba(34,197,94,0.08)', label: '🌿 Vegetarian' },
                  { val: 'non veg', icon: <FaDrumstickBite size={16} />, color: '#dc2626', bg: 'rgba(220,38,38,0.08)', label: '🍗 Non-Vegetarian' }
                ].map(t => (
                  <button key={t.val} type="button" className="ai-type-btn"
                    style={{ borderColor: foodType === t.val ? t.color : 'rgba(0,0,0,0.1)', background: foodType === t.val ? t.bg : 'white', color: foodType === t.val ? t.color : '#917850', fontWeight: foodType === t.val ? 800 : 600, fontSize: 14 }}
                    onClick={() => setFoodType(t.val)}>
                    {t.label}
                    {foodType === t.val && <div style={{ fontSize: 10, marginTop: 4, fontWeight: 700 }}>✓ Selected</div>}
                  </button>
                ))}
              </div>
            </div>

            <button className="ai-submit" type="submit" disabled={loading || !name || !price || !category || !frontendImage}>
              {loading ? <ClipLoader size={20} color="white" /> : <><FaUtensils size={15} />Add to Menu</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddItem
