import Link from "next/link";
import Background from "@/components/site/Background";
import { Stumps } from "@/components/site/cricket";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Background />
      <div className="relative z-10 flex flex-col items-center">
        <Stumps out className="h-40 w-28" />
        <p className="led led-red mt-6 text-6xl">404</p>
        <h1 className="font-display mt-3 text-5xl font-black text-chalk uppercase sm:text-7xl">Clean bowled!</h1>
        <p className="mt-3 text-lg text-chalk/70">This page has walked back to the pavilion.</p>
        <Link href="/" className="btn-ball mt-8">
          Back to the crease
        </Link>
      </div>
    </div>
  );
}
