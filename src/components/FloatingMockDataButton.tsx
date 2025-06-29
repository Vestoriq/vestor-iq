
import React from "react";
import { Sparkles } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const FloatingMockDataButton = () => {
  const addMockData = useAppStore((s) => s.addMockData);
  const { toast } = useToast();

  const handleClick = () => {
    addMockData();
    toast({
      title: "Mock data loaded!",
      description: "You are now viewing the system with demonstration data.",
      duration: 3500,
    });
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 animate-fade-in"
      style={{ pointerEvents: "auto" }}
    >
      <Button
        variant="default"
        className="rounded-full shadow-lg p-4 aspect-square flex items-center justify-center bg-primary text-white hover:bg-primary/80 transition-all duration-300 animate-scale-in"
        onClick={handleClick}
        aria-label="Load mock data"
      >
        <Sparkles className="h-6 w-6 mr-2" />
        <span className="hidden sm:inline font-medium">Load Mock Data</span>
      </Button>
    </div>
  );
};

export default FloatingMockDataButton;
