import Image from "next/image";

export function CommandDesk() {
  return (
    <div className="command-desk pointer-events-none" aria-hidden>
      <Image
        src="/images/mission-control/desk.png"
        alt=""
        width={520}
        height={168}
        className="command-desk-art"
      />
      <div className="command-desk-fade" />
    </div>
  );
}
