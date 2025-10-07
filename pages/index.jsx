import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setCount(null);

    try {
      const res = await axios.get(`/api/count?username=${username}`);
      setCount(res.data.count);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">💜 NADS — Monad Mention Checker</h1>
      <p className="mb-4 text-center text-gray-300 max-w-md">
        Enter your Twitter handle and see how many times you’ve talked about <span className="text-purple-400">$Gmonad</span>.
      </p>

      <input
        type="text"
        placeholder="@username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-black rounded-md p-3 w-64 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleCheck}
        disabled={loading || !username}
        className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-md font-semibold disabled:bg-gray-600"
      >
        {loading ? "Checking..." : "See My Count"}
      </button>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {count !== null && !error && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-semibold text-purple-300">
            @{username.replace("@", "")} mentioned $Gmonad {count} times 💫
          </p>
        </div>
      )}
    </div>
  );
}
