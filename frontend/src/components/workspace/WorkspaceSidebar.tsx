import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

const mockConversations: Conversation[] = [
  { id: "1", title: "SaaS Analytics Dashboard", timestamp: "2 hours ago", isActive: true },
  { id: "2", title: "Marketplace MVP Ideas", timestamp: "Yesterday" },
  { id: "3", title: "AI Writing Tool Architecture", timestamp: "3 days ago" },
  { id: "4", title: "Fintech Compliance Check", timestamp: "1 week ago" },
  { id: "5", title: "E-commerce Platform Review", timestamp: "2 weeks ago" },
];

const WorkspaceSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon"
      className="border-r border-border bg-card"
    >
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="font-mono text-sm font-semibold text-primary">
              BRO FOUNDER
            </h2>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 gap-2 border-border hover:bg-secondary hover:border-primary/50 transition-colors"
          size={isCollapsed ? "icon" : "default"}
        >
          <Plus className="w-4 h-4" />
          {!isCollapsed && <span>New Chat</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-2">
      </SidebarContent>
    </Sidebar>
  );
};

export default WorkspaceSidebar;
