import React from "react";
import "./gallows.scss";

export const Gallows = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="gallows">
      <div className="gallows__rope" />
      <div className="gallows__joist" />
      <div className="gallows__stand" />
      <div className="gallows__floor" />
      {children}
    </div>
  );
};
