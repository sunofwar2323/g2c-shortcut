"use client";

import { useCallback, useRef, useState } from "react";
import { AIAssistantSection } from "@/components/AIAssistantSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ChatModal } from "@/components/ChatModal";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MobileNav } from "@/components/MobileNav";
import { MostUsedServices } from "@/components/MostUsedServices";
import { PopularTrends, RecentlyViewed } from "@/components/RecentlyViewed";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { ServiceGuideModal } from "@/components/ServiceGuideModal";
import { ServiceSearchFilter } from "@/components/ServiceSearchFilter";
import { SmartSearchSection } from "@/components/SmartSearchSection";
import { StatsDashboard } from "@/components/StatsDashboard";
import { Top20MostUsed } from "@/components/Top20MostUsed";
import { useBookmarks, useRecentlyViewed } from "@/hooks/useLocalStorage";
import type { Service } from "@/types";

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { recent, addRecent } = useRecentlyViewed();

  const handleViewService = useCallback(
    (service: Service) => {
      setSelectedService(service);
      addRecent(service.id);
    },
    [addRecent]
  );

  const handleAskAI = useCallback((query: string) => {
    setChatQuery(query);
    setChatOpen(true);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setChatQuery(query);
    setChatOpen(true);
  }, []);

  const focusSearch = useCallback(() => {
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>("#search input[type='search']");
      input?.focus();
    }, 400);
  }, []);

  return (
    <>
      <Header onSearchClick={focusSearch} onChatClick={() => setChatOpen(true)} />

      <main ref={searchRef} className="pb-20 md:pb-0">
        <HeroSection onSearch={handleSearch} onSelectService={handleViewService} />
        <AIAssistantSection />
        <RecentlyViewed recentIds={recent} onView={handleViewService} />
        <Top20MostUsed onView={handleViewService} />
        <MostUsedServices
          isBookmarked={isBookmarked}
          onBookmark={toggleBookmark}
          onView={handleViewService}
        />
        <ServiceSearchFilter
          isBookmarked={isBookmarked}
          onBookmark={toggleBookmark}
          onView={handleViewService}
        />
        <CategoriesSection onViewService={handleViewService} />
        <RecommendationEngine onViewService={handleViewService} onAskAI={handleAskAI} />
        <SmartSearchSection onSelectService={handleViewService} onSearch={handleSearch} />
        <StatsDashboard />
        <PopularTrends onView={handleViewService} />
      </main>

      <Footer />

      <FloatingChatButton onClick={() => setChatOpen(true)} />
      <MobileNav onSearch={focusSearch} onChat={() => setChatOpen(true)} />

      <ChatModal
        open={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setChatQuery(undefined);
        }}
        initialQuery={chatQuery}
      />

      <ServiceGuideModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onAskAI={handleAskAI}
      />
    </>
  );
}
