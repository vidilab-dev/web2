import { Hero } from "@/components/home/hero";
import { Introduction } from "@/components/home/introduction";
import { Capabilities } from "@/components/home/capabilities";
import { ProductShowcase } from "@/components/home/product-showcase";
import { SolutionCycle } from "@/components/home/solution-cycle";
import { Research } from "@/components/home/research";
import { Sustainability } from "@/components/home/sustainability";
import { Partnership } from "@/components/home/partnership";
import { News } from "@/components/home/news";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Capabilities />
      <ProductShowcase />
      <SolutionCycle />
      <Research />
      <Sustainability />
      <Partnership />
      <News />
    </>
  );
}
