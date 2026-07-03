import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    // 👇 Get data from BookingHistory "Pay Now"
    const bookingIdFromState = location.state?.bookingId || "";
    const amountFromState = location.state?.amount || "";

    const [bookingId] = useState(bookingIdFromState);
    const [amount] = useState(amountFromState);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.post("/payments", {

                bookingId: Number(bookingId),
                amount: Number(amount),
                paymentMethod

            });

            alert(
                "✅ Payment Successful\n\n" +
                "Payment ID: " + response.data.id +
                "\nStatus: " + response.data.paymentStatus
            );

            // go back to history
            navigate("/history");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Payment Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#F3F4F6",
                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "30px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                }}
            >

                <h2 style={{ textAlign: "center", color: "#4F46E5" }}>
                    💳 Payment
                </h2>

                <form onSubmit={handlePayment}>

                    {/* Booking ID (readonly) */}
                    <div style={{ marginBottom: "18px" }}>
                        <label><b>Booking ID</b></label>
                        <input
                            type="number"
                            value={bookingId}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginTop: "8px",
                                borderRadius: "8px",
                                border: "1px solid #D1D5DB"
                            }}
                        />
                    </div>

                    {/* Amount (readonly) */}
                    <div style={{ marginBottom: "18px" }}>
                        <label><b>Amount (₹)</b></label>
                        <input
                            type="number"
                            value={amount}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginTop: "8px",
                                borderRadius: "8px",
                                border: "1px solid #D1D5DB"
                            }}
                        />
                    </div>

                    {/* Payment Method */}
                    <div style={{ marginBottom: "25px" }}>
                        <label><b>Payment Method</b></label>

                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginTop: "8px",
                                borderRadius: "8px",
                                border: "1px solid #D1D5DB"
                            }}
                        >
                            <option value="UPI">UPI</option>
                            <option value="CARD">Card</option>
                            <option value="NET_BANKING">Net Banking</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !bookingId}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "10px",
                            background: "#4F46E5",
                            color: "#fff",
                            fontSize: "16px",
                            cursor: "pointer",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Processing..." : "💳 Pay Now"}
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Payment;