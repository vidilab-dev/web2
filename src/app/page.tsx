import { Hero } from "@/components/home/hero";
import { Introduction } from "@/components/home/introduction";
import { Capabilities } from "@/components/home/capabilities";
import { ProductShowcase } from "@/components/home/product-showcase";
import { SolutionCycle } from "@/components/home/solution-cycle";
import { Research } from "@/components/home/research";
import { Sustainability } from "@/components/home/sustainability";
import { Partnership } from "@/components/home/partnership";
import { News } from "@/components/home/news";
import { getPageContent } from "@/lib/pages";
import {
  homeSpec,
  partnershipSpec,
  solutionsSpec,
  sustainabilitySpec,
} from "@/lib/page-specs";
import { solutionStages } from "@/content/home";

export default async function HomePage() {
  const c = await getPageContent(homeSpec);

  // Pillars and partnership tracks are owned by their own page specs so a
  // single admin edit updates the detail page and this preview alike.
  const sustainability = await getPageContent(sustainabilitySpec);
  const partnership = await getPageContent(partnershipSpec);

  // The admin edits each stage's text; ids, numbering and images stay fixed.
  const solutions = await getPageContent(solutionsSpec);
  const stages = solutionStages.map((s, i) => ({ ...s, ...(solutions.stages[i] ?? {}) }));

  return (
    <>
      <Hero c={c} />
      <Introduction c={c} />
      <Capabilities c={c} />
      <ProductShowcase c={c} />
      <SolutionCycle c={c} stages={stages} />
      <Research c={c} />
      <Sustainability c={c} pillars={sustainability.pillars} />
      <Partnership c={c} types={partnership.types} />
      <News c={c} />
    </>
  );
}
