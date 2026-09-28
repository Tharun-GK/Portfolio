import Image from "next/image";

interface OperatorCoreProps {
  name: string;
}

export function OperatorCore({ name }: OperatorCoreProps) {
  return (
    <div className="operator-core">
      <div className="operator-rings" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="operator-scanline" aria-hidden />
      <Image
        src="/images/mission-control/hologram.png"
        alt=""
        width={255}
        height={440}
        priority
        className="operator-art"
      />
      <span className="sr-only">Holographic operator representing {name}</span>
    </div>
  );
}
