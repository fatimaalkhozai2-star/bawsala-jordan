import API_URL from "./api";

export const getDestinations = async () => {
  const response = await fetch(`${API_URL}/destinations`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch destinations");
  }

  return data;
};