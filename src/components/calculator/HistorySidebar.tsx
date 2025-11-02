import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  onHistoryClick: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistorySidebar = ({ history, onHistoryClick, onClearHistory }: HistorySidebarProps) => {
  return (
    <div className="w-80 border-l border-border bg-card p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">History</h3>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearHistory}
            className="h-8 w-8"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        {history.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No history yet
          </div>
        ) : (
          <div className="space-y-2">
            {[...history].reverse().map((item) => (
              <button
                key={item.id}
                onClick={() => onHistoryClick(item)}
                className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="text-sm text-muted-foreground truncate">
                  {item.expression}
                </div>
                <div className="text-lg font-semibold text-foreground truncate">
                  = {item.result}
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
