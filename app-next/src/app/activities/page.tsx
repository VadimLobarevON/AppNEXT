'use client'
import React from "react";
import { useState, useEffect } from "react";
import Header from "../../../components/Header";

const ActivitiesPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [forms, setForms] = useState([]);
  const [searchFormName, setSearchFormName] = useState('');
  const [searchFormType, setSearchFormType] = useState('');

  const handleInputNameChange = (e) => {
    const inputValue = e.target.value;
    setSearchFormName(inputValue);
    filterForms(inputValue, searchFormType);
  };

  const handleInputTypeChange = (e) => {
    const inputValue = e.target.value;
    setSearchFormType(inputValue);
    filterForms(searchFormName, inputValue);
  };

  const filterForms = (nameValue, typeValue) => {
    let filteredForms = forms;

    if (nameValue !== '') {
      filteredForms = filteredForms.filter(form =>
        form.form_name.toLowerCase().includes(nameValue.toLowerCase())
      );
    }

    if (typeValue !== '') {
      filteredForms = filteredForms.filter(form =>
        form.form_type.toLowerCase().includes(typeValue.toLowerCase())
      );
    }

    if (filteredForms.length === 0) {
      filteredForms = [{
        "createdOn": "-",
        "form_name": "-",
        "form_type": "-",
        "formid": "-",
        "modifiedOn": "-"
      }];
    }

    setFilteredData(filteredForms);
  };

  const SortBy = (name, value) => {
    // Reset both sorting options to "None"
    if (name === "CreatedOn") {
      document.getElementById("sortByModifiedOn").value = ""; // Reset ModifiedOn dropdown
    } else if (name === "ModifiedOn") {
      document.getElementById("sortByCreateOn").value = ""; // Reset CreatedOn dropdown
    }

    let sortedData;
    if (value === "newest" && name === "CreatedOn") {
      sortedData = filteredData.slice().sort((a, b) => new Date(b.modifiedOn) - new Date(a.createdOn));
    } else if (value === "oldest" && name === "CreatedOn") {
      sortedData = filteredData.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    } else if (value === "newest" && name === "ModifiedOn") {
      sortedData = filteredData.slice().sort((a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn));
    } else if (value === "oldest" && name === "ModifiedOn") {
      sortedData = filteredData.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.modifiedOn));
    } else {
      sortedData = filteredData;
    }

    setFilteredData(sortedData);
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://4.172.130.199/forms/UUID`, {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }
        const data = await response.json();
        setFilteredData(data);
        setForms(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching form data:", error);
        // Display error message to user or handle the error accordingly
      }
    };

    fetchFormData();
  }, []);

  const handleModifyForm = (formId) => {
    console.log(formId);
    console.log(filteredData);
    let formType, formName;
    filteredData.forEach(form => {
      formType = form.form_type;
      formName = form.form_name;
      formType = formType.replace(/\s+/g, '');
      formName = formName.replace(/\s+/g, '');
    });
    
    const userId = JSON.parse(localStorage.getItem("user")).email;

    const link = `https://dev.cxp.mgcs.gov.on.ca/on-form/#/${formType}/${userId}/${formName}`;
    console.log(link);
    window.open(link, '_blank');
  };

  const renderForms = () => {
    if (!filteredData || filteredData.length === 0) {
      return <div>No data to display</div>;
    }

    const keys = Object.keys(filteredData[0]).filter((key) => key !== "formid");

    return (
      <table>
        <thead>
          <tr>
            <th colSpan={keys.length + 1}>
            </th>
          </tr>
          <tr>
            <th>
              <select
                id="sortByCreateOn"
                defaultValue=""
                onChange={(e) => SortBy('CreatedOn', e.target.value)}
              >
                <option value="">None</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Form Name"
                value={searchFormName}
                onChange={handleInputNameChange}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Form Type"
                value={searchFormType}
                onChange={handleInputTypeChange}
              />
            </th>
            <th>
              <select
                id="sortByModifiedOn"
                defaultValue=""
                onChange={(e) => SortBy('ModifiedOn', e.target.value)}
              >
                <option value="">None</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </th>
            <th>
            </th>
          </tr>
          <tr>
            {keys.map((key) => (
              <th key={key}>
                {key}
              </th>
            ))}
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>
                  {item[key]}
                </td>
              ))}
              <td>
                <button
                  onClick={() => handleModifyForm(item.formid)}
                >
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Header />
      <h1>
        Welcome to the Activities page
      </h1>
      <div>
        {renderForms()}
      </div>
    </div>
  );
};

export default ActivitiesPage;
