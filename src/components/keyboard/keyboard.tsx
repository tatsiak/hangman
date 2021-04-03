import classNames from "classnames";
import React from "react";
import "./keyboard.scss";

const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const row3 = ["Z", "X", "C", "V", "B", "N", "M"];
const rows = [row1, row2, row3];
export const Keyboard = ({
  onKeyPress,
  pressedKeys,
}: {
  onKeyPress: (key: string) => void;
  pressedKeys: Array<string>;
}) => {
  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div className="keyboard__row" key={i}>
          {row.map((key) => (
            <button
              key={key}
              className={classNames("keyboard__key", {
                "keyboard__key--pressed": pressedKeys.includes(key),
              })}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
