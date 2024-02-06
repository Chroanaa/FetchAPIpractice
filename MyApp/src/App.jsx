import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [synonyms, setSynonyms] = useState([]);
  const [yourWord, setYourWord] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting", yourWord);
    console.log(`https://api.datamuse.com/words?rel_syn=${yourWord}`);
  }
  useEffect(() => {
    fetch(`https://api.datamuse.com/words?rel_syn=${yourWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setSynonyms(data.map((word) => word.word));
      });
  }, [yourWord]);
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="yourWord">Word:</label>
        <input
          value={yourWord}
          type="text"
          id="yourWord"
          onChange={(e) => setYourWord(e.target.value)}
          name="yourWord"
        />
        <button>submit request</button>
      </form>
      <h1>Synonyms for {yourWord}</h1>
      <ul>
        {synonyms.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
