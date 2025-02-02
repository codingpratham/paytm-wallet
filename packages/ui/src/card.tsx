import { type JSX } from "react";
import "./css/card-style.css";

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="card-container">
      <h1 className="card-title">{title}</h1>
      <div className="card-content">{children}</div> {/* ✅ Changed <p> to <div> */}
    </div>
  );
}
