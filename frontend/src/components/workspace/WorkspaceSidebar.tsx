import { Plus, MessageSquare, Clock } from "lucide-react";
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
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-mono text-xs uppercase tracking-wider">
            {!isCollapsed && "Previous Conversations"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mockConversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    isActive={conversation.isActive}
                    tooltip={conversation.title}
                    className={`
                      group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                      ${conversation.isActive 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'hover:bg-secondary border border-transparent'
                      }
                    `}
                  >
                    <MessageSquare className={`w-4 h-4 shrink-0 ${conversation.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    {!isCollapsed && (
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className={`text-sm truncate ${conversation.isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                          {conversation.title}
                        </span>
                        <span className="text-xs text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {conversation.timestamp}
                        </span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default WorkspaceSidebar;
