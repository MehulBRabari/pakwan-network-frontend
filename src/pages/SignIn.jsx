import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { serverUrl } from '../App'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import BrandLogo from '../components/BrandLogo'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;}
.si{min-height:100vh;display:flex;font-family:'Outfit',sans-serif;background:#FAFAF8;}
/* LEFT PANEL */
.si-left{
  flex:1.1;display:none;flex-direction:column;justify-content:space-between;
  padding:56px 60px;
  background:linear-gradient(160deg,#1C1507 0%,#2E1E08 60%,#3d2610 100%);
  position:relative;overflow:hidden;
}
.si-left-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.09) 1px,transparent 0);background-size:28px 28px;}
.si-left-orb{position:absolute;border-radius:50%;pointer-events:none;}
.si-left-content{position:relative;z-index:1;}
.si-left-logo{display:flex;align-items:center;gap:12px;margin-bottom:72px;}
.si-left-logo-icon{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 6px 20px rgba(244,123,31,0.45);}
.si-left-logo-name{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#FAFAF8;}
.si-left-headline{font-family:'Fraunces',serif;font-size:clamp(2rem,3.5vw,2.8rem);font-weight:700;color:#FAFAF8;line-height:1.08;letter-spacing:-1px;margin-bottom:16px;}
.si-left-headline span{color:#F47B1F;font-style:italic;}
.si-left-desc{color:rgba(250,250,248,0.5);font-size:15px;line-height:1.7;margin-bottom:48px;}
.si-left-stats{display:flex;gap:28px;flex-wrap:wrap;}
.si-left-stat-v{font-family:'Fraunces',serif;font-size:26px;font-weight:700;color:#F47B1F;}
.si-left-stat-l{font-size:11px;color:rgba(250,250,248,0.4);font-weight:700;letter-spacing:0.7px;text-transform:uppercase;margin-top:4px;}
.si-testimonial{position:relative;z-index:1;background:rgba(244,123,31,0.08);border:1px solid rgba(244,123,31,0.2);border-radius:20px;padding:20px 24px;}
.si-testimonial-text{font-size:14px;color:rgba(250,250,248,0.75);line-height:1.7;margin-bottom:12px;font-style:italic;}
.si-testimonial-author{font-size:13px;color:#FAA040;font-weight:700;}
/* RIGHT PANEL */
.si-right{flex:1;display:flex;align-items:center;justify-content:center;padding:36px 24px;}
.si-card{background:white;border-radius:28px;padding:48px 44px;width:100%;max-width:460px;box-shadow:0 10px 70px rgba(0,0,0,0.1),0 0 0 1.5px rgba(244,123,31,0.07);}
.si-card-logo{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.si-card-logo-icon{width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 14px rgba(244,123,31,0.4);}
.si-card-logo-name{font-family:'Fraunces',serif;font-size:18px;font-weight:700;color:#1C1507;}
.si-heading{font-family:'Fraunces',serif;font-size:1.7rem;font-weight:700;color:#1C1507;margin-bottom:6px;margin-top:20px;letter-spacing:-0.3px;}
.si-heading span{color:#F47B1F;}
.si-tagline{font-size:14px;color:#917850;margin-bottom:28px;}
.si-label{font-size:13px;font-weight:700;color:#4a3728;margin-bottom:6px;display:block;letter-spacing:0.2px;}
.si-input-wrap{position:relative;margin-bottom:18px;}
.si-input{
  width:100%;border:2px solid rgba(0,0,0,0.09);border-radius:14px;padding:14px 16px;
  font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;
  transition:all 0.25s;background:#FAFAF8;
}
.si-input:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
.si-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#917850;display:flex;align-items:center;}
.si-forgot{font-size:13px;color:#F47B1F;font-weight:700;cursor:pointer;text-align:right;margin-top:-10px;margin-bottom:20px;display:block;}
.si-forgot:hover{text-decoration:underline;}
.si-btn{
  width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;
  border-radius:16px;padding:16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:15px;
  cursor:pointer;transition:all 0.3s;box-shadow:0 5px 22px rgba(244,123,31,0.42);
  display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px;
}
.si-btn:hover{transform:translateY(-2px);box-shadow:0 9px 30px rgba(244,123,31,0.52);}
.si-btn:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
.si-divider{display:flex;align-items:center;gap:12px;margin:16px 0;font-size:13px;color:#C4A07A;font-weight:600;}
.si-divider::before,.si-divider::after{content:'';flex:1;height:1.5px;background:rgba(0,0,0,0.07);}
.si-google-btn{
  width:100%;display:flex;align-items:center;justify-content:center;gap:11px;
  border:2px solid rgba(0,0,0,0.09);border-radius:16px;padding:14px;
  font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;background:white;
  cursor:pointer;transition:all 0.25s;color:#1C1507;
}
.si-google-btn:hover{background:#FAFAF8;border-color:rgba(0,0,0,0.15);transform:translateY(-1px);box-shadow:0 4px 18px rgba(0,0,0,0.08);}
.si-err{background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.2);border-radius:12px;padding:11px 14px;font-size:13px;color:#dc2626;font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.si-footer{font-size:13px;color:#917850;text-align:center;margin-top:20px;}
.si-footer a{color:#F47B1F;font-weight:700;cursor:pointer;text-decoration:none;}
.si-footer a:hover{text-decoration:underline;}
@media(min-width:900px){.si-left{display:flex;}}
`

function SignIn() {
  const [showPwd, setShowPwd] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSignIn = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, { email, password }, { withCredentials: true })
      dispatch(setUserData(result.data)); setErr('')
    } catch (error) {
      setErr(error?.response?.data?.message || 'Sign in failed. Please try again.')
    }
    setLoading(false)
  }

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    try {
      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, { email: result.user.email }, { withCredentials: true })
      dispatch(setUserData(data))
    } catch (e) { console.log(e) }
  }

  return (
    <div className="si">
      <style>{S}</style>

      {/* Left panel */}
      <div className="si-left">
        <div className="si-left-grid" />
        <div className="si-left-orb" style={{ top: '-10%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(244,123,31,0.2),transparent 65%)' }} />
        <div className="si-left-orb" style={{ bottom: '-10%', left: '-10%', width: 280, height: 280, background: 'radial-gradient(circle,rgba(250,160,64,0.12),transparent 65%)' }} />
        <div className="si-left-content">
          <BrandLogo size="lg" theme="dark" tagline="Network" style={{ marginBottom: 72 }} />
          <div className="si-left-headline">Welcome back<br />to <span>great food</span></div>
          <p className="si-left-desc">Sign in to discover the best restaurants near you, track your orders live, and enjoy seamless delivery.</p>
          <div className="si-left-stats">
            {[{ v: '50K+', l: 'Happy Customers' }, { v: '1200+', l: 'Restaurants' }, { v: '25 min', l: 'Avg Delivery' }].map(s => (
              <div key={s.l}><div className="si-left-stat-v">{s.v}</div><div className="si-left-stat-l">{s.l}</div></div>
            ))}
          </div>
        </div>
        <div className="si-testimonial">
          <div className="si-testimonial-text">"Pakwan Network changed how I order food. Live tracking, amazing restaurants, and always on time!"</div>
          <div className="si-testimonial-author">— Priya S., Mumbai · 120+ orders</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="si-right">
        <div className="si-card">
          <BrandLogo size="sm" theme="light" tagline="Network" style={{ marginBottom: 8 }} />
          <h1 className="si-heading">Sign <span>In</span></h1>
          <p className="si-tagline">Don't have an account? <a style={{ color: '#F47B1F', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign up free →</a></p>

          {err && <div className="si-err">⚠️ {err}</div>}

          <label className="si-label">Email Address</label>
          <div className="si-input-wrap">
            <input className="si-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignIn()} />
          </div>

          <label className="si-label">Password</label>
          <div className="si-input-wrap">
            <input className="si-input" type={showPwd ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignIn()} style={{ paddingRight: 46 }} />
            <button className="si-eye" onClick={() => setShowPwd(!showPwd)}>{showPwd ? <FaRegEyeSlash size={17} /> : <FaRegEye size={17} />}</button>
          </div>
          <span className="si-forgot" onClick={() => navigate('/forgot-password')}>Forgot password?</span>

          <button className="si-btn" onClick={handleSignIn} disabled={loading}>
            {loading ? <ClipLoader size={18} color="white" /> : 'Sign In →'}
          </button>

          <div className="si-divider">or continue with</div>

          <button className="si-google-btn" onClick={handleGoogleAuth}>
            <FcGoogle size={22} />Continue with Google
          </button>

          <div className="si-footer">
            New to Pakwan Network? <a onClick={() => navigate('/signup')}>Create an account</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
