import React, { useCallback, useEffect, useState } from "react";
import { Body } from "../body/body";
import { Gallows } from "../gallows/gallows";
import { Keyboard } from "../keyboard/keyboard";
import { Word } from "../word/word";
import "./app.scss";

export const maxMisses = 5;
export const App = () => {
  const [games, setGames] = useState(1);
  const [missesCount, setMissesCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Array<string>>([]);
  const [word, setWord] = useState<string>();
  const [hintsCount, setHintsCount] = useState(3);
  const uniqCharactersCount = word ? new Set(word.split("")).size : 0;
  const shouldShowHint = missesCount > 3 && hintsCount >= 1;
  const isGameOver =
    missesCount > maxMisses || correctCount === uniqCharactersCount;

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => setWord(data[0].toUpperCase()));
  }, [games]);

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

  const onUseHint = useCallback(() => {
    setHintsCount((hints) => hints - 1);
    if (word) {
      const unusedChar =
        word.split("").find((char) => !pressedKeys.includes(char)) || "";
      setPressedKeys([...pressedKeys, unusedChar]);
      setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
    }
  }, [pressedKeys, word]);

  return (
    <div className="app">
      {word ? (
        <>
          <h1>Hangman Game</h1>
          <Gallows>
            <Body
              missesCount={missesCount}
              won={correctCount === uniqCharactersCount}
            />
          </Gallows>
          <Word pressedKeys={pressedKeys} word={word} showWord={isGameOver} />
          {isGameOver ? (
            <>
              <h2>
                {correctCount === uniqCharactersCount
                  ? "You won 🎉"
                  : "You lost 😞"}
              </h2>
              <button
                onClick={() => {
                  setMissesCount(0);
                  setCorrectCount(0);
                  setPressedKeys([]);
                  setWord(undefined);
                  setGames((games) => games + 1);
                }}
              >
                Try again
              </button>
            </>
          ) : (
            <>
              <Keyboard pressedKeys={pressedKeys} onKeyPress={onKeyPress} />
              {shouldShowHint && (
                <button onClick={onUseHint}>
                  you have {hintsCount} hint{hintsCount === 1 ? "" : "s"} 💡
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <span className="app__loading">⚙️</span>
      )}
    </div>
  );
};
