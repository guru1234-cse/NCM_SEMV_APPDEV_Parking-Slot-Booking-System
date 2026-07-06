import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function DashboardCharts() {

    const [data, setData] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {
            const res = await api.get("/reports");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!data) return <h3>Loading charts...</h3>;

    const bookingData = [
        { name: "Booked", value: data.bookedSlots },
        { name: "Cancelled", value: data.cancelledBookings }
    ];

    const revenueData = [
        { name: "Revenue", value: data.totalRevenue }
    ];

    const COLORS = ["#4F46E5", "#EF4444"];

    return (
        <div style={{ marginTop: "30px" }}>

            {/* PIE CHART */}
            <h3>Booking Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={bookingData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {bookingData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            {/* BAR CHART */}
            <h3>Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#16A34A" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}

export default DashboardCharts;