import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import BookingCard from "../components/BookingCard";

function BookingHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const response = await api.get("/bookings");
            setHistory(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    const clearHistory = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to clear all booking history?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete("/bookings/clear-history");

            alert("Booking history cleared successfully.");

            setHistory([]);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to clear booking history."
            );

        }

    };

    return (

        <div className="card">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h2>Booking History</h2>

                <button
                    onClick={clearHistory}
                    style={{
                        background: "#DC2626",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    🗑 Clear History
                </button>

            </div>

            {

                history.length === 0 ?

                    <h3>No Booking History</h3>

                    :

                    history.map((booking) => (

                        <BookingCard
                            key={booking.id}
                            booking={booking}
                        />

                    ))

            }

        </div>

    );

}

export default BookingHistory;