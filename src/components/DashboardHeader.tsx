import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, LogOut, User, FileText, Users, Settings, AlertCircle, Pencil, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { mockNotifications, Notification } from '@/lib/notifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const typeIcon = (type: Notification['type']) => {
  switch (type) {
    case 'complaint': return <FileText className="w-4 h-4 text-primary" />;
    case 'assignment': return <Users className="w-4 h-4 text-secondary" />;
    case 'status': return <AlertCircle className="w-4 h-4 text-accent-foreground" />;
    case 'system': return <Settings className="w-4 h-4 text-muted-foreground" />;
  }
};

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = () => {
    toast.success(t('dashboard.profileUpdated'));
    setProfileOpen(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error(t('dashboard.passwordMismatch'));
      return;
    }
    if (newPassword.length < 6) {
      toast.error(t('dashboard.passwordTooShort'));
      return;
    }
    toast.success(t('dashboard.passwordChanged'));
    setPasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <span className="text-sm font-medium text-muted-foreground hidden sm:block">{t('dashboard.portal')}</span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher variant="ghost" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 bg-popover z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">{t('dashboard.notifications')}</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                  {t('dashboard.markAllRead')}
                </button>
              )}
            </div>
            <ScrollArea className="max-h-[360px]">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">{t('dashboard.noNotifications')}</p>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      "flex gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border last:border-0",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <div className="mt-0.5 shrink-0">{typeIcon(n.type)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-sm truncate", !n.read ? "font-semibold text-foreground" : "text-muted-foreground")}>
                          {n.title}
                        </p>
                        {!n.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm hidden sm:block">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover z-50">
            <DropdownMenuItem className="text-muted-foreground">
              <span className="text-xs">{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              <Pencil className="w-4 h-4 mr-2" />
              {t('dashboard.editProfile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPasswordOpen(true)}>
              <Lock className="w-4 h-4 mr-2" />
              {t('dashboard.changePassword')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              {t('dashboard.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('dashboard.editProfile')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name">{t('dashboard.fullName')}</Label>
              <Input id="profile-name" value={profileName} onChange={e => setProfileName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">{t('login.email')}</Label>
              <Input id="profile-email" type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>{t('dashboard.role')}</Label>
              <Input value={user?.role?.replace('_', ' ').toUpperCase() || ''} disabled className="opacity-60" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProfileOpen(false)}>{t('common.cancel')}</Button>
            <Button onClick={handleSaveProfile}>{t('dashboard.saveChanges')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('dashboard.changePassword')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="current-password">{t('dashboard.currentPassword')}</Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">{t('dashboard.newPassword')}</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t('dashboard.confirmPassword')}</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordOpen(false)}>{t('common.cancel')}</Button>
            <Button onClick={handleChangePassword}>{t('dashboard.updatePassword')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};
