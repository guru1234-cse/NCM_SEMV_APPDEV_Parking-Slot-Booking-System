import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import SlotCard from "../components/SlotCard";

function ParkingSlots() {

    const [slots, setSlots] = useState([]);
    const [filteredSlots, setFilteredSlots] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSlots();

    }, []);

    const loadSlots = async () => {

        try {

            const response = await api.get("/slots/available");

            setSlots(response.data);
            setFilteredSlots(response.data);

        } catch (err) {

    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log(err);

}finally {

            setLoading(false);

        }

    };

    const handleFilter = (value) => {

        setFilter(value);

        if (value === "All") {

            setFilteredSlots(slots);

        } else {

            setFilteredSlots(

                slots.filter(

                    slot =>

                        slot.type === value ||

                        slot.slotType === value

                )

            );

        }

    };

    return (

        <div className="card">

            <h2
                style={{
                    fontSize: "52px",
                    fontWeight: "700",
                    marginBottom: "40px"
                }}
            >

                Available Parking Slots

            </h2>

            <div
                style={{
                    marginBottom: "40px"
                }}
            >

                <label
                    style={{
                        fontSize: "24px",
                        fontWeight: "600"
                    }}
                >

                    Filter by type:

                </label>

                <br /><br />

                <select

                    value={filter}

                    onChange={(e)=>handleFilter(e.target.value)}

                    style={{

                        width:"220px",

                        height:"45px",

                        fontSize:"20px",

                        borderRadius:"8px",

                        paddingLeft:"10px"

                    }}

                >

                    <option>All</option>
                    <option>CAR</option>
                    <option>BIKE</option>

                </select>

            </div>

            {

                loading ?

                <div
                    style={{
                        textAlign:"center",
                        fontSize:"32px",
                        color:"#777",
                        marginTop:"80px",
                        fontStyle:"italic"
                    }}
                >

                    Loading...

                </div>

                :

                filteredSlots.length===0 ?

                <div
                    style={{
                        textAlign:"center",
                        fontSize:"32px",
                        color:"#777",
                        marginTop:"80px",
                        fontStyle:"italic"
                    }}
                >

                    No slots found.

                </div>

                :

                <div

                    style={{

                        display:"grid",

                        gridTemplateColumns:

                        "repeat(auto-fill,minmax(280px,1fr))",

                        gap:"25px"

                    }}

                >

                    {

                        filteredSlots.map(slot=>

                            <SlotCard

                                key={slot.id}

                                slot={slot}

                            />

                        )

                    }

                </div>

            }

        </div>

    );

}

export default ParkingSlots;