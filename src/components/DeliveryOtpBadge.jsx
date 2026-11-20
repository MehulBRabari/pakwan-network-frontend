import React from "react";

// Shows the delivery OTP to the customer while the order is on its way.
// Renders nothing if there is no valid (unexpired) OTP.
function DeliveryOtpBadge({ shopOrder }) {
  if (!shopOrder?.deliveryOtp || shopOrder.status === "delivered") return null;
  if (
    shopOrder.otpExpires &&
    new Date(shopOrder.otpExpires).getTime() < Date.now()
  ) {
    return null;
  }

  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        background: "linear-gradient(135deg,rgba(34,197,94,0.1),rgba(22,163,74,0.05))",
        border: "1.5px solid rgba(34,197,94,0.35)",
        borderRadius: 14,
        padding: "12px 16px",
        margin: "12px 0",
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#15803d" }}>
          🔐 Delivery OTP
        </div>
        <div style={{ fontSize: 12, color: "#4a3728", marginTop: 2 }}>
          Share this code with the delivery partner at your door
        </div>
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: 8,
          color: "#15803d",
          background: "white",
          borderRadius: 10,
          padding: "4px 14px",
          border: "1px solid rgba(34,197,94,0.3)",
        }}
      >
        {shopOrder.deliveryOtp}
      </div>
    </div>
  );
}

export default DeliveryOtpBadge;
