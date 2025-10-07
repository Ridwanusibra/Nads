"use client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/check?username=${username}`);
      const data = await res.json();
      setResult(data.count);
    } catch (err) {
      setResult("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0018] to-[#1a0042] flex flex-col items-center justify-center text-white font-sans p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        🔮 NADS G-Monad Tracker
      </h1>
      <p className="text-lg mb-6 text-gray-300 text-center max-w-lg">
        Enter your Twitter handle to see how many times you’ve mentioned
        <span className="text-purple-400 font-semibold"> $GMONAD</span>.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@username"
          className="p-3 rounded-xl bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
        />
        <button
          onClick={handleCheck}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-2xl text-white font-bold shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check G-Monad"}
        </button>
      </div>

      {result !== null && (
        <div className="mt-10 bg-white/10 p-6 rounded-2xl backdrop-blur-lg text-center shadow-lg">
          <p className="text-xl">
            {typeof result === "number" ? (
              <>
                @{username} has mentioned{" "}
                <span className="text-purple-400 font-semibold">
                  $GMONAD
                </span>{" "}
                <span className="font-bold text-purple-300">{result}</span> times!
              </>
            ) : (
              <span className="text-red-400">{result}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
