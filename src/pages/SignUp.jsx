import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { serverUrl } from '../App'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import BrandLogo from '../components/BrandLogo'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;}
.su{min-height:100vh;display:flex;font-family:'Outfit',sans-serif;background:#FAFAF8;}
.su-left{flex:1;display:none;flex-direction:column;justify-content:space-between;padding:56px 60px;background:linear-gradient(160deg,#1C1507 0%,#2E1E08 60%,#3d2610 100%);position:relative;overflow:hidden;}
.su-left-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.09) 1px,transparent 0);background-size:28px 28px;}
.su-orb{position:absolute;border-radius:50%;pointer-events:none;}
.su-left-content{position:relative;z-index:1;}
.su-logo{display:flex;align-items:center;gap:12px;margin-bottom:64px;}
.su-logo-icon{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 6px 20px rgba(244,123,31,0.45);}
.su-logo-name{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#FAFAF8;}
.su-left-h{font-family:'Fraunces',serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:#FAFAF8;line-height:1.08;letter-spacing:-1px;margin-bottom:16px;}
.su-left-h span{color:#F47B1F;font-style:italic;}
.su-left-desc{color:rgba(250,250,248,0.5);font-size:15px;line-height:1.7;margin-bottom:40px;}
.su-roles{display:flex;flex-direction:column;gap:12px;}
.su-role-item{display:flex;align-items:center;gap:14px;background:rgba(244,123,31,0.08);border:1px solid rgba(244,123,31,0.18);border-radius:16px;padding:14px 18px;}
.su-role-icon{font-size:24px;}
.su-role-name{font-weight:800;font-size:14px;color:#FAFAF8;margin-bottom:3px;}
.su-role-desc{font-size:12px;color:rgba(250,250,248,0.45);}
/* RIGHT */
.su-right{flex:1;display:flex;align-items:center;justify-content:center;padding:36px 24px;overflow-y:auto;}
.su-card{background:white;border-radius:28px;padding:44px 40px;width:100%;max-width:480px;box-shadow:0 10px 70px rgba(0,0,0,0.1),0 0 0 1.5px rgba(244,123,31,0.07);}
.su-heading{font-family:'Fraunces',serif;font-size:1.7rem;font-weight:700;color:#1C1507;margin-bottom:6px;letter-spacing:-0.3px;}
.su-heading span{color:#F47B1F;}
.su-tagline{font-size:14px;color:#917850;margin-bottom:24px;}
.su-label{font-size:13px;font-weight:700;color:#4a3728;margin-bottom:6px;display:block;}
.su-input{width:100%;border:2px solid rgba(0,0,0,0.09);border-radius:14px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;transition:all 0.25s;background:#FAFAF8;margin-bottom:16px;}
.su-input:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
.su-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
/* ROLE CARDS */
.su-role-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
.su-role-card{border:2px solid;border-radius:16px;padding:14px 10px;text-align:center;cursor:pointer;transition:all 0.25s;font-family:'Outfit',sans-serif;}
.su-role-card:hover{transform:translateY(-2px);}
.su-role-card .rci{font-size:26px;margin-bottom:6px;}
.su-role-card .rcn{font-size:12px;font-weight:800;color:#1C1507;}
.su-role-card .rcd{font-size:11px;color:#917850;margin-top:2px;}
.su-btn{width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:16px;padding:16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:15px;cursor:pointer;transition:all 0.3s;box-shadow:0 5px 22px rgba(244,123,31,0.42);display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px;}
.su-btn:hover{transform:translateY(-2px);box-shadow:0 9px 30px rgba(244,123,31,0.52);}
.su-btn:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
.su-divider{display:flex;align-items:center;gap:12px;margin:14px 0;font-size:13px;color:#C4A07A;font-weight:600;}
.su-divider::before,.su-divider::after{content:'';flex:1;height:1.5px;background:rgba(0,0,0,0.07);}
.su-google{width:100%;display:flex;align-items:center;justify-content:center;gap:11px;border:2px solid rgba(0,0,0,0.09);border-radius:16px;padding:14px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;background:white;cursor:pointer;transition:all 0.25s;color:#1C1507;}
.su-google:hover{background:#FAFAF8;border-color:rgba(0,0,0,0.15);transform:translateY(-1px);box-shadow:0 4px 18px rgba(0,0,0,0.08);}
.su-err{background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.2);border-radius:12px;padding:11px 14px;font-size:13px;color:#dc2626;font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.su-pass-wrap{position:relative;margin-bottom:16px;}
.su-pass-wrap .su-input{margin-bottom:0;padding-right:46px;}
.su-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#917850;}
@media(min-width:960px){.su-left{display:flex;}}
@media(max-width:480px){.su-grid{grid-template-columns:1fr;}.su-role-row{grid-template-columns:1fr 1fr;}}
`

const roles = [
  { id: 'user', icon: '🛒', name: 'Customer', desc: 'Order food' },
  { id: 'owner', icon: '🍳', name: 'Restaurant', desc: 'Sell food' },
  { id: 'deliveryBoy', icon: '🛵', name: 'Delivery', desc: 'Deliver food' },
]

function SignUp() {
  const [showPwd, setShowPwd] = useState(false)
  const [role, setRole] = useState('user')
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, { fullName, email, password, mobile, role }, { withCredentials: true })
      dispatch(setUserData(result.data)); setErr('')
    } catch (error) {
      setErr(error?.response?.data?.message || 'Sign up failed. Please try again.')
    }
    setLoading(false)
  }

  const handleGoogleAuth = async () => {
    if (!mobile) return setErr('Mobile number is required for Google sign up')
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    try {
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, { email: result.user.email, mobile, role }, { withCredentials: true })
      dispatch(setUserData(data))
    } catch (e) { console.log(e) }
  }

  return (
    <div className="su">
      <style>{S}</style>
      <div className="su-left">
        <div className="su-left-grid" />
        <div className="su-orb" style={{ top: '-10%', right: '-10%', width: 380, height: 380, background: 'radial-gradient(circle,rgba(244,123,31,0.2),transparent 65%)' }} />
        <div className="su-orb" style={{ bottom: '-10%', left: '-5%', width: 260, height: 260, background: 'radial-gradient(circle,rgba(250,160,64,0.12),transparent 65%)' }} />
        <div className="su-left-content">
          <BrandLogo size="lg" theme="dark" tagline="Network" style={{ marginBottom: 64 }} />
          <div className="su-left-h">Join India's<br /><span>premier food</span><br />platform</div>
          <p className="su-left-desc">Whether you're hungry, cooking, or delivering — Pakwan Network has a place for you.</p>
          <div className="su-roles">
            {[{ icon: '🛒', name: 'Customers', desc: 'Order from 1200+ restaurants' }, { icon: '🍳', name: 'Restaurant Owners', desc: 'Reach thousands of customers' }, { icon: '🛵', name: 'Delivery Partners', desc: 'Earn on your schedule' }].map(r => (
              <div key={r.name} className="su-role-item">
                <div className="su-role-icon">{r.icon}</div>
                <div><div className="su-role-name">{r.name}</div><div className="su-role-desc">{r.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, fontSize: 13, color: 'rgba(250,250,248,0.3)', fontWeight: 600 }}>© 2025 Pakwan Network. All rights reserved.</div>
      </div>

      <div className="su-right">
        <div className="su-card">
          <h1 className="su-heading">Create <span>Account</span></h1>
          <p className="su-tagline">Already have an account? <span style={{ color: '#F47B1F', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/signin')}>Sign in →</span></p>

          {err && <div className="su-err">⚠️ {err}</div>}

          <label className="su-label">I want to join as...</label>
          <div className="su-role-row" style={{ marginBottom: 20 }}>
            {roles.map(r => (
              <div key={r.id} className="su-role-card" onClick={() => setRole(r.id)}
                style={{ borderColor: role === r.id ? '#F47B1F' : 'rgba(0,0,0,0.09)', background: role === r.id ? 'rgba(244,123,31,0.06)' : 'white', boxShadow: role === r.id ? '0 4px 16px rgba(244,123,31,0.2)' : 'none' }}>
                <div className="rci">{r.icon}</div>
                <div className="rcn">{r.name}</div>
                <div className="rcd">{r.desc}</div>
              </div>
            ))}
          </div>

          <div className="su-grid">
            <div>
              <label className="su-label">Full Name</label>
              <input className="su-input" placeholder="Your name" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="su-label">Mobile Number</label>
              <input className="su-input" placeholder="+91 XXXXX XXXXX" value={mobile} onChange={e => setMobile(e.target.value)} />
            </div>
          </div>

          <label className="su-label">Email Address</label>
          <input className="su-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />

          <label className="su-label">Password</label>
          <div className="su-pass-wrap">
            <input className="su-input" type={showPwd ? 'text' : 'password'} placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignUp()} />
            <button className="su-eye" onClick={() => setShowPwd(!showPwd)}>{showPwd ? <FaRegEyeSlash size={17} color="#917850" /> : <FaRegEye size={17} color="#917850" />}</button>
          </div>

          <button className="su-btn" onClick={handleSignUp} disabled={loading} style={{ marginTop: 8 }}>
            {loading ? <ClipLoader size={18} color="white" /> : 'Create Account →'}
          </button>
          <div className="su-divider">or</div>
          <button className="su-google" onClick={handleGoogleAuth}><FcGoogle size={22} />Continue with Google</button>
          <div style={{ fontSize: 13, color: '#917850', textAlign: 'center', marginTop: 16 }}>
            Already have an account? <span style={{ color: '#F47B1F', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/signin')}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp
