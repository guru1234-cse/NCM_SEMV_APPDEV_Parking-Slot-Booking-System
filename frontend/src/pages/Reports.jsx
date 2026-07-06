import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Reports() {

    const [report, setReport] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [slotId, setSlotId] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const response = await api.get("/reports");

            setReport(response.data);

        } catch (error) {

            console.log(error);

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

            let url =
                `/reports/filter?startDate=${startDate}&endDate=${endDate}`;

            if (slotId !== "") {

                url += `&slotId=${slotId}`;

            }

            const response = await api.get(url);

            setReport(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to generate report");

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="card">

            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                Parking Report
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "30px",
                    justifyContent: "center"
                }}
            >

                <div>

                    <label>Start Date</label>

                    <br />

                    <input

                        type="date"

                        value={startDate}

                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }

                    />

                </div>

                <div>

                    <label>End Date</label>

                    <br />

                    <input

                        type="date"

                        value={endDate}

                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }

                    />

                </div>

                <div>

                    <label>Slot Id</label>

                    <br />

                    <input

                        type="number"

                        placeholder="Optional"

                        value={slotId}

                        onChange={(e) =>
                            setSlotId(e.target.value)
                        }

                    />

                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "end"
                    }}
                >

                    <button
                        onClick={generateReport}
                    >
                        Generate Report
                    </button>

                </div>

            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr
                        style={{
                            background: "#4F46E5",
                            color: "white"
                        }}
                    >

                        <th style={styles.header}>Report</th>
                        <th style={styles.header}>Value</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td style={styles.cell}>Total Users</td>
                        <td style={styles.cell}>{report.totalUsers}</td>
                    </tr>

                    <tr>
                        <td style={styles.cell}>Total Slots</td>
                        <td style={styles.cell}>{report.totalSlots}</td>
                    </tr>

                    <tr>
                        <td style={styles.cell}>Available Slots</td>
                        <td style={styles.cell}>{report.availableSlots}</td>
                    </tr>

                    <tr>
                        <td style={styles.cell}>Booked Slots</td>
                        <td style={styles.cell}>{report.bookedSlots}</td>
                    </tr>

                    <tr>
                        <td style={styles.cell}>Cancelled Bookings</td>
                        <td style={styles.cell}>{report.cancelledBookings}</td>
                    </tr>

                    <tr>
                        <td style={styles.cell}>Total Bookings</td>
                        <td style={styles.cell}>{report.totalBookings}</td>
                    </tr>
                    <tr>
    <td style={styles.cell}>Total Revenue</td>
    <td style={styles.cell}>₹{report.totalRevenue}</td>
</tr>

<tr>
    <td style={styles.cell}>Total Payments</td>
    <td style={styles.cell}>{report.totalPayments}</td>
</tr>

<tr>
    <td style={styles.cell}>Occupancy</td>
    <td style={styles.cell}>{report.occupancyPercentage}%</td>
</tr>

                </tbody>

            </table>

        </div>

    );

}

const styles = {

    header: {

        padding: "12px",
        border: "1px solid #ddd"

    },

    cell: {

        padding: "12px",
        border: "1px solid #ddd",
        textAlign: "center"

    }

};

export default Reports;