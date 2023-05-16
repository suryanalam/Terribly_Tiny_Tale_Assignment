import React, { useState } from 'react';
import axios from 'axios';

function FetchData() {
  const [wordFrequencies, setWordFrequencies] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const words = response.data.split(/\s+/);
      const frequencies = {};

      words.forEach((word) => {
        frequencies[word] = (frequencies[word] || 0) + 1;
      });

      setWordFrequencies(frequencies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
      <div>
        <h2>Word Frequencies:</h2>
        {
            Object.entries(wordFrequencies).map(([word,frequency]) =>(
                <div>
                    <p>{word}: <span   style={{'fontWeight':'bold'}} >{frequency}</span></p>
                </div>
            ))
        }
      </div>
    </div>
  );
}

export default FetchData;
