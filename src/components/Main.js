import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <>
      <h2 className="h2 text">Profiel</h2>
      <strong>Email:</strong> {currentUser.uid}
      <Navigation />
    </>
  );
}
