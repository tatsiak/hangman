import React, { useCallback, useState } from "react";
import { Body } from "../body/body";
import { Gallows } from "../gallows/gallows";
import { Keyboard } from "../keyboard/keyboard";
import { Word } from "../word/word";
import "./app.scss";

export const App = () => {
  const [missesCount, setMissesCount] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Array<string>>([]);
  const word = "Tatsiak".toUpperCase();

  const onKeyPress = useCallback(
    (key: string) => {
      if (!word.includes(key)) {
        setMissesCount((prevMissedCount) => prevMissedCount + 1);
      }
      setPressedKeys([...pressedKeys, key]);
    },
    [pressedKeys]
  );

  return (
    <div className="app">
      <h1>Hangman Game</h1>
      <Gallows>
        <Body missesCount={missesCount} />
      </Gallows>
      <Word pressedKeys={pressedKeys} word={word} />
      <Keyboard pressedKeys={pressedKeys} onKeyPress={onKeyPress} />
    </div>
  );
};
