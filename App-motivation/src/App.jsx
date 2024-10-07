// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [quote, setQuote] = useState("Le succès, c’est d’aller d’échec en échec sans perdre son enthousiasme.");
  const [author, setAuthor] = useState("Winston Churchill");
  const [language, setLanguage] = useState("en"); // Langue par défaut : anglais
  const [loading, setLoading] = useState(false); // État de chargement

  // Fonction pour récupérer une citation dans la langue sélectionnée avec Axios
  const fetchQuoteFromAPI = async (lang) => {
    setLoading(true); // Début du chargement
    console.log(`Fetching quote for language: ${lang}`);
    try {
      const response = await axios.get(`https://gomezmig03.github.io/MotivationalAPI/${lang}.json`);
      console.log('API response:', response);
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      console.log('Selected quote:', randomQuote);
      setQuote(randomQuote.phrase);
      setAuthor(randomQuote.author);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Appeler la fonction pour charger une nouvelle citation au clic
  const handleNewQuote = () => {
    console.log('Fetching new quote...');
    fetchQuoteFromAPI(language);
  };

  // Gérer le changement de langue
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    console.log(`Language changed to: ${selectedLanguage}`);
    setLanguage(selectedLanguage);
    fetchQuoteFromAPI(selectedLanguage); // Charger une nouvelle citation dans la nouvelle langue
  };

  useEffect(() => {
    // Charger une première citation au montage du composant
    console.log('Component mounted, fetching initial quote...');
    fetchQuoteFromAPI(language);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {/* Sélecteur de langue */}
      <div className="mb-4">
        <label htmlFor="language" className="text-gray-700 font-semibold mr-2">Choisissez une langue :</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="py-2 px-4 border rounded"
        >
          <option value="en">Anglais</option>
          <option value="fr">Français</option>
          <option value="es">Espagnol</option>
          <option value="ja">Japonais</option>
        </select>
      </div>

      {/* Affichage de la citation */}
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center">
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-700">"{quote}"</p>
            <p className="text-sm text-gray-500 mt-4">- {author}</p>
          </>
        )}
        <button
          onClick={handleNewQuote}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Nouvelle citation
        </button>
      </div>
    </div>
  );
};

export default App;
