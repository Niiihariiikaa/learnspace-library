
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Bell, 
  Book, 
  Home, 
  User, 
  LogOut, 
  Menu, 
  X,
  BookOpen,
  Settings,
  Search,
  Mail,
  Info
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLibraryData } from '@/contexts/LibraryDataContext';

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications } = useLibraryData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-library-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">LearnSpace</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 hover:bg-library-secondary flex items-center">
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
              </Link>
              <Link to="/books" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 hover:bg-library-secondary flex items-center">
                <Book className="h-4 w-4 mr-1" />
                <span>Books</span>
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 hover:bg-library-secondary flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Dashboard</span>
                </Link>
              )}
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 hover:bg-library-secondary flex items-center">
                <Info className="h-4 w-4 mr-1" />
                <span>About</span>
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 hover:bg-library-secondary flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Search button - links to books page with search focus */}
            <Link to="/books" className="p-2 rounded-full text-white hover:bg-library-secondary">
              <Search className="h-5 w-5" />
            </Link>
            
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link to="/notifications" className="ml-2 p-2 rounded-full text-white hover:bg-library-secondary relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
                
                {/* User Menu */}
                <div className="ml-3 relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.profilePicture} alt={user?.name} />
                          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                        </Badge>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="w-full cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      {user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="w-full cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="hidden md:flex md:items-center md:ml-6 md:space-x-2">
                <Button variant="ghost" asChild className="text-white hover:bg-library-secondary">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-library-accent text-white hover:bg-library-accent/90">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex md:hidden ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-library-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-library-primary border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-library-secondary flex items-center"
              onClick={closeMenu}
            >
              <Home className="h-5 w-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link 
              to="/books" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-library-secondary flex items-center"
              onClick={closeMenu}
            >
              <Book className="h-5 w-5 mr-2" />
              <span>Books</span>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-library-secondary flex items-center"
                onClick={closeMenu}
              >
                <User className="h-5 w-5 mr-2" />
                <span>Dashboard</span>
              </Link>
            )}
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-library-secondary flex items-center"
              onClick={closeMenu}
            >
              <Info className="h-5 w-5 mr-2" />
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-library-secondary flex items-center"
              onClick={closeMenu}
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>Contact</span>
            </Link>
            
            {!isAuthenticated && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 space-x-3">
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-library-secondary w-full text-center"
                    onClick={closeMenu}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 rounded-md text-base font-medium bg-library-accent hover:bg-library-accent/90 w-full text-center"
                    onClick={closeMenu}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
