import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await api.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="card">

            <h2
                style={{
                    color: "#4F46E5",
                    marginBottom: "25px",
                    fontSize: "30px"
                }}
            >
                👥 Registered Users
            </h2>

            <div
                style={{
                    overflowX: "auto"
                }}
            >

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

                            <th style={styles.header}>ID</th>
                            <th style={styles.header}>Name</th>
                            <th style={styles.header}>Email</th>
                            <th style={styles.header}>Role</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.length === 0 ?

                            <tr>

                                <td
                                    colSpan="4"
                                    style={{
                                        textAlign: "center",
                                        padding: "25px"
                                    }}
                                >

                                    No Users Found

                                </td>

                            </tr>

                            :

                            users.map((user,index)=>(

                                <tr
                                    key={user.id}
                                    style={{
                                        background:
                                            index % 2 === 0
                                                ? "#FFFFFF"
                                                : "#F8FAFC"
                                    }}
                                >

                                    <td style={styles.cell}>
                                        {user.id}
                                    </td>

                                    <td style={styles.cell}>
                                        {user.name}
                                    </td>

                                    <td style={styles.cell}>
                                        {user.email}
                                    </td>

                                    <td style={styles.cell}>
                                        <span
                                            style={{
                                                background:
                                                    user.role === "ADMIN"
                                                        ? "#FEF3C7"
                                                        : "#DCFCE7",
                                                color:
                                                    user.role === "ADMIN"
                                                        ? "#B45309"
                                                        : "#15803D",
                                                padding: "6px 12px",
                                                borderRadius: "20px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

const styles = {

    header: {

        padding: "15px",
        textAlign: "center",
        fontSize: "16px"

    },

    cell: {

        padding: "15px",
        textAlign: "center",
        borderBottom: "1px solid #E5E7EB"

    }

};

export default Users;