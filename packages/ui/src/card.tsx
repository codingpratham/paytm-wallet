import { type JSX } from "react";
import "./css/card-style.css"
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
  <p className="card-content">{children}</p>
</div>

  );
}
