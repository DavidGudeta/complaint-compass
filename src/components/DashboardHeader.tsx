import { useAuth } from '@/contexts/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <span className="text-sm font-medium text-muted-foreground hidden sm:block">Complaints Portal</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm hidden sm:block">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-muted-foreground">
              <span className="text-xs">{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
