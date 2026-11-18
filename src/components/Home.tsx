"use client";

import { useCallback, useState } from "react";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import CustomCursor from "./CustomCursor";
import TrailerIntro from "./TrailerIntro";
import Navigation from "./Navigation";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Collections from "./Collections";
import Interlude from "./Interlude";
import HorizontalGallery from "./HorizontalGallery";
import FillLookbookEnd from "./FillLookbookEnd";
import ProductGrid from "./ProductGrid";
import Categories from "./Categories";
import AskAssistant from "./AskAssistant";
import PromiseRow from "./PromiseRow";
import Reviews from "./Reviews";
import BrandStatement from "./BrandStatement";
import CTA from "./CTA";
import Footer from "./Footer";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <TrailerIntro onComplete={onIntroDone} />
      <Navigation />
      <main>
        <Hero ready={ready} />
        <Marquee reverse />
        <Collections />
        <Interlude
          quote="Every blouse is fitted twice, on you."
          stat1="₹0|Alterations"
          stat2="Free|Studio trials"
        />
        <HorizontalGallery />
        <FillLookbookEnd />
        <ProductGrid />
        <AskAssistant />
        <Categories />
        <Interlude
          quote="Zari that never dulls, borders locked by hand."
          stat1="50%|Advance"
          flip
        />
        <PromiseRow />
        <Reviews />
        <BrandStatement />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
