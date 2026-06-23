import React, { useRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaHome, FaDownload, FaCheckCircle, FaClock, FaPrint } from 'react-icons/fa'
import { MdOutlineTrackChanges } from 'react-icons/md'
import axios from 'axios'
import { serverUrl } from '../App'
import { ClipLoader } from 'react-spinners'
import BrandLogo from '../components/BrandLogo'

/* ─── Same design tokens as OrderPlaced.jsx ─── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}

/* ── outer wrapper ── */
.inv{min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;background:linear-gradient(165deg,#1C1507 0%,#2E1E08 45%,#3d2610 100%);position:relative;overflow:hidden;padding:16px;}
.inv-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(244,123,31,0.08) 1px,transparent 0);background-size:32px 32px;}
.inv-orb1{position:absolute;top:-8%;right:-6%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(244,123,31,0.16),transparent 65%);}
.inv-orb2{position:absolute;bottom:-12%;left:-6%;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(250,160,64,0.09),transparent 65%);}

/* ── loading state ── */
.inv-loading{display:flex;flex-direction:column;align-items:center;gap:20px;z-index:2;}
.inv-loading-text{color:rgba(250,250,248,0.6);font-size:15px;font-weight:600;}

/* ── error state ── */
.inv-error{background:rgba(255,255,255,0.98);border-radius:36px;padding:60px 48px;max-width:480px;width:100%;text-align:center;z-index:2;box-shadow:0 40px 100px rgba(0,0,0,0.4);}
.inv-error-icon{font-size:64px;margin-bottom:20px;}
.inv-error-title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:#1C1507;margin-bottom:10px;}
.inv-error-sub{font-size:14px;color:#917850;margin-bottom:28px;line-height:1.6;}

/* ── card ── */
.inv-card{background:rgba(255,255,255,0.98);border-radius:28px;padding:28px 28px;max-width:580px;width:100%;position:relative;z-index:2;box-shadow:0 40px 100px rgba(0,0,0,0.4),0 0 0 1px rgba(244,123,31,0.1);animation:slideUp 0.65s cubic-bezier(0.16,1,0.3,1);}
@keyframes slideUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}

/* ── logo ── */
.inv-logo{display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:4px;}
.inv-logo-icon{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#F47B1F,#E8620A);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 14px rgba(244,123,31,0.4);}
.inv-logo-text{font-family:'Fraunces',serif;font-size:17px;font-weight:700;color:#1C1507;}

/* ── invoice title area ── */
.inv-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;margin-top:10px;}
.inv-title{font-family:'Fraunces',serif;font-size:1.25rem;font-weight:700;color:#1C1507;}
.inv-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:30px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;}
.inv-badge.paid{background:rgba(34,197,94,0.12);color:#16a34a;border:1.5px solid rgba(34,197,94,0.25);}
.inv-badge.pending{background:rgba(244,123,31,0.10);color:#F47B1F;border:1.5px solid rgba(244,123,31,0.25);}

.inv-meta{font-size:11px;color:#917850;margin-bottom:12px;}

/* ── divider ── */
.inv-divider{border:none;border-top:1.5px dashed rgba(244,123,31,0.2);margin:10px 0;}

/* ── section label ── */
.inv-section-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#C49A6C;margin-bottom:6px;}

/* ── customer / delivery info ── */
.inv-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;}
.inv-info-box{background:#FAFAF8;border-radius:12px;padding:10px 12px;}
.inv-info-label{font-size:9px;font-weight:700;color:#C49A6C;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;}
.inv-info-value{font-size:11.5px;font-weight:600;color:#1C1507;line-height:1.4;}

/* ── payment status banner ── */
.inv-status-banner{border-radius:14px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;}
.inv-status-banner.online{background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(22,163,74,0.04));border:1.5px solid rgba(34,197,94,0.2);}
.inv-status-banner.cod-paid{background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(22,163,74,0.04));border:1.5px solid rgba(34,197,94,0.2);}
.inv-status-banner.cod{background:linear-gradient(135deg,rgba(244,123,31,0.08),rgba(232,98,10,0.04));border:1.5px solid rgba(244,123,31,0.2);}
.inv-status-icon{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.inv-status-icon.online{background:rgba(34,197,94,0.15);}
.inv-status-icon.cod-paid{background:rgba(34,197,94,0.15);}
.inv-status-icon.cod{background:rgba(244,123,31,0.12);}
.inv-status-title{font-size:12.5px;font-weight:800;color:#1C1507;}
.inv-status-sub{font-size:11px;color:#917850;margin-top:1px;}

/* ── items table ── */
.inv-items{background:#FAFAF8;border-radius:14px;padding:10px 14px;margin-bottom:10px;}
.inv-items-header{display:grid;grid-template-columns:1fr auto auto;gap:10px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#C49A6C;padding-bottom:6px;border-bottom:1px solid rgba(244,123,31,0.12);margin-bottom:2px;}
.inv-item-row{display:grid;grid-template-columns:1fr auto auto;gap:10px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.04);align-items:center;}
.inv-item-row:last-child{border-bottom:none;}
.inv-item-name{font-size:12px;font-weight:600;color:#1C1507;}
.inv-item-shop{font-size:10px;color:#917850;margin-top:1px;}
.inv-item-qty{font-size:12px;font-weight:700;color:#917850;text-align:center;background:rgba(244,123,31,0.1);padding:2px 8px;border-radius:6px;}
.inv-item-price{font-size:12px;font-weight:700;color:#1C1507;text-align:right;}

/* ── totals ── */
.inv-totals{margin-bottom:10px;}
.inv-total-row{display:flex;justify-content:space-between;align-items:center;padding:3px 0;}
.inv-total-label{font-size:12px;color:#917850;}
.inv-total-value{font-size:12px;font-weight:600;color:#1C1507;}
.inv-total-row.grand{padding-top:8px;border-top:2px dashed rgba(244,123,31,0.2);margin-top:4px;}
.inv-total-row.grand .inv-total-label{font-size:14px;font-weight:800;color:#1C1507;font-family:'Fraunces',serif;}
.inv-total-row.grand .inv-total-value{font-size:16px;font-weight:800;color:#F47B1F;font-family:'Fraunces',serif;}

/* ── cod note ── */
.inv-cod-note{background:rgba(244,123,31,0.06);border:1.5px dashed rgba(244,123,31,0.3);border-radius:12px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:flex-start;gap:8px;}
.inv-cod-note-icon{font-size:15px;flex-shrink:0;margin-top:1px;}
.inv-cod-note-text{font-size:11px;color:#7A5C3A;line-height:1.5;}
.inv-cod-note-text strong{color:#F47B1F;display:block;margin-bottom:1px;}

/* ── paid stamp ── */
.inv-paid-stamp{background:rgba(34,197,94,0.06);border:1.5px solid rgba(34,197,94,0.2);border-radius:12px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.inv-paid-stamp-icon{font-size:17px;flex-shrink:0;}
.inv-paid-stamp-text{font-size:11px;color:#15803d;line-height:1.5;font-weight:600;}

/* ── footer note ── */
.inv-footer{text-align:center;font-size:10px;color:#C49A6C;line-height:1.5;margin-bottom:14px;}

/* ── buttons ── same classes as OrderPlaced.jsx ── */
.op-btns{display:flex;gap:10px;}
.op-btn{display:flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:14px;padding:12px 16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:12px;cursor:pointer;transition:all 0.3s;flex:1;}
.op-btn.primary{background:linear-gradient(135deg,#F47B1F,#E8620A);color:white;box-shadow:0 6px 24px rgba(244,123,31,0.45);}
.op-btn.primary:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(244,123,31,0.55);}
.op-btn.ghost{background:rgba(244,123,31,0.07);color:#F47B1F;border:2px solid rgba(244,123,31,0.2);}
.op-btn.ghost:hover{background:rgba(244,123,31,0.14);}
.op-btn.outline{background:transparent;color:#917850;border:2px solid rgba(0,0,0,0.1);}
.op-btn.outline:hover{background:rgba(0,0,0,0.04);}

/* ── responsive ── */
@media(max-width:520px){
  .inv-card{padding:24px 18px;border-radius:20px;}
  .inv-info-grid{grid-template-columns:1fr;}
  .op-btns{flex-direction:column;}
}

/* ── print styles ── */
@media print{
  @page{size:A4;margin:12mm 10mm;}
  .inv{background:white!important;padding:0;min-height:auto;}
  .inv-grid,.inv-orb1,.inv-orb2{display:none;}
  .inv-card{box-shadow:none!important;border-radius:0!important;max-width:100%!important;padding:16px 8px!important;animation:none!important;}
  .inv-logo-icon{box-shadow:none!important;}
  .inv-status-banner{padding:8px 10px!important;margin-bottom:8px!important;}
  .inv-status-icon{width:28px!important;height:28px!important;font-size:14px!important;}
  .inv-info-grid{gap:6px!important;margin-bottom:8px!important;}
  .inv-info-box{padding:8px 10px!important;border-radius:8px!important;}
  .inv-items{padding:8px 10px!important;margin-bottom:6px!important;border-radius:8px!important;}
  .inv-item-row{padding:4px 0!important;}
  .inv-totals{margin-bottom:6px!important;}
  .inv-total-row{padding:2px 0!important;}
  .inv-cod-note,.inv-paid-stamp{padding:6px 10px!important;margin-bottom:6px!important;}
  .inv-footer{margin-bottom:0!important;}
  .no-print{display:none!important;}
}
`

/* ─── Helpers ─── */
const formatDate = (d) => {
  const date = d ? new Date(d) : new Date()
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    '  •  ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

const rupee = (n) => `₹${Number(n || 0).toFixed(2)}`

/* ════════════════════════════════════════════
   InvoicePage Component
   ════════════════════════════════════════════
   Route: /invoice/:orderId
   Fetches invoice from backend API
*/
function InvoicePage() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const cardRef = useRef(null)

  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* ── Fetch invoice from backend ── */
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`${serverUrl}/api/invoice/by-order/${orderId}`, { withCredentials: true })
        setInvoice(res.data)
      } catch (err) {
        console.log('Invoice fetch error:', err)
        setError(err.response?.data?.message || 'Failed to load invoice')
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchInvoice()
    } else {
      setError('No order ID provided')
      setLoading(false)
    }
  }, [orderId])

  const handlePrint = () => window.print()

  /* ── Loading State ── */
  if (loading) {
    return (
      <div className="inv">
        <style>{S}</style>
        <div className="inv-grid" />
        <div className="inv-orb1" />
        <div className="inv-orb2" />
        <div className="inv-loading">
          <ClipLoader size={42} color="#F47B1F" />
          <div className="inv-loading-text">Loading invoice...</div>
        </div>
      </div>
    )
  }

  /* ── Error State ── */
  if (error || !invoice) {
    return (
      <div className="inv">
        <style>{S}</style>
        <div className="inv-grid" />
        <div className="inv-orb1" />
        <div className="inv-orb2" />
        <div className="inv-error">
          <div className="inv-error-icon">📄</div>
          <div className="inv-error-title">Invoice Not Found</div>
          <div className="inv-error-sub">{error || 'Could not load the invoice. Please try again.'}</div>
          <div className="op-btns">
            <button className="op-btn primary" onClick={() => navigate('/my-orders')}>
              <MdOutlineTrackChanges size={16} /> My Orders
            </button>
            <button className="op-btn outline" onClick={() => navigate('/')}>
              <FaHome size={13} /> Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isCOD = invoice.paymentMethod === 'cod'
  const isPaid = invoice.paymentStatus === 'paid'

  // Get the status banner class
  const bannerClass = isCOD ? (isPaid ? 'cod-paid' : 'cod') : 'online'

  return (
    <div className="inv">
      <style>{S}</style>
      <div className="inv-grid" />
      <div className="inv-orb1" />
      <div className="inv-orb2" />

      <div className="inv-card" ref={cardRef}>

        {/* ── Logo ── */}
        <BrandLogo size="sm" theme="light" tagline="Network" style={{ justifyContent: 'center', marginBottom: 4 }} />

        {/* ── Invoice Header ── */}
        <div className="inv-title-row">
          <div className="inv-title">Invoice</div>
          <span className={`inv-badge ${isPaid ? 'paid' : 'pending'}`}>
            {isPaid ? '✓ Paid' : '⏳ Pending'}
          </span>
        </div>
        <div className="inv-meta">
          {invoice.invoiceNumber} &nbsp;·&nbsp; {formatDate(invoice.createdAt)}
        </div>

        <hr className="inv-divider" />

        {/* ── Customer + Delivery Info ── */}
        <div className="inv-info-grid">
          <div className="inv-info-box">
            <div className="inv-info-label">Customer</div>
            <div className="inv-info-value">{invoice.customerName || 'Customer'}</div>
            {invoice.customerEmail && <div className="inv-info-value" style={{ fontSize: 11, color: '#917850' }}>{invoice.customerEmail}</div>}
            {invoice.customerMobile && <div className="inv-info-value" style={{ fontSize: 11, color: '#917850' }}>{invoice.customerMobile}</div>}
          </div>
          <div className="inv-info-box">
            <div className="inv-info-label">Delivery Address</div>
            <div className="inv-info-value">{invoice.deliveryAddress?.text || 'Address on file'}</div>
          </div>
          <div className="inv-info-box">
            <div className="inv-info-label">Payment Method</div>
            <div className="inv-info-value">{isCOD ? '💵 Cash on Delivery' : '💳 Online Payment'}</div>
          </div>
          <div className="inv-info-box">
            <div className="inv-info-label">Invoice No.</div>
            <div className="inv-info-value" style={{ fontSize: 12, letterSpacing: '0.5px' }}>{invoice.invoiceNumber}</div>
            <div className="inv-info-value" style={{ fontSize: 10, color: '#C49A6C', marginTop: 2 }}>Order: #{orderId?.slice(-8).toUpperCase()}</div>
          </div>
        </div>

        {/* ── Payment Status Banner ── */}
        <div className={`inv-status-banner ${bannerClass}`}>
          <div className={`inv-status-icon ${bannerClass}`}>
            {isPaid ? '✅' : '💵'}
          </div>
          <div>
            {isCOD ? (
              isPaid ? (
                <>
                  <div className="inv-status-title">Payment Collected ✓</div>
                  <div className="inv-status-sub">
                    Cash collected by delivery partner on {invoice.paidAt ? formatDate(invoice.paidAt) : 'delivery'}
                  </div>
                </>
              ) : (
                <>
                  <div className="inv-status-title">Cash on Delivery</div>
                  <div className="inv-status-sub">
                    Please keep exact change ready. Pay to delivery partner on arrival.
                  </div>
                </>
              )
            ) : (
              <>
                <div className="inv-status-title">Online Payment Successful</div>
                <div className="inv-status-sub">
                  Payment ID: {invoice.razorpayPaymentId || 'Verified'}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Items ── */}
        <div className="inv-section-label">Order Summary</div>
        <div className="inv-items">
          <div className="inv-items-header">
            <span>Item</span>
            <span style={{ textAlign: 'center' }}>Qty</span>
            <span style={{ textAlign: 'right' }}>Price</span>
          </div>

          {(invoice.shopOrders || []).map((shopOrder, si) => (
            <React.Fragment key={si}>
              {(shopOrder.items || []).map((item, ii) => (
                <div key={ii} className="inv-item-row">
                  <div>
                    <div className="inv-item-name">{item.name}</div>
                    {shopOrder.shopName && (
                      <div className="inv-item-shop">🏪 {shopOrder.shopName}</div>
                    )}
                  </div>
                  <div className="inv-item-qty">×{item.quantity}</div>
                  <div className="inv-item-price">{rupee(item.total || item.price * item.quantity)}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* ── Totals ── */}
        <div className="inv-totals">
          <div className="inv-total-row">
            <span className="inv-total-label">Subtotal</span>
            <span className="inv-total-value">{rupee(invoice.subtotal)}</span>
          </div>
          <div className="inv-total-row">
            <span className="inv-total-label">Delivery Fee</span>
            <span className="inv-total-value" style={{ color: invoice.deliveryFee === 0 ? '#22c55e' : undefined }}>
              {invoice.deliveryFee === 0 ? '🎉 FREE' : rupee(invoice.deliveryFee)}
            </span>
          </div>
          <div className="inv-total-row">
            <span className="inv-total-label">GST (5%)</span>
            <span className="inv-total-value">{rupee(invoice.tax)}</span>
          </div>
          <div className="inv-total-row grand">
            <span className="inv-total-label">Total Amount</span>
            <span className="inv-total-value">{rupee(invoice.totalAmount)}</span>
          </div>
        </div>

        {/* ── COD Pending Note ── */}
        {isCOD && !isPaid && (
          <div className="inv-cod-note">
            <span className="inv-cod-note-icon">📋</span>
            <div className="inv-cod-note-text">
              <strong>This is a Proforma Invoice</strong>
              Payment of <strong style={{ display: 'inline', color: '#F47B1F' }}>{rupee(invoice.totalAmount)}</strong> is due at delivery.
              Your delivery partner will carry a copy of this invoice.
              Please pay in cash upon receipt of your order.
            </div>
          </div>
        )}

        {/* ── Paid Stamp for COD delivered ── */}
        {isCOD && isPaid && (
          <div className="inv-paid-stamp">
            <span className="inv-paid-stamp-icon">✅</span>
            <div className="inv-paid-stamp-text">
              Payment of {rupee(invoice.totalAmount)} has been collected successfully.
              This invoice is fully settled.
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="inv-footer">
          Thank you for ordering with Pakwan Network 🍽️<br />
          For support: support@pakwannetwork.com &nbsp;·&nbsp; +91 98765 43210
        </div>

        {/* ── Action Buttons ── */}
        <div className="op-btns no-print">
          <button className="op-btn primary" onClick={handlePrint}>
            <FaPrint size={14} /> Print Invoice
          </button>
          <button className="op-btn ghost" onClick={() => navigate('/my-orders')}>
            <MdOutlineTrackChanges size={16} /> My Orders
          </button>
          <button className="op-btn outline" onClick={() => navigate('/')}>
            <FaHome size={13} /> Home
          </button>
        </div>

      </div>
    </div>
  )
}

export default InvoicePage