import React, { useState } from "react";

function SearchPlaces() {
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [places, setPlaces] = useState([]); // For storing fetched places
  const [message, setMessage] = useState(""); // For displaying messages (success/error)

  // Function to handle the search
  const handleSearch = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token
    if (!token) {
      setMessage("You need to log in first."); // Check if logged in
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/places/search?keyword=${searchQuery}`, // API call
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); // Parse response
        if (data.length === 0) {
          setMessage("No places found.");
        } else {
          setPlaces(data); // Update places
          setMessage(""); // Clear message
        }
      } else {
        setMessage("Failed to fetch places. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  // Function to save a place
  const savePlace = async (place) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/place/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: place.name,
          address: place.formatted_address,
          place_id: place.place_id,
          coordinates: place.geometry ? place.geometry.location : {},
        }),
      });

      const result = await response.json();
      if (response.status === 200) {
        setMessage("Place saved successfully!");
      } else {
        setMessage(result.message || "Failed to save the place.");
      }
    } catch (error) {
      console.error("Error saving place:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Search Places</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Search for places"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {/* Message Section */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Display Places */}
      <div style={styles.placesList}>
        {places.length === 0 ? (
          <p>No places found.</p>
        ) : (
          places.map((place) => (
            <div key={place.place_id} style={styles.placeItem}>
              <h3 style={styles.placeName}>{place.name}</h3>
              <p style={styles.placeAddress}>{place.formatted_address}</p>

              {/* Coordinates */}
              {place.geometry && place.geometry.location && (
                <p style={styles.coordinates}>
                  Coordinates: Lat: {place.geometry.location.lat}, Lng:{" "}
                  {place.geometry.location.lng}
                </p>
              )}

              {/* Save Button */}
              <button
                onClick={() => savePlace(place)}
                style={styles.saveButton}
              >
                Save
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    fontSize: "1rem",
    color: "#ff0000",
    marginTop: "10px",
  },
  placesList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: "20px",
  },
  placeItem: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    padding: "20px",
    width: "80%",
    maxWidth: "500px",
    textAlign: "center",
  },
  placeName: {
    fontSize: "1.5rem",
    margin: "10px 0",
    color: "#007bff",
  },
  placeAddress: {
    fontSize: "1rem",
    marginBottom: "15px",
    color: "#555",
  },
  coordinates: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "10px",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default SearchPlaces;
