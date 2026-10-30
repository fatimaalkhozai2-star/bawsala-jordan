
import API_URL from "./api";

// Get all destinations with filters
export const getDestinations = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.governorate) {
    params.append("governorate", filters.governorate);
  }

  if (filters.category) {
    params.append("category", filters.category);
  }

  const response = await fetch(
    `${API_URL}/destinations?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch destinations");
  }

  return data;
};

// Get one destination by ID
export const getDestinationById = async (id) => {
  const response = await fetch(`${API_URL}/destinations/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch destination");
  }

  return data;
};
