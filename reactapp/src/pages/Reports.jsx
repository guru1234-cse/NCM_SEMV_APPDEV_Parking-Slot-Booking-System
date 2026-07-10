import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

function Reports() {

    const [report, setReport] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [slotId, setSlotId] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {
        try {
            const res = await api.get("reports");
            setReport(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const generateReport = async () => {
        if (!startDate || !endDate) {
            alert("Please select Start Date and End Date");
            return;
        }
        try {
            let url = `reports/filter?startDate=${startDate}&endDate=${endDate}`;
            if (slotId !== "") url += `&slotId=${slotId}`;
            const res = await api.get(url);
            setReport(res.data);
        } catch (err) {
            console.log(err);
            alert("Unable to generate report");
        }
    };

    const resetReport = () => {
        setStartDate("");
        setEndDate("");
        setSlotId("");
        setStatusFilter("ALL");
        loadReport();
    };

    if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    if (!report) return null;

    const filteredBookings = (report.bookings || []).filter(b =>
        statusFilter === "ALL" ? true : b.status === statusFilter
    );

    const summaryCards = [
        { label: "Total Bookings", value: report.totalBookings, color: "#4F46E5" },
        { label: "Revenue", value: "₹" + (report.totalRevenue || 0), color: "#059669" },
        { label: "Active Users", value: report.totalUsers, color: "#2563EB" },
        { label: "Occupancy", value: (report.occupancyPercentage || 0).toFixed(1) + "%", color: "#9333EA" },
        { label: "Cancelled", value: report.cancelledBookings, color: "#EF4444" },
        { label: "Payments", value: report.totalPayments, color: "#0891B2" },
    ];

    return (
        <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>

            <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#1F2937" }}>
                📊 Parking Report
            </h2>

            {/* Filters */}
<div
    style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "18px",
        flexWrap: "wrap",
        marginBottom: "28px",
        background: "#F9FAFB",
        padding: "20px",
        borderRadius: "12px"
    }}
>

    <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={lbl}>Start Date</label>

        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
                ...inp,
                width: "170px",
                height: "42px"
            }}
        />
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={lbl}>End Date</label>

        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
                ...inp,
                width: "170px",
                height: "42px"
            }}
        />
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={lbl}>Slot ID (optional)</label>

        <input
            type="number"
            placeholder="e.g. 1"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
            style={{
                ...inp,
                width: "120px",
                height: "42px"
            }}
        />
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ ...lbl, visibility: "hidden" }}>
            Action
        </label>

        <button
            onClick={generateReport}
            style={{
                ...btnPrimary,
                height: "42px",
                minWidth: "170px"
            }}
        >
            Generate Report
        </button>
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ ...lbl, visibility: "hidden" }}>
            Action
        </label>

        <button
            onClick={resetReport}
            style={{
                ...btnSecondary,
                height: "42px",
                minWidth: "90px"
            }}
        >
            Reset
        </button>
    </div>

</div>

            {/* Summary Cards */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "16px", marginBottom: "32px"
            }}>
                {summaryCards.map(card => (
                    <div key={card.label} style={{
                        background: "#fff", borderRadius: "12px",
                        padding: "18px", textAlign: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        borderTop: `4px solid ${card.color}`
                    }}>
                        <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "8px" }}>
                            {card.label}
                        </div>
                        <div style={{ fontSize: "26px", fontWeight: "700", color: card.color }}>
                            {card.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bar Chart — Bookings Per Day */}
            <div style={{
                background: "#fff", borderRadius: "12px", padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "32px"
            }}>
                <h3 style={{ marginBottom: "16px", color: "#374151" }}>📅 Bookings Per Day</h3>
                {(report.bookingsPerDay || []).length === 0 ? (
                    <p style={{ color: "#9CA3AF", textAlign: "center" }}>No data for selected range</p>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={report.bookingsPerDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Bookings Table */}
            <div style={{
                background: "#fff", borderRadius: "12px", padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px"
                }}>
                    <h3 style={{ color: "#374151", margin: 0 }}>📋 Bookings</h3>
                    <div style={{ display: "flex", gap: "8px" }}>
                        {["ALL", "BOOKED", "PAID", "CANCELLED"].map(s => (
                            <button key={s} onClick={() => setStatusFilter(s)}
                                style={{
                                    padding: "6px 14px", borderRadius: "20px", border: "none",
                                    cursor: "pointer", fontWeight: "600", fontSize: "13px",
                                    background: statusFilter === s ? "#4F46E5" : "#E5E7EB",
                                    color: statusFilter === s ? "#fff" : "#374151"
                                }}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredBookings.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#9CA3AF" }}>No bookings found</p>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                            <thead>
                                <tr style={{ background: "#4F46E5", color: "#fff" }}>
                                    {["ID", "User ID", "Slot ID", "Vehicle", "Status", "Amount", "Booking Time"].map(h => (
                                        <th key={h} style={th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((b, i) => (
                                    <tr key={b.id} style={{ background: i % 2 === 0 ? "#fff" : "#F9FAFB" }}>
                                        <td style={td}>{b.id}</td>
                                        <td style={td}>{b.userId}</td>
                                        <td style={td}>{b.slotId}</td>
                                        <td style={td}>{b.vehicleNumber}</td>
                                        <td style={td}>
                                            <span style={{
                                                padding: "3px 10px", borderRadius: "12px",
                                                fontWeight: "600", fontSize: "12px",
                                                background: b.status === "PAID" ? "#DCFCE7"
                                                    : b.status === "CANCELLED" ? "#FEE2E2"
                                                    : "#EEF2FF",
                                                color: b.status === "PAID" ? "#15803D"
                                                    : b.status === "CANCELLED" ? "#DC2626"
                                                    : "#4F46E5"
                                            }}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td style={td}>₹{b.amount || 0}</td>
                                        <td style={td}>
                                            {b.bookingTime ? b.bookingTime.replace("T", " ").substring(0, 16) : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

const lbl = { fontSize: "13px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" };
const inp = { padding: "9px 12px", borderRadius: "8px", border: "1px solid #D1D5DB", fontSize: "14px" };
const btnPrimary = {
    padding: "10px 20px", background: "#4F46E5", color: "#fff",
    border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600"
};
const btnSecondary = {
    padding: "10px 20px", background: "#E5E7EB", color: "#374151",
    border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600"
};
const th = { padding: "12px 14px", textAlign: "center", fontWeight: "600" };
const td = { padding: "11px 14px", textAlign: "center", borderBottom: "1px solid #F3F4F6" };

export default Reports;
