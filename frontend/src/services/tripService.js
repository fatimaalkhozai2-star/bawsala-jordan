
import API_URL from "./api";

// Get all trips for the logged-in user
export const getTrips = async (token) => {
  const response = await fetch(`${API_URL}/trips`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get trips");
  }

  return data;
};

// Get one trip by ID
export const getTripById = async (tripId, token) => {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get trip");
  }

  return data;
};

// Create a new trip
export const createTrip = async (tripData, token) => {
  const response = await fetch(`${API_URL}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tripData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create trip");
  }

  return data;
};

// Update an existing trip
export const updateTrip = async (tripId, tripData, token) => {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tripData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update trip");
  }

  return data;
};

// Delete a trip
export const deleteTrip = async (tripId, token) => {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete trip");
  }

  return data;
};
