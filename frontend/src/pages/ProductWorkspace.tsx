import WorkspaceSidebar from "@/components/workspace/WorkspaceSidebar";
import StatusBar from "@/components/workspace/StatusBar";
import ChatInterface from "@/components/workspace/ChatInterface";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useProduct } from "@/contexts/ProductContext";

const ProductWorkspace = () => {
  const { currentPhase, setCurrentPhase } = useProduct();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <WorkspaceSidebar />
        <StatusBar currentPhase={currentPhase} onPhaseChange={setCurrentPhase} />
        <ChatInterface currentPhase={currentPhase} />
      </div>
    </SidebarProvider>
  );
};

export default ProductWorkspace;
