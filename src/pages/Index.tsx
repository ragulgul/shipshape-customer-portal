
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Package, TrendingUp, AlertTriangle, ShoppingCart } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { orders } from "@/data/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate("/new-order");
    toast({
      title: "Creating new order",
      description: "You can now start adding items to your order.",
    });
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "reference",
      header: "Reference",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return formatted;
      },
    },
    {
      accessorKey: "items",
      header: "Items",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as OrderStatus;
        
        const statusStyles = {
          pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
          processing: "bg-blue-100 text-blue-800 border-blue-200",
          shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
          delivered: "bg-green-100 text-green-800 border-green-200",
          cancelled: "bg-red-100 text-red-800 border-red-200",
        };
        
        return (
          <Badge variant="outline" className={statusStyles[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <SidebarWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <Button onClick={handleNewOrder}>New Order</Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard 
            title="Total Orders" 
            value="25" 
            icon={Package}
            description="+12% from last month" 
          />
          <DashboardCard 
            title="Processing" 
            value="8" 
            icon={ShoppingCart}
            description="Orders in progress" 
          />
          <DashboardCard 
            title="Monthly Revenue" 
            value="$38,450" 
            icon={TrendingUp}
            description="+8.2% from last month" 
          />
          <DashboardCard 
            title="Pending" 
            value="3" 
            icon={AlertTriangle}
            description="Orders awaiting processing" 
          />
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <DataTable 
            columns={columns} 
            data={orders} 
            searchKey="reference"
            searchPlaceholder="Search by reference..."
          />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default OrdersPage;
