import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import BrandLogo from '../components/BrandLogo'
import { ClipLoader } from 'react-spinners'
import { FaRegEye, FaRegEyeSlash, FaLock, FaEnvelope, FaShieldAlt } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;}
.fp-wrap{min-height:100vh;display:flex;font-family:'Outfit',sans-serif;background:linear-gradient(160deg,#FAFAF8 0%,#FEF6EC 50%,#FDE8C8 100%);}
.fp-left{flex:1;display:none;flex-direction:column;justify-content:center;padding:70px 60px;background:linear-gradient(160deg,#1C1507 0%,#2E1E08 100%);position:relative;overflow:hidden;}
.fp-right{flex:1;display:flex;align-items:center;justify-content:center;padding:32px 24px;}
.fp-card{background:white;border-radius:24px;padding:44px 40px;width:100%;max-width:440px;box-shadow:0 8px 60px rgba(0,0,0,0.1),0 0 0 1px rgba(244,123,31,0.06);}
.fp-label{font-size:13px;font-weight:700;color:#4a3728;margin-bottom:7px;display:block;letter-spacing:0.2px;}
.fp-input{width:100%;border:1.5px solid rgba(0,0,0,0.1);border-radius:13px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1507;outline:none;transition:all 0.25s;background:#FAFAF8;}
.fp-input:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
.fp-btn{width:100%;background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;border:none;border-radius:14px;padding:15px;font-family:'Outfit',sans-serif;font-weight:800;font-size:15px;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 20px rgba(244,123,31,0.38);display:flex;align-items:center;justify-content:center;gap:8px;}
.fp-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(244,123,31,0.48);}
.fp-btn:disabled{opacity:0.7;transform:none;cursor:not-allowed;}
.fp-step-bar{display:flex;gap:8px;margin-bottom:28px;}
.fp-step{flex:1;height:4px;border-radius:99px;transition:all 0.4s;}
.fp-otp-row{display:flex;gap:10px;justify-content:center;margin-bottom:8px;}
.fp-otp-digit{width:52px;height:56px;border:2px solid rgba(0,0,0,0.1);border-radius:14px;text-align:center;font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:#1C1507;outline:none;transition:all 0.25s;background:#FAFAF8;}
.fp-otp-digit:focus{border-color:#F47B1F;box-shadow:0 0 0 4px rgba(244,123,31,0.1);background:white;}
@media(min-width:900px){.fp-left{display:flex!important;}}
`

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
      setErr(""); setStep(2)
    } catch (e) { setErr(e.response?.data?.message) }
    setLoading(false)
  }
  const handleVerifyOtp = async () => {
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
      setErr(""); setStep(3)
    } catch (e) { setErr(e.response?.data?.message) }
    setLoading(false)
  }
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) return setErr("Passwords don't match!")
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
      navigate("/signin")
    } catch (e) { setErr(e.response?.data?.message) }
    setLoading(false)
  }

  const STEPS = [
    { num: 1, label: 'Email', icon: <FaEnvelope size={16} /> },
    { num: 2, label: 'Verify OTP', icon: <FaShieldAlt size={16} /> },
    { num: 3, label: 'New Password', icon: <FaLock size={16} /> },
  ]

  return (
    <div className="fp-wrap">
      <style>{S}</style>

      {/* Left Branding Panel */}
      <div className="fp-left">
        <div style={{ position: 'absolute', top: '8%', right: '-5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,123,31,0.15),transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(250,160,64,0.1),transparent 65%)' }} />
        <BrandLogo size="lg" theme="dark" tagline="Finest Flavors, Connected" style={{ marginBottom: 56 }} />
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 700, color: '#FAFAF8', lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>Reset your<br /><span style={{ color: '#F47B1F' }}>password.</span></h2>
        <p style={{ color: 'rgba(250,250,248,0.5)', fontSize: 15, lineHeight: 1.8, maxWidth: 340 }}>Follow 3 simple steps to securely reset your password and regain access to your account.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 44 }}>
          {STEPS.map(s => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 14, background: step >= s.num ? 'rgba(244,123,31,0.12)' : 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '14px 18px', border: `1px solid ${step >= s.num ? 'rgba(244,123,31,0.25)' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.4s' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: step > s.num ? 'linear-gradient(135deg,#22c55e,#16a34a)' : step === s.num ? 'linear-gradient(135deg,#F47B1F,#E8620A)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 800, transition: 'all 0.4s', flexShrink: 0 }}>
                {step > s.num ? '✓' : s.num}
              </div>
              <div>
                <div style={{ color: step >= s.num ? '#FAFAF8' : 'rgba(250,250,248,0.35)', fontWeight: 700, fontSize: 14, transition: 'all 0.3s' }}>Step {s.num}</div>
                <div style={{ color: step >= s.num ? '#FAA040' : 'rgba(250,250,248,0.25)', fontSize: 12, transition: 'all 0.3s' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="fp-right">
        <div className="fp-card">
          {/* Back link */}
          <span style={{ fontSize: 13, color: '#917850', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 22, fontWeight: 600 }} onClick={() => navigate('/signin')}>← Back to Sign In</span>

          {/* Logo */}
          <BrandLogo size="sm" theme="light" tagline="Network" style={{ marginBottom: 10 }} />

          {/* Progress Bar */}
          <div className="fp-step-bar">
            {[1, 2, 3].map(n => <div key={n} className="fp-step" style={{ background: step >= n ? 'linear-gradient(90deg,#F47B1F,#E8620A)' : 'rgba(0,0,0,0.08)' }} />)}
          </div>

          {/* Step 1 — Email */}
          {step === 1 && (
            <>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, color: '#1C1507', marginBottom: 6, letterSpacing: -0.5 }}>Forgot Password?</h1>
              <p style={{ color: '#917850', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>Enter your registered email. We'll send you a secure OTP.</p>
              <div style={{ marginBottom: 24 }}>
                <label className="fp-label"><FaEnvelope size={12} style={{ display: 'inline', marginRight: 6 }} />Email Address</label>
                <input className="fp-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button className="fp-btn" onClick={handleSendOtp} disabled={loading || !email}>
                {loading ? <ClipLoader size={18} color="white" /> : <><FaEnvelope size={14} />Send OTP</>}
              </button>
            </>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, color: '#1C1507', marginBottom: 6, letterSpacing: -0.5 }}>Enter OTP</h1>
              <p style={{ color: '#917850', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>We sent a 6-digit code to <strong style={{ color: '#F47B1F' }}>{email}</strong></p>
              <div style={{ marginBottom: 24 }}>
                <label className="fp-label"><FaShieldAlt size={12} style={{ display: 'inline', marginRight: 6 }} />6-Digit OTP</label>
                <input className="fp-input" style={{ letterSpacing: 8, fontSize: 22, fontWeight: 800, textAlign: 'center' }} placeholder="● ● ● ● ● ●" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
              <button className="fp-btn" onClick={handleVerifyOtp} disabled={loading || otp.length < 4}>
                {loading ? <ClipLoader size={18} color="white" /> : <><MdVerified size={17} />Verify OTP</>}
              </button>
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#917850' }}>
                Didn't get it? <span style={{ color: '#F47B1F', fontWeight: 700, cursor: 'pointer' }} onClick={handleSendOtp}>Resend OTP</span>
              </div>
            </>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 700, color: '#1C1507', marginBottom: 6, letterSpacing: -0.5 }}>New Password</h1>
              <p style={{ color: '#917850', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>Choose a strong password for your account.</p>
              <div style={{ marginBottom: 14 }}>
                <label className="fp-label"><FaLock size={11} style={{ display: 'inline', marginRight: 6 }} />New Password</label>
                <div style={{ position: 'relative' }}>
                  <input className="fp-input" type={showPw ? 'text' : 'password'} placeholder="Create a strong password" style={{ paddingRight: 46 }} value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  <button style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#917850', display: 'flex' }} onClick={() => setShowPw(p => !p)}>
                    {showPw ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label className="fp-label">Confirm Password</label>
                <input className="fp-input" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  style={{ borderColor: confirmPassword && newPassword !== confirmPassword ? '#dc2626' : undefined }} />
                {confirmPassword && newPassword !== confirmPassword && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 5, fontWeight: 600 }}>⚠ Passwords don't match</p>}
                {confirmPassword && newPassword === confirmPassword && <p style={{ fontSize: 12, color: '#22c55e', marginTop: 5, fontWeight: 600 }}>✓ Passwords match!</p>}
              </div>
              <button className="fp-btn" onClick={handleResetPassword} disabled={loading || !newPassword || newPassword !== confirmPassword}>
                {loading ? <ClipLoader size={18} color="white" /> : <><FaLock size={14} />Reset Password</>}
              </button>
            </>
          )}

          {err && <p style={{ color: '#dc2626', textAlign: 'center', marginTop: 14, fontSize: 13, fontWeight: 600 }}>⚠ {err}</p>}
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
