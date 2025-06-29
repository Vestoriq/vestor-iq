
import React, { useState } from "react";
import { Search, User, Menu, X, Settings, Bell, LogOut, UserCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

const NavbarActions: React.FC<Props> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to market data with search query
      navigate(`/market-data?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery.trim()}"`,
      });
    }
  };

  const handleProfileAction = (action: string) => {
    switch (action) {
      case 'profile':
        toast({
          title: "Profile",
          description: "Profile page functionality coming soon",
        });
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'notifications':
        toast({
          title: "Notifications",
          description: "You have no new notifications",
        });
        break;
      case 'messages':
        toast({
          title: "Messages",
          description: "No new messages",
        });
        break;
      case 'logout':
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
          variant: "destructive",
        });
        // Here you would typically handle actual logout logic
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Enhanced Search Button */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent transition-colors relative"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Market Data
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search stocks, symbols, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setSearchOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!searchQuery.trim()}>
                Search
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Settings Button */}
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent transition-colors"
        onClick={() => navigate('/settings')}
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {/* Enhanced Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-accent transition-colors relative"
            aria-label="Profile menu"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                JD
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60"
        >
          <DropdownMenuLabel className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Trading Analyst</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleProfileAction('profile')}
            className="cursor-pointer"
          >
            <UserCircle className="w-4 h-4 mr-2" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleProfileAction('settings')}
            className="cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleProfileAction('notifications')}
            className="cursor-pointer"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleProfileAction('messages')}
            className="cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-2" />
            Messages
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleProfileAction('logout')}
            className="cursor-pointer text-red-600 dark:text-red-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default NavbarActions;
