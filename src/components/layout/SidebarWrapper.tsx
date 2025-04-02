
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Package, Boxes, Users, FileBarChart, Bell, LogOut } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface SidebarWrapperProps {
  children: ReactNode;
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded bg-shipshape-600 flex items-center justify-center mr-2">
                <Package className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-shipshape-700">ShipShape</h1>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <p className="mt-2 font-medium">Acme Corp</p>
              <p className="text-xs text-muted-foreground">Customer Portal</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => handleNavigation("/")}>
                      <Package className="h-5 w-5" />
                      <span>Orders</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => handleNavigation("/inventory")}>
                      <Boxes className="h-5 w-5" />
                      <span>Inventory</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => handleNavigation("/users")}>
                      <Users className="h-5 w-5" />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => handleNavigation("/reports")}>
                      <FileBarChart className="h-5 w-5" />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => handleNavigation("/notifications")}>
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="block lg:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
