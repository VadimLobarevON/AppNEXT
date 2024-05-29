'use client'
import { useState, useEffect, useRef } from "react";
import Header from "../../../components/Header";


export default function ServicesPage() {
  const [user, setUser] = useState(null);
  const [selectedForm, setSelectedForm] = useState("");
  const [formName, setFormName] = useState(""); // Added state for form name
  const [formTypes, setFormTypes] = useState([]);
  const uuidRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from local storage
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        uuidRef.current = userData?.Email; // Store the UUID in the ref
  
        // Fetch form types from the provided URL
        const response = await fetch("http://4.172.130.199/form-types", {
          credentials: "include" // equivalent to withCredentials: true
        });
        if (!response.ok) {
          throw new Error("Failed to fetch form types");
        }
        const data = await response.json();
        setFormTypes(data);
      } catch (error) {
        console.error("Error fetching form types:", error);
        // Display error message to user or handle the error accordingly
      }
    };
  
    fetchData();
  }, []);
  

  function redirectToForm() {
    if (!user || !selectedForm) {
      // User not logged in or form not selected, handle accordingly
      return;
    }
    
    // Construct link with formatted selectedForm (removing spaces)
    const formattedSelectedForm = selectedForm.replace(/\s+/g, '');
    const userId = JSON.parse(localStorage.getItem("user")).email;

    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${formattedSelectedForm}/${userId}/NEW-${formName}`;
    console.log(link);
    window.open(link, '_blank');
  }

  return (
    <div >
      <Header />
      <h1 >Welcome to the Services page</h1>
      <div >
        <select
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
          
        >
          <option value="">Select a form</option>
          {formTypes.map((formType, index) => (
            <option key={index} value={formType}>{formType}</option>
          ))}
        </select>
      </div>
      {/* Added input for form name */}
      <div >
        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          
        />
      </div>
      <div>
        <button  onClick={redirectToForm}>Fill and submit</button>
      </div>
    </div>
  );
}
