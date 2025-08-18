// Add error display and better loading state
function CropSearchAssistant() {
  // ... existing state ...
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Reset states
    setResponse('');
    setError('');
    
    if (!query.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      
      setResponse(data.reply);
    } catch (err) {
      setError(err.message || 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ... existing JSX ... */}
      
      {/* Add error display */}
      {error && <div style={{ color: 'red', marginTop: 10 }}>Error: {error}</div>}
    </div>
  );
}