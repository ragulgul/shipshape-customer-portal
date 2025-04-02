
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { reports } from "@/data/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { Report } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ReportsPage = () => {
  const { toast } = useToast();

  const handleGenerateReport = (reportId: string, reportName: string) => {
    toast({
      title: "Generating report",
      description: `${reportName} is being generated. You'll be notified when it's ready.`,
    });
  };

  const handleDownloadReport = (reportId: string, reportFormat: string) => {
    toast({
      title: "Downloading report",
      description: `Your report is being downloaded in ${reportFormat} format.`,
    });
  };

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "name",
      header: "Report Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        
        const categoryStyles = {
          inventory: "bg-blue-100 text-blue-800 border-blue-200",
          orders: "bg-green-100 text-green-800 border-green-200",
          financial: "bg-purple-100 text-purple-800 border-purple-200",
          users: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
        
        return (
          <Badge variant="outline" className={categoryStyles[category as keyof typeof categoryStyles]}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "format",
      header: "Format",
      cell: ({ row }) => {
        const format = row.getValue("format") as string;
        return <span>{format}</span>;
      },
    },
    {
      accessorKey: "lastGenerated",
      header: "Last Generated",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original;
        
        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGenerateReport(report.id, report.name)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadReport(report.id, report.format)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
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
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 border border-gray-200">
            <div className="rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Inventory</h3>
              <p className="text-sm text-gray-500">4 Reports</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 border border-gray-200">
            <div className="rounded-full bg-green-100 p-3">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Orders</h3>
              <p className="text-sm text-gray-500">3 Reports</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 border border-gray-200">
            <div className="rounded-full bg-purple-100 p-3">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Financial</h3>
              <p className="text-sm text-gray-500">2 Reports</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 border border-gray-200">
            <div className="rounded-full bg-yellow-100 p-3">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Users</h3>
              <p className="text-sm text-gray-500">1 Report</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
          <DataTable 
            columns={columns} 
            data={reports} 
            searchKey="name"
            searchPlaceholder="Search reports..."
          />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default ReportsPage;
