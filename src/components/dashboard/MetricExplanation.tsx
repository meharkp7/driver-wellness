import { useState } from "react";
import { HelpCircle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MetricExplanationProps {
  metric: string;
  value: number | string;
  context?: Record<string, any>;
}

const MetricExplanation = ({ metric, value, context = {} }: MetricExplanationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const fetchExplanation = async () => {
    if (explanation) {
      setShowExplanation(!showExplanation);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('explain-metric', {
        body: { metric, value, context }
      });

      if (error) {
        if (error.message?.includes('Rate limit')) {
          toast.error("Too many requests. Please wait a moment.");
        } else if (error.message?.includes('credits')) {
          toast.error("AI usage limit reached. Please add credits.");
        } else {
          toast.error("Unable to fetch explanation");
        }
        return;
      }

      setExplanation(data.explanation);
      setShowExplanation(true);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      toast.error("Failed to get explanation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={fetchExplanation}
        disabled={isLoading}
        className="h-7 w-7 p-0 hover:bg-primary/10"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
        )}
      </Button>

      {showExplanation && explanation && (
        <div className="absolute z-50 mt-2 right-0 w-80 bg-card border-2 border-primary/30 rounded-lg p-4 shadow-glow animate-fade-in">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-primary">AI Explanation</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExplanation(false)}
              className="h-6 w-6 p-0 hover:bg-destructive/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MetricExplanation;
