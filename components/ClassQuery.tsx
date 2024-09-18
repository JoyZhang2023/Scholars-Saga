import React, { useState } from 'react';

const ClassQuery = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting query:', query);
  
    const response = await fetch('/api/query-openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }), // Send the entire query
    });
  
    const data = await response.json();
    console.log('Response from API:', data);  // Log the response data
    setResult(data.response); // Adjust based on the actual response structure
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ask about classes..."
          rows={4}
          style={{ width: '100%' }}
        />
        <button type="submit">Search</button>
      </form>

      {result && (
        <div>
          {Array.isArray(result) ? (
            result.map((cls, idx) => (
              <div key={idx}>
                <h3>{cls.class_name}</h3>
                <p>{cls.professor} - {cls.class_day.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassQuery;
