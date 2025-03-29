
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  isAuthenticated: boolean;
}

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Student User',
    email: 'student@example.com',
    role: 'student',
    profilePicture: 'https://i.pravatar.cc/150?u=student'
  },
  {
    id: '2',
    name: 'Faculty User',
    email: 'faculty@example.com',
    role: 'faculty',
    profilePicture: 'https://i.pravatar.cc/150?u=faculty'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profilePicture: 'https://i.pravatar.cc/150?u=admin'
  }
];

// Mock user passwords (in real app, this would be hashed and stored in a secure database)
const MOCK_PASSWORDS: Record<string, string> = {
  'student@example.com': 'password',
  'faculty@example.com': 'password',
  'admin@example.com': 'password'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('libraryUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const mockUser = MOCK_USERS.find(u => u.email === email);
      
      if (!mockUser || MOCK_PASSWORDS[email] !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem('libraryUser', JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `${MOCK_USERS.length + 1}`,
        name,
        email,
        role,
        profilePicture: `https://i.pravatar.cc/150?u=${Date.now()}`
      };
      
      // In a real app, we would store the password securely
      // For this mock, we're just adding it to our mock data
      MOCK_USERS.push(newUser);
      MOCK_PASSWORDS[email] = password;
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem('libraryUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `Welcome to the library, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('libraryUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      signup,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
