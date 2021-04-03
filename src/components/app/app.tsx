import React, { useCallback, useState } from "react";
import { Body } from "../body/body";
import { Gallows } from "../gallows/gallows";
import { Keyboard } from "../keyboard/keyboard";
import { Word } from "../word/word";
import "./app.scss";

export const App = () => {
  const [missesCount, setMissesCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Array<string>>([]);
  const word = "Tatsiak".toUpperCase();
  const uniqCharactersCount = new Set(word.split("")).size;

  const onKeyPress = useCallback(
    (key: string) => {
      setPressedKeys([...pressedKeys, key]);
      if (!word.includes(key)) {
        setMissesCount((prevMissedCount) => prevMissedCount + 1);
      } else {
        setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
      }
    },
    [pressedKeys]
  );

  return (
    <div className="app">
      <h1>Hangman Game</h1>
      <Gallows>
        <Body
          missesCount={missesCount}
          won={correctCount === uniqCharactersCount}
        />
      </Gallows>
      <Word pressedKeys={pressedKeys} word={word} />
      {missesCount > 5 || correctCount === uniqCharactersCount ? (
        <>
          <h2>
            You {correctCount === uniqCharactersCount ? "won 🎉" : "loose 😞"}
          </h2>
          <button
            onClick={() => {
              setMissesCount(0);
              setCorrectCount(0);
              setPressedKeys([]);
            }}
          >
            Try again
          </button>
        </>
      ) : (
        <Keyboard pressedKeys={pressedKeys} onKeyPress={onKeyPress} />
      )}
    </div>
  );
};
