import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/count");
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
      setCount("Error fetching count");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6">MonadVibes 🔮</h1>
      <p className="mb-6 text-gray-400">
        See how many times “Gmonad” has been said on Twitter.
      </p>
      <button
        onClick={fetchCount}
        disabled={loading}
        className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
      >
        {loading ? "Loading..." : "Fetch Count"}
      </button>
      {count !== null && (
        <p className="mt-6 text-lg">
          Total mentions: <span className="font-semibold">{count}</span>
        </p>
      )}
    </div>
  );
}￼Enter
