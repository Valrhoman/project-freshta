import { Suspense } from "react";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/Featured/FeaturedSection";
import FeaturedSkeleton from "@/components/Featured/FeaturedSkeleton";
import ShopbyCateg from "@/components/ShopbyCateg";
import FeaturedCard from "@/components/FeaturedCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mx-auto">
      <Hero />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedSection />
      </Suspense>
      <ShopbyCateg />
      <FeaturedCard />
    </main>
  );
}
