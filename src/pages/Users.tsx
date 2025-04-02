
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { users } from "@/data/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { User, UserRole } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { PlusCircle, UserPlus } from "lucide-react";

const UsersPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/add-user");
    toast({
      title: "Add new user",
      description: "Create a new user account.",
    });
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as UserRole;
        
        const roleStyles = {
          admin: "bg-purple-100 text-purple-800 border-purple-200",
          manager: "bg-blue-100 text-blue-800 border-blue-200",
          viewer: "bg-green-100 text-green-800 border-green-200",
        };
        
        return (
          <Badge variant="outline" className={roleStyles[role]}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        
        return (
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <SidebarWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        
        <div className="mt-8">
          <DataTable 
            columns={columns} 
            data={users} 
            searchKey="email"
            searchPlaceholder="Search by email..."
          />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default UsersPage;
