import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [randomJokes, setRandomJokes] = useState([]);
  const [show, setShow] = useState(false);

  const fetchJoke = async () => {
    try {
      let response = await fetch("/api");
      if (response.ok) {
        let data = await response.json();
        setRandomJokes(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchJoke();
  }, []);

  const handleJokeShow = () => {
    setShow(!show);
    if (!show) {
      fetchJoke();
    }
  };

  if (!randomJokes.length) return <div>Loading....</div>;

  return (
    <div className="flex justify-center mt-8 flex-col items-center gap-4">
      <div className="text-2xl flex justify-center mt-8">
        <h2 className="pr-2">Random Jokes</h2>
        <button className="py-1 px-4 bg-green-700 text-white" onClick={handleJokeShow}>Click</button>
      </div>

      {show && (
        <div className="border w-[600px] h-[200px] border-none rounded-none flex gap-2 flex-row">
          {randomJokes.map((item) => (
            <div key={item.time} className="p-2 bg-fuchsia-100">
              <h2 className="mt-2">Author: {item.author}</h2>
              <p className="mt-4">Joke: {item.joke}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
