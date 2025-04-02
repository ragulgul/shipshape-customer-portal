
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { notifications } from "@/data/mockData";
import { Notification } from "@/data/mockData";
import { useState } from "react";
import { 
  Bell,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  InfoIcon,
  MailCheck
} from "lucide-react";

const NotificationsPage = () => {
  const { toast } = useToast();
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);

  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const markAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationsList(
      notificationsList.filter((notification) => notification.id !== id)
    );
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <SidebarWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold tracking-tight mr-3">Notifications</h1>
            {unreadCount > 0 && (
              <div className="bg-shipshape-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <MailCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="mt-8 space-y-4">
          {notificationsList.length > 0 ? (
            notificationsList.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start p-4 rounded-lg border ${
                  notification.read 
                    ? "bg-white border-gray-200" 
                    : "bg-shipshape-50 border-shipshape-200"
                }`}
              >
                <div className="mr-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${!notification.read ? "text-shipshape-800" : "text-gray-900"}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <div className="ml-4 flex space-x-2">
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteNotification(notification.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <Bell className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
              <p className="text-gray-500 mt-1">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default NotificationsPage;
