import { type CSSProperties } from "react";

export function CommandAtmosphere() {
  return (
    <div className="command-atmosphere" aria-hidden>
      <div className="command-ceiling" />
      <div className="command-haze" />
      <div className="command-particles">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
