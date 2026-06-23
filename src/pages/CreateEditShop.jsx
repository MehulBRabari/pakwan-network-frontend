import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setMyShopData } from '../redux/ownerSlice'
import { ClipLoader } from 'react-spinners'
import { FaStore, FaCloudUploadAlt, FaMapMarkerAlt, FaCity, FaPen } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Nav from '../components/Nav'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;}
.cs-wrap{min-height:100vh;background:linear-gradient(160deg,#FAFAF8 0%,#FEF6EC 55%,#FAFAF8 100%);padding-top:72px;font-family:'Outfit',sans-serif;}
.cs-hero{background:linear-gradient(140deg,#1C1507,#2E1E08 60%,#3d2610);padding:44px 5%;position:relative;overflow:hidden;}
.cs-hero::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.07) 1px,transparent 0);background-size:32px 32px;}
.cs-container{max-width:720px;margin:0 auto;padding:36px 5% 60px;}
.cs-card{background:white;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.09);border:2px solid rgba(244,123,31,0.08);}
.cs-label{font-size:13px;font-weight:700;color:#4a3728;margin-bottom:7px;display:flex;align-items:center;gap:7px;}
.cs-input{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:13px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;transition:all 0.25s;background:#FAFAF8;}
.cs-input:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
.cs-upload{border:2px dashed rgba(244,123,31,0.3);border-radius:16px;background:rgba(244,123,31,0.03);transition:all 0.25s;cursor:pointer;overflow:hidden;}
.cs-upload:hover{border-color:#F47B1F;background:rgba(244,123,31,0.06);}
.cs-submit{width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:14px;padding:16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:16px;cursor:pointer;transition:all 0.3s;box-shadow:0 5px 22px rgba(244,123,31,0.42);display:flex;align-items:center;justify-content:center;gap:9px;}
.cs-submit:hover{transform:translateY(-2px);box-shadow:0 9px 30px rgba(244,123,31,0.52);}
.cs-submit:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
.cs-info-box{background:linear-gradient(135deg,rgba(244,123,31,0.06),rgba(232,98,10,0.03));border:1.5px solid rgba(244,123,31,0.15);border-radius:16px;padding:16px 20px;margin-bottom:24px;}
`

function CreateEditShop() {
  const navigate = useNavigate()
  const { myShopData } = useSelector(s => s.owner)
  const { currentCity, currentState, currentAddress } = useSelector(s => s.user)
  const [name, setName] = useState(myShopData?.name || "")
  const [address, setAddress] = useState(myShopData?.address || currentAddress)
  const [city, setCity] = useState(myShopData?.city || currentCity)
  const [state, setState] = useState(myShopData?.state || currentState)
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) { setBackendImage(file); setFrontendImage(URL.createObjectURL(file)) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const fd = new FormData()
      fd.append("name", name); fd.append("city", city)
      fd.append("state", state); fd.append("address", address)
      if (backendImage) fd.append("image", backendImage)
      const r = await axios.post(`${serverUrl}/api/shop/create-edit`, fd, { withCredentials: true })
      dispatch(setMyShopData(r.data)); navigate("/")
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  return (
    <div className="cs-wrap">
      <style>{S}</style>
      <Nav />

      <section className="cs-hero">
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,123,31,0.18),transparent 65%)' }} />
        <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(244,123,31,0.15)', border: '1px solid rgba(244,123,31,0.3)', borderRadius: 50, padding: '5px 14px', marginBottom: 14, fontSize: 11, color: '#FAA040', fontWeight: 700 }}>
            <FaStore size={10} />{myShopData ? 'Edit Restaurant' : 'New Restaurant'}
          </div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(1.7rem,4vw,2.4rem)', fontWeight: 700, color: '#FAFAF8', letterSpacing: -1, marginBottom: 6 }}>
            {myShopData ? <>Edit Your <span style={{ color: '#F47B1F' }}>Restaurant</span></> : <>List Your <span style={{ color: '#F47B1F' }}>Restaurant</span></>}
          </h1>
          <p style={{ color: 'rgba(250,250,248,0.5)', fontSize: 14 }}>{myShopData ? 'Update your restaurant details and profile.' : 'Join Pakwan Network and reach thousands of hungry customers.'}</p>
        </div>
      </section>

      <div className="cs-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <button style={{ background: 'rgba(244,123,31,0.08)', border: '1.5px solid rgba(244,123,31,0.2)', borderRadius: 12, padding: '9px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#F47B1F' }} onClick={() => navigate('/')}>
            <IoIosArrowRoundBack size={20} />
          </button>
          <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, color: '#1C1507', fontSize: 17 }}>{myShopData ? 'Update Restaurant' : 'List Your Restaurant'}</span>
        </div>

        {!myShopData && (
          <div className="cs-info-box">
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['✅ Free to list', '📊 Revenue tracking', '🔔 Real-time orders', '🌍 City-wide reach'].map(f => (
                <div key={f} style={{ fontSize: 13, color: '#E8620A', fontWeight: 700 }}>{f}</div>
              ))}
            </div>
          </div>
        )}

        <form className="cs-card" onSubmit={handleSubmit}>
          {/* Image */}
          <div>
            <input type="file" accept="image/*" id="cs-img" style={{ display: 'none' }} onChange={handleImage} />
            <label htmlFor="cs-img" className="cs-upload" style={{ display: 'block' }}>
              {frontendImage ? (
                <div style={{ position: 'relative' }}>
                  <img src={frontendImage} alt="Shop" style={{ width: '100%', height: 260, objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <FaCloudUploadAlt size={30} color="white" />
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Change Cover Photo</span>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '52px 20px', textAlign: 'center' }}>
                  <FaStore size={44} color="#F47B1F" style={{ marginBottom: 14, opacity: 0.6 }} />
                  <p style={{ fontWeight: 700, color: '#1C1507', fontSize: 16, marginBottom: 6 }}>Add Restaurant Cover Photo</p>
                  <p style={{ color: '#917850', fontSize: 13 }}>A great photo attracts more customers · JPG, PNG supported</p>
                </div>
              )}
            </label>
          </div>

          <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="cs-label"><FaStore size={12} color="#F47B1F" />Restaurant Name</label>
              <input className="cs-input" placeholder="e.g. Sharma's Kitchen" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <label className="cs-label"><FaMapMarkerAlt size={12} color="#F47B1F" />Street Address</label>
              <input className="cs-input" placeholder="e.g. Shop 4, MG Road" value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="cs-label"><FaCity size={12} color="#F47B1F" />City</label>
                <input className="cs-input" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
              </div>
              <div>
                <label className="cs-label">State</label>
                <input className="cs-input" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
              </div>
            </div>

            <button className="cs-submit" type="submit" disabled={loading || !name || !frontendImage}>
              {loading ? <ClipLoader size={20} color="white" /> : myShopData ? <><FaPen size={14} />Save Changes</> : <><FaStore size={14} />List My Restaurant</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateEditShop
