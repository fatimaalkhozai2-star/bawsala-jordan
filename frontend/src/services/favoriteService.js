
import API_URL from "./api";

// Get logged-in user's favorites
export const getFavorites = async (token) => {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get favorites");
  }

  return data;
};

// Add destination to favorites
export const addFavorite = async (destinationId, token) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      destination: destinationId
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add favorite");
  }

  return data;
};

// Remove destination from favorites
export const removeFavorite = async (favoriteId, token) => {
  const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove favorite");
  }

  return data;
};
