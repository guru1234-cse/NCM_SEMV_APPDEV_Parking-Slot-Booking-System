import React, { useState } from "react";
import axios from "axios";

function BookSlot() {

    const [userId, setUserId] = useState("");
    const [slotId, setSlotId] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");

    const bookSlot = async () => {

        try {

            await axios.post("http://localhost:8081/api/bookings", {

                userId: Number(userId),
                slotId: Number(slotId),
                vehicleNumber: vehicleNumber

            });

            alert("Booking Successful");

            window.location.reload();

        }
        catch (error) {

            alert(error.response?.data || "Booking Failed");

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Book Parking Slot</h2>

            <input
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Slot ID"
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
            />

            <br /><br />

            <button onClick={bookSlot}>
                Book Slot
            </button>

        </div>

    );

}

export default BookSlot;