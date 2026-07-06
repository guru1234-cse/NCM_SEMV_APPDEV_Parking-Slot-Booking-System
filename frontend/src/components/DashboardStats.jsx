import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function DashboardStats() {

    const [stats, setStats] = useState({

        totalUsers: 0,

        totalSlots: 0,

        availableSlots: 0,

        bookedSlots: 0,

        totalBookings: 0,

        cancelledBookings: 0,

        totalRevenue: 0,

        totalPayments: 0,

        occupancyPercentage: 0

    });

    useEffect(() => {

    loadStats();

    const interval = setInterval(() => {
        loadStats();
    },3000);

    return () => clearInterval(interval);

},[]);
    const loadStats = async () => {

    try {

        const response = await api.get("/reports");

        console.log("Response:", response.data);

        setStats(response.data);

    } catch (error) {

        console.log(error);

    }

};

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
                marginBottom: "30px"
            }}
        >

            <Card
                title="👥 Total Users"
                value={stats.totalUsers}
                color="#2563EB"
            />

            <Card
                title="🚗 Total Slots"
                value={stats.totalSlots}
                color="#7C3AED"
            />

            <Card
                title="🟢 Available Slots"
                value={stats.availableSlots}
                color="#16A34A"
            />

            <Card
                title="🔴 Booked Slots"
                value={stats.bookedSlots}
                color="#DC2626"
            />

            <Card
                title="📋 Total Bookings"
                value={stats.totalBookings}
                color="#EA580C"
            />

            <Card
                title="❌ Cancelled"
                value={stats.cancelledBookings}
                color="#EF4444"
            />

            <Card
                title="💰 Revenue"
                value={"₹" + stats.totalRevenue}
                color="#059669"
            />

            <Card
                title="💳 Payments"
                value={stats.totalPayments}
                color="#0891B2"
            />

            <Card
                title="📈 Occupancy"
                value={stats.occupancyPercentage + "%"}
                color="#9333EA"
            />

        </div>

    );

}

function Card({ title, value, color }) {

    return (

        <div
            style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "22px",
                boxShadow: "0 6px 18px rgba(0,0,0,.08)",
                borderLeft: `6px solid ${color}`,
                textAlign: "center"
            }}
        >

            <h4
                style={{
                    color: "#374151",
                    marginBottom: "15px"
                }}
            >
                {title}
            </h4>

            <h2
                style={{
                    color: color,
                    fontSize: "30px"
                }}
            >
                {value}
            </h2>

        </div>

    );

}

export default DashboardStats;