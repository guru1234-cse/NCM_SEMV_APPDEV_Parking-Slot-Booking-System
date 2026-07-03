import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Reports from "./pages/Reports";
import "./App.css";
import Payment from "./pages/Payment";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import BookingForm from "./pages/BookingForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingHistory from "./pages/BookingHistory";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Redirect root to login */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Public Routes */}
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
    path="/payment"
    element={
        <ProtectedRoute>
            <Payment />
        </ProtectedRoute>
    }
/>

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
    path="/reports"
    element={
        <ProtectedRoute>
            <Reports />
        </ProtectedRoute>
    }
/>

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/book/:slotId"
                    element={
                        <ProtectedRoute>
                            <BookingForm />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <BookingHistory />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;