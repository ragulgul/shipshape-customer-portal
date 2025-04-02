
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { inventory } from "@/data/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpDown, 
  Download, 
  PlusCircle,
  Upload 
} from "lucide-react";

const InventoryPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/add-product");
    toast({
      title: "Add new product",
      description: "You can now add a new product to inventory.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import inventory",
      description: "This feature is coming soon!",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export inventory",
      description: "Inventory data export has been initiated.",
    });
  };

  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "stockLevel",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock Level
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const stockLevel = parseInt(row.getValue("stockLevel"));
        const reorderPoint = parseInt(row.original.reorderPoint.toString());
        
        let badgeVariant = "default";
        if (stockLevel <= reorderPoint * 0.5) {
          badgeVariant = "destructive";
        } else if (stockLevel <= reorderPoint) {
          badgeVariant = "warning";
        }
        
        return (
          <Badge variant={badgeVariant as any}>{stockLevel}</Badge>
        );
      },
    },
    {
      accessorKey: "reorderPoint",
      header: "Reorder Point",
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("unitPrice"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return formatted;
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/inventory/${item.id}`)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <SidebarWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddProduct}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <DataTable 
            columns={columns} 
            data={inventory} 
            searchKey="name"
            searchPlaceholder="Search by product name..."
          />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default InventoryPage;
