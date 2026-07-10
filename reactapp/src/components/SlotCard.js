import React from "react";
import { useNavigate } from "react-router-dom";

function SlotCard({ slot }) {

    const navigate = useNavigate();

    const bookSlot = () => {

        if (slot.status !== "AVAILABLE") {

            alert("Slot is not available!");

            return;

        }

        navigate(`/book/${slot.id}`);

    };

    return (

        <div
            style={{
                background: "#FFFFFF",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                border: "1px solid #E5E7EB"
            }}
        >

            <h3
                style={{
                    color: "#4F46E5",
                    marginBottom: "15px"
                }}
            >
                🅿 {slot.slotNumber}
            </h3>

            <p>
                <strong>Vehicle :</strong> {slot.type}
            </p>

            <p>
                <strong>Price :</strong> ₹{slot.pricePerHour}/Hour
            </p>

            <p>
                <strong>Status :</strong>{" "}

                <span
                    style={{
                        color:
                            slot.status === "AVAILABLE"
                                ? "#16A34A"
                                : "#DC2626",
                        fontWeight: "bold"
                    }}
                >
                    {slot.status}
                </span>

            </p>

            <button

                onClick={bookSlot}

                disabled={slot.status !== "AVAILABLE"}

                style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    background:
                        slot.status === "AVAILABLE"
                            ? "#4F46E5"
                            : "#9CA3AF",
                    color: "white",
                    cursor:
                        slot.status === "AVAILABLE"
                            ? "pointer"
                            : "not-allowed"
                }}
            >

                {slot.status === "AVAILABLE"

                    ? "Book Now"

                    : "Unavailable"}

            </button>

        </div>

    );

}

export default SlotCard;