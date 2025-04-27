import { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [moonData, setMoonData] = useState(null);
  const [loadingFrame, setLoadingFrame] = useState(0);

  // Spinner frames
  const spinnerFrames = ['|', '/', '-', '\\'];

  // Fetch moon data from backend
  const fetchMoonInfo = async (selectedDate) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/moon-info?date=${selectedDate}`);
      const data = await res.json();
      console.log("Fetched data:", data);
      setMoonData(data);
    } catch (err) {
      console.error("Failed to fetch moon data:", err);
    }
  };

  // Fetch moon info on first load and when date changes
  useEffect(() => {
    fetchMoonInfo(date);
  }, [date]);

  // Handle spinner animation
  useEffect(() => {
    if (!moonData) {
      const interval = setInterval(() => {
        setLoadingFrame((prev) => (prev + 1) % spinnerFrames.length);
      }, 200); // every 200ms
      return () => clearInterval(interval);
    }
  }, [moonData]);

  // Handle user date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="app">
      <h1 className="title">MOON</h1>

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="date-picker"
      />

      {moonData ? (
        <>
          <div className="moon-emoji">{moonData.emoji}</div>
          <p>phase : {moonData.phase}</p>
          <p>sign : {moonData.sign}</p>
          <p className="astro">{moonData.description}</p>

          {/* NEW emotional dive text */}
          <div className="moon-dive">
            <p>{moonData.emotion_text}</p>
          </div>
        </>
      ) : (
        <div className="astro">
          Loading moon data... <span className="loading-spinner">{spinnerFrames[loadingFrame]}</span>
        </div>
      )}

      <footer>powered by Silverfox</footer>
    </div>
  );
}

export default App;
