import React, { useCallback, useEffect, useState } from "react";
import { Body } from "../body/body";
import { Gallows } from "../gallows/gallows";
import { Keyboard } from "../keyboard/keyboard";
import { Word } from "../word/word";
import "./app.scss";

const words = [
  "wooden",
  "calculator",
  "blow",
  "cake",
  "hungry",
  "detail",
  "icy",
  "big",
  "uneven",
  "stocking",
  "volatile",
  "crow",
];

export const App = () => {
  const [missesCount, setMissesCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Array<string>>([]);
  const [word, setWord] = useState<string>();

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
  }, []);

  const uniqCharactersCount = word ? new Set(word.split("")).size : 0;

  const onKeyPress = useCallback(
    (key: string) => {
      setPressedKeys([...pressedKeys, key]);
      if (word && !word.includes(key)) {
        setMissesCount((prevMissedCount) => prevMissedCount + 1);
      } else {
        setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
      }
    },
    [pressedKeys, word]
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
      <Word pressedKeys={pressedKeys} word={word || ""} />
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
