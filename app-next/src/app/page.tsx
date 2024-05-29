'use client';
import Link from "next/link";

export default function Home() {
  const handleLogin = () => {
    const userData = {
      "userid": "cdc8b2d4-9cf1-4f92-8522-1fb9a8f56c2e",
      "email": "igordoe@example.com",
      "password": "password123",
      "first_name": "Igor2",
      "last_name": "Doe",
      "business_operating_number": "123456789",
      "business_number": "987654321",
      "business_legal_name": "John Doe Enterprises",
      "contact_number": "+1234567890",
      "business_address": "123 Business St, Business City, BC 12345",
      "mailing_address": "PO Box 456, Business City, BC 12345"
    };
    
    // Write user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Redirect to the profile page
    window.location.href = "/profile";
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
