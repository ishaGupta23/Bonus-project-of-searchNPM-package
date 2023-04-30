import "./styles.css";
import React, { useState, useEffect } from "react";

function App() {
  const [packageName, setPackageName] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get the user's favorite packages from local storage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const searchPackage = async () => {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    const data = await response.json();
    setPackageData(data);
    setPackageName("");
  };

  const addFavorite = (packageData, description) => {
    const favorite = { name: packageData.name, description };
    setFavorites([...favorites, favorite]);
  };

  useEffect(() => {
    // Save the user's favorite packages to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="main">
      <input
        type="text"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
      />
      <button onClick={searchPackage}>Search</button>
      {packageData && (
        <div>
          <h2>{packageData.name}</h2>
          <p>{packageData.description}</p>

          <button
            onClick={() =>
              addFavorite(packageData, prompt("Why do you like this package?"))
            }
          >
            Favorite
          </button>
        </div>
      )}
      {favorites.length > 0 && (
        <div>
          <h2>My Favorites</h2>
          <ol>
            {favorites.map((favorite, index) => (
              <li key={index}>
                <h3>{favorite.name}</h3>
                <p>{favorite.description}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
