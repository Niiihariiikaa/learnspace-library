
import React from 'react';
import { useLibraryData } from '@/contexts/LibraryDataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, BookOpen, Calendar, Info, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const { notifications, markNotificationAsRead } = useLibraryData();
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Group notifications by type
  const dueNotifications = notifications.filter(n => n.type === 'due_date');
  const newArrivalNotifications = notifications.filter(n => n.type === 'new_arrival');
  const requestResponseNotifications = notifications.filter(n => n.type === 'request_response');
  const systemNotifications = notifications.filter(n => n.type === 'system');
  
  // Mark all notifications as read
  const handleMarkAllRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'due_date':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      case 'new_arrival':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'request_response':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-library-primary">Your Notifications</h1>
            <p className="text-gray-600">
              Stay updated with your library activities and announcements
            </p>
          </div>
          
          {notifications.some(n => !n.read) && (
            <Button onClick={handleMarkAllRead}>
              Mark All as Read
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <Card className="mb-8">
            <CardContent className="py-10 text-center">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-500 mb-4">You don't have any notifications at the moment.</p>
              <Button asChild>
                <Link to="/books">Browse Books</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Due date notifications */}
            {dueNotifications.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    <CardTitle>Due Date Reminders</CardTitle>
                  </div>
                  <CardDescription>
                    Books that need to be returned soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dueNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-4 border rounded-lg ${!notification.read ? 'bg-amber-50 border-amber-200' : 'bg-white'}`}
                      >
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">Due Date Reminder</p>
                            {!notification.read && (
                              <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-800">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="ml-2"
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* New arrival notifications */}
            {newArrivalNotifications.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-500" />
                    <CardTitle>New Arrivals</CardTitle>
                  </div>
                  <CardDescription>
                    Recently added books to our collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newArrivalNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-4 border rounded-lg ${!notification.read ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                      >
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">New Book Added</p>
                            {!notification.read && (
                              <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="ml-2"
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Request response notifications */}
            {requestResponseNotifications.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <CardTitle>Request Updates</CardTitle>
                  </div>
                  <CardDescription>
                    Responses to your book requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requestResponseNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                      >
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">Request Update</p>
                            {!notification.read && (
                              <Badge variant="outline" className="bg-blue-100 border-blue-300 text-blue-800">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="ml-2"
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* System notifications */}
            {systemNotifications.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <CardTitle>System Notifications</CardTitle>
                  </div>
                  <CardDescription>
                    Important updates about your account and activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-4 border rounded-lg ${!notification.read ? 'bg-red-50 border-red-200' : 'bg-white'}`}
                      >
                        <div className="mr-4 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">System Notification</p>
                            {!notification.read && (
                              <Badge variant="outline" className="bg-red-100 border-red-300 text-red-800">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
                        </div>
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="ml-2"
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
