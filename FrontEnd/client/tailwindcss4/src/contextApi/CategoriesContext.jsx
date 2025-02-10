import React, { createContext, useState, useEffect } from "react";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    // const token = localStorage.getItem("Authorization");

    const fetchCategories = async () => {
        try {
            const resp = await fetch(`http://localhost:8080/product/categories`, {
                method: "GET",
                // headers: {
                //     Authorization: `Bearer ${token}`,
                //     "Content-Type": "application/json",
                // },
            });

            if (!resp.ok) throw new Error("Failed to fetch categories");

            const response = await resp.json();
            console.log("From categoriesContext ", response);
            setCategories(response.data || []); // Ensure it's an array
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories }}>
            {children}
        </CategoriesContext.Provider>
    );
};