import classNames from "classnames";
import React from "react";
import { maxMisses } from "../app/app";
import "./body.scss";

export const Body = ({
  missesCount = 0,
  won,
}: {
  missesCount: number;
  won: boolean;
}) => {
  return (
    <div
      className={classNames("body", {
        "body--dead": missesCount > maxMisses,
        "body--won": won,
      })}
    >
      <div
        className={classNames("body__head", {
          "body__head--missed": missesCount > 0,
          "body__head--dead": missesCount > maxMisses,
        })}
      />
      <div
        className={classNames("body__torso", {
          "body__torso--missed": missesCount > 1,
        })}
      >
        <div
          className={classNames("body__hand body__hand--left", {
            "body__hand--missed": missesCount > 2,
          })}
        />
        <div
          className={classNames("body__hand body__hand--right", {
            "body__hand--missed": missesCount > 3,
          })}
        />
        <div
          className={classNames("body__leg body__leg--left", {
            "body__leg--missed": missesCount > 4,
          })}
        />
        <div
          className={classNames("body__leg body__leg--right", {
            "body__leg--missed": missesCount > 5,
          })}
        />
      </div>
    </div>
  );
};
