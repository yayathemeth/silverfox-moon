import { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [moonData, setMoonData] = useState(null);

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

  // Handle user date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="app">
      <h1 className="title">MOON</h1>
      {/*<p>date : {date.split('-').reverse().join('.')}</p>*/}

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
  </>
) : (
  <p className="astro">Loading moon data...</p>
)}


      <footer>powered by Silverfox</footer>
    </div>
  );
}

export default App;
