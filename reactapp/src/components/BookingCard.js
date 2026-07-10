import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";
function BookingCard({ booking, onRefresh }) {

    const navigate = useNavigate();

    // PAY
    const handlePay = () => {

        navigate("/payment", {
            state: {
                bookingId: booking.id,
                amount: booking.amount
            }
        });

    };

    // CANCEL
    const cancelBooking = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) return;

        try {

            await api.put(`/bookings/cancel/${id}`);

            alert("Booking cancelled successfully");

            if (onRefresh) {
                onRefresh(); // refresh list after cancel
            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Cancel failed"
            );

        }

    };

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                background: "#fff"
            }}
        >

            <p><b>Booking ID:</b> {booking.id}</p>
            <p><b>Slot ID:</b> {booking.slotId}</p>
            <p><b>Vehicle:</b> {booking.vehicleNumber}</p>
            <p><b>Amount:</b> ₹{booking.amount}</p>
            <p><b>Status:</b> {booking.status}</p>

            {/* PAY BUTTON */}
            {booking.status === "BOOKED" && (

                <button
                    onClick={handlePay}
                    style={{
                        marginTop: "10px",
                        padding: "10px 15px",
                        background: "#16A34A",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}
                >
                    💳 Pay Now
                </button>

            )}

            {/* CANCEL BUTTON */}
            {booking.status !== "CANCELLED" && (
                <button
                    onClick={() => cancelBooking(booking.id)}
                    style={{
                        marginTop: "10px",
                        padding: "10px 15px",
                        background: "#DC2626",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    ❌ Cancel Booking
                </button>
            )}
            <span style={{
    padding: "5px 10px",
    borderRadius: "10px",
    background:
        booking.status === "PAID" ? "#DCFCE7" :
        booking.status === "BOOKED" ? "#FEF9C3" :
        "#FECACA"
}}>
    {booking.status}
</span>

        </div>

    );

}

export default BookingCard;