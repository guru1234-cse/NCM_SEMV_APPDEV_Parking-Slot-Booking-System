import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function BookingForm() {

    const [userId, setUserId] = useState("");
    const [slotId, setSlotId] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        loadSlots();
    }, []);

    const loadSlots = async () => {

        try {

            const response = await api.get("/slots/available");

            setSlots(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleBooking = async (e) => {

        e.preventDefault();

        if (!slotId) {

            alert("Please select a parking slot.");

            return;

        }

        try {

            const booking = {

                userId: Number(userId),

                slotId: Number(slotId),

                vehicleNumber: vehicleNumber

            };

           await api.post("/bookings", booking);

alert("Booking Successful!");

setUserId("");
setVehicleNumber("");
setSlotId("");

await loadSlots();

// Refresh dashboard so Your Bookings is updated
window.location.reload();

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Booking Failed");

            }

        }

    };

    return (

        <div
            className="card"
            style={{
                maxWidth: "650px",
                margin: "30px auto",
                padding: "30px"
            }}
        >

            <h2
                style={{
                    color: "#4F46E5",
                    marginBottom: "20px"
                }}
            >
                🚗 Book Parking Slot
            </h2>

            <form onSubmit={handleBooking}>

                <div style={{ marginBottom: "15px" }}>

                    <label><b>User ID</b></label>

                    <input
                        type="number"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        required
                    />

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label><b>Select Available Parking Slot</b></label>

                    <select
                        className="form-control"
                        value={slotId}
                        onChange={(e) => setSlotId(e.target.value)}
                        required
                    >

                        <option value="">
                            -- Select Parking Slot --
                        </option>

                        {
                            slots.map((slot) => (

                                <option
                                    key={slot.id}
                                    value={slot.id}
                                >
                                    {slot.slotNumber} | {slot.type} | ₹{slot.pricePerHour}/Hour
                                </option>

                            ))
                        }

                    </select>

                </div>

                <div style={{ marginBottom: "20px" }}>

                    <label><b>Vehicle Number</b></label>

                    <input
                        type="text"
                        className="form-control"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="Enter Vehicle Number"
                        required
                    />

                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#4F46E5",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "17px",
                        cursor: "pointer"
                    }}
                >
                    Confirm Booking
                </button>

            </form>

        </div>

    );

}

export default BookingForm;