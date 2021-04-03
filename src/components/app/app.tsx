import React, { useEffect, useState } from "react";
import { Body } from "../body/body";
import { Gallows } from "../gallows/gallows";
import "./app.scss";

export const App = () => {
  const [missesCount, setMissesCount] = useState(0);

  useEffect(() => {
    document.addEventListener("click", () => {
      setMissesCount((prev) => prev + 1);
    });
  }, []);

  return (
    <div className="app">
      <h1>Hangman Game</h1>

      <Gallows>
        <Body missesCount={missesCount} />
      </Gallows>
    </div>
  );
};
