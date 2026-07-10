import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import BookingCard from "../components/BookingCard";

function Bookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const response = await api.get("bookings");

            console.log("Bookings from API:", response.data);

            setBookings(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const clearHistory = async () => {

        const confirmClear = window.confirm(
            "Are you sure you want to clear all booking history?"
        );

        if (!confirmClear) return;

        try {

            await api.delete("bookings/clear-history");

            alert("Booking history cleared successfully!");

            loadBookings();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to clear booking history."
            );

        }

    };

    return (

        <div
            className="card"
            style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h2
                    style={{
                        color: "#4F46E5",
                        margin: 0
                    }}
                >
                    📋 Your Bookings
                </h2>

                <button
                    onClick={clearHistory}
                    style={{
                        background: "#DC2626",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    🗑 Clear History
                </button>

            </div>

            {

                bookings.length === 0 ? (

                    <h3
                        style={{
                            textAlign: "center",
                            color: "#666"
                        }}
                    >
                        No Bookings Found
                    </h3>

                ) : (

                    bookings.map((booking) => (

                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onRefresh={loadBookings}
                        />

                    ))

                )

            }

        </div>

    );

}

export default Bookings;