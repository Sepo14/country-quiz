import Image from "next/image";

export function Fondo() {
  return (
    <div className="fixed -z-10 h-screen w-full">
        <Image src="/bg.jpg" alt="Background" layout="fill" unoptimized />
    </div>
    );
}
