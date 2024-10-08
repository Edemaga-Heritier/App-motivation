// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ThemeToggle from "./themeSwitcher"; // Importer le nouveau composant

const App = () => {
  const [quote, setQuote] = useState("Le succès, c’est d’aller d’échec en échec sans perdre son enthousiasme.");
  const [author, setAuthor] = useState("Winston Churchill");
  const [language, setLanguage] = useState("en"); // Langue par défaut : anglais
  const [loading, setLoading] = useState(false); // État de chargement
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Charger le thème depuis le localStorage
  });

  // Fonction pour récupérer une citation dans la langue sélectionnée avec Axios
  const fetchQuoteFromAPI = async (lang) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://gomezmig03.github.io/MotivationalAPI/${lang}.json`);
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      setQuote(randomQuote.phrase);
      setAuthor(randomQuote.author);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false);
    }
  };

  // Appeler la fonction pour charger une nouvelle citation au clic
  const handleNewQuote = () => {
    fetchQuoteFromAPI(language);
  };

  // Gérer le changement de langue
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    fetchQuoteFromAPI(selectedLanguage);
  };

  useEffect(() => {
    fetchQuoteFromAPI(language); // Charger une première citation au montage du composant
  }, [language]);

  useEffect(() => {
    // Appliquer le thème en ajoutant la classe correspondante au body
    document.body.className = theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white";
  }, [theme]);

  // Fonction pour basculer entre le thème clair et sombre
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Sauvegarder dans le localStorage
  };

  return (
    <div className={`flex flex-col justify-center items-center h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> {/* Utiliser le nouveau composant */}

      {/* Sélecteur de langue */}
      <div className="mb-4">
        <label htmlFor="language" className={`font-semibold mr-2 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
          Choisissez une langue :
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className={`py-2 px-4 border rounded ${theme === "light" ? "text-gray-700 bg-white border-gray-300" : "text-white bg-gray-800 border-gray-600"}`}
        >
          <option value="en">Anglais</option>
          <option value="fr">Français</option>
          <option value="es">Espagnol</option>
          <option value="ja">Japonais</option>
        </select>
      </div>

      {/* Affichage de la citation */}
      <div className={`p-10 rounded-lg shadow-lg max-w-md text-center ${theme === "light" ? "bg-white text-gray-700" : "bg-gray-800 text-white"}`}>
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <>
            <p className="text-lg font-semibold">"{quote}"</p>
            <p className="text-sm mt-4">- {author}</p>
          </>
        )}
        <button
          onClick={handleNewQuote}
          className={`mt-6 py-2 px-4 rounded ${theme === "light" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-700 text-white hover:bg-blue-800"}`}
        >
          Nouvelle citation
        </button>
      </div>
    </div>
  );
};

export default App;
