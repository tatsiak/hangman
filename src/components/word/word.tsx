import classNames from "classnames";
import React from "react";
import "./word.scss";

export const Word = ({
  pressedKeys,
  word,
}: {
  pressedKeys: Array<string>;
  word: string;
}) => {
  const characters = word.split("");
  return (
    <div className="word">
      {characters.map((char, i) => (
        <div
          key={char + i}
          className={classNames("word__char", {
            "word__char--correct": pressedKeys.includes(char.toUpperCase()),
          })}
        >
          {char}
        </div>
      ))}
    </div>
  );
};
