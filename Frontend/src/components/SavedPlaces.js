import React, { useState, useEffect } from "react";

function SavedPlaces({ user }) {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(null); // Track saving state for individual places

  // Fetch saved places from the API
  const fetchSavedPlaces = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/place/saved", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSavedPlaces(result); // Assume result is the list of saved places
        setMessage("");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to fetch saved places.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessage("An error occurred while fetching saved places.");
    } finally {
      setLoading(false);
    }
  };

  // Save a place using the API
  const savePlace = async (placeId) => {
    const token = localStorage.getItem("token");

    setSaving(placeId); // Track the place being saved
    try {
      const response = await fetch("http://localhost:5000/place/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeId }), // Send placeId in the request body
      });

      if (response.ok) {
        setMessage("Place saved successfully!");
        fetchSavedPlaces(); // Refresh the saved places list
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to save the place.");
      }
    } catch (error) {
      console.error("Save Error:", error);
      setMessage("An error occurred while saving the place.");
    } finally {
      setSaving(null); // Reset saving state
    }
  };

  // Fetch saved places on component mount
  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  return (
    <div className="saved-places-container">
      <h2>Saved Places</h2>

      {/* Display a message */}
      {message && <p className="message">{message}</p>}

      {loading ? (
        <p>Loading saved places...</p>
      ) : (
        <div className="places-list">
          {savedPlaces.length === 0 ? (
            <p>No saved places yet.</p>
          ) : (
            <div className="places-grid">
              {savedPlaces.map((place) => (
                <div key={place.place_id} className="place-card">
                  <img
                    src={place.img || "default-image.jpg"}
                    alt={place.name}
                    className="place-image"
                  />
                  <div className="place-details">
                    <h3>{place.name}</h3>
                    <p>{place.address}</p>
                  </div>
                  {/* Save Button */}
                  <button
                    className="save-btn"
                    onClick={() => savePlace(place.place_id)}
                    disabled={saving === place.place_id} // Disable if currently saving
                  >
                    {saving === place.place_id ? "Saving..." : "Save"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SavedPlaces;
