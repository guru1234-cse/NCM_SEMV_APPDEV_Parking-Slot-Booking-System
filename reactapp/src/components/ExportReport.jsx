import React from "react";
import api from "../services/axiosConfig";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

function ExportReport() {

    const exportPDF = async () => {

        const res = await api.get("reports");
        const data = res.data;

        const doc = new jsPDF();

        doc.text("Parking System Report", 20, 10);

        doc.text(`Total Users: ${data.totalUsers}`, 20, 30);
        doc.text(`Total Slots: ${data.totalSlots}`, 20, 40);
        doc.text(`Booked Slots: ${data.bookedSlots}`, 20, 50);
        doc.text(`Revenue: ₹${data.totalRevenue}`, 20, 60);

        doc.save("report.pdf");
    };

    const exportExcel = async () => {

        const res = await api.get("reports");
        const data = res.data;

        const ws = XLSX.utils.json_to_sheet([data]);
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, "Report");

        XLSX.writeFile(wb, "report.xlsx");
    };

    return (
        <div style={{ marginTop: "20px" }}>

            <button onClick={exportPDF} style={btn}>
                📄 Export PDF
            </button>

            <button onClick={exportExcel} style={btn}>
                📊 Export Excel
            </button>

        </div>
    );
}

const btn = {
    marginRight: "10px",
    padding: "10px 15px",
    background: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};

export default ExportReport;