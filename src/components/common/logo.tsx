import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/dukarmo-logo.png" 
      alt="Du Karm"
      width={200} 
      height={10} 
      priority
    />
  );
}