import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCount = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/count?username=${username}`);
      setCount(res.data.count);
    } catch {
      setError("Error fetching data 😢");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        💜 GMONAD Tracker
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your Twitter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl mb-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={fetchCount}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-xl transition-all"
        >
          {loading ? "Counting..." : "Check GMONAD Mentions"}
        </button>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {count !== null && !error && (
          <div className="mt-6 text-center">
            <p className="text-lg">You’ve mentioned</p>
            <p className="text-5xl font-bold mt-2">{count}</p>
            <p className="text-lg mt-2">$GMONAD times on Twitter 🚀</p>
          </div>
        )}
      </div>

      <footer className="mt-10 text-sm text-white/70">
        Built with 💜 by Ridwan
      </footer>
    </div>
  );
}
