import React from "react";

import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import BookingForm from "./BookingForm";
import ParkingSlots from "./ParkingSlots";
import Bookings from "./Bookings";
import Users from "./Users";
import DashboardCharts from "../charts/DashboardCharts";
function Dashboard() {

    return (

        <div className="app">

            {/* Navbar */}
            <Navbar />

            {/* Dashboard Statistics */}
            <DashboardStats />
                <div className="booking-form-container">

                    <BookingForm />

                </div>

            {/* Main Dashboard */}
            <div className="dashboard">

                {/* Parking Slots */}
                <div className="left-panel">

                    <ParkingSlots />

                </div>

                {/* Booking History */}
                <div className="right-panel">

                    <Bookings />

                </div>

            </div>
            <DashboardCharts />

            {/* Users */}
            <div className="users-section">

                <Users />

            </div>

        </div>

    );

}

export default Dashboard;