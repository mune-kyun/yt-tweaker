import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"

const BLOCKED_TEXT_KEY = "blocked_text";

function IndexPopup() {
  const storage = new Storage();
  const [pattern, setPattern] = useState("");

  useEffect(() => {
    async function fetchPattern() {
      try {
        setPattern(await storage.get(BLOCKED_TEXT_KEY));
      } catch (err) {
        console.error(err);
      }
    }

    fetchPattern();
  }, []);

  const submitPattern = async (event) => {
    event.preventDefault();
    await storage.set(BLOCKED_TEXT_KEY, pattern);
  };

  return (
    <div
      style={{
        padding: 16
      }}>
      <form onSubmit={submitPattern}>
        <h2> Set pattern </h2>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
        <button>Set</button>
      </form>
    </div>
  );
}

export default IndexPopup;