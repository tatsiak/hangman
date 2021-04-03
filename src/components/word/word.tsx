import classNames from "classnames";
import React from "react";
import "./word.scss";

export const Word = ({
  pressedKeys,
  word,
  showWord,
}: {
  pressedKeys: Array<string>;
  word: string;
  showWord: boolean;
}) => {
  const characters = word.split("");
  return (
    <div className="word">
      {characters.map((char, i) => (
        <div
          key={char + i}
          className={classNames("word__char", {
            "word__char--correct":
              pressedKeys.includes(char.toUpperCase()) || showWord,
          })}
        >
          {pressedKeys.includes(char.toUpperCase()) || showWord ? char : ""}
        </div>
      ))}
    </div>
  );
};
