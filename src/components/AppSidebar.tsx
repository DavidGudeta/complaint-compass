import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/types';
import {
  LayoutDashboard, FileText, Users, Settings, BarChart3,
  ClipboardList, CheckCircle, MessageSquare, FolderOpen,
  UserCheck, Target, Building2, ChevronDown, Shield
} from 'lucide-react';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { title: string; url: string }[];
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Manage Users', url: '/dashboard/users', icon: Users },
    { title: 'Directorates', url: '/dashboard/directorates', icon: Building2 },
    { title: 'Reports', url: '/dashboard/reports', icon: BarChart3 },
    { title: 'Portal Settings', url: '/dashboard/settings', icon: Settings },
  ],
  director: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    {
      title: 'Complaint Settings', url: '#', icon: Settings,
      children: [
        { title: 'Categories & Subcategories', url: '/dashboard/categories' },
        { title: 'Case Status Settings', url: '/dashboard/statuses' },
      ]
    },
    { title: 'All Complaints', url: '/dashboard/complaints', icon: ClipboardList },
    { title: 'All Assessments', url: '/dashboard/assessments', icon: CheckCircle },
    { title: 'All Responses', url: '/dashboard/responses', icon: MessageSquare },
    {
      title: 'Reports', url: '#', icon: BarChart3,
      children: [
        { title: 'Complaints Report', url: '/dashboard/reports/complaints' },
        { title: 'Assessment Report', url: '/dashboard/reports/assessments' },
        { title: 'Response Report', url: '/dashboard/reports/responses' },
        { title: 'Performance Report', url: '/dashboard/reports/performance' },
        { title: 'Contact Survey', url: '/dashboard/reports/contacts' },
      ]
    },
  ],
  team_leader: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'All Complaints', url: '/dashboard/complaints', icon: ClipboardList },
    { title: 'Assign Complaints', url: '/dashboard/assign', icon: UserCheck },
    { title: 'All Assessments', url: '/dashboard/assessments', icon: CheckCircle },
    { title: 'All Responses', url: '/dashboard/responses', icon: MessageSquare },
    { title: 'Team KPIs', url: '/dashboard/kpis', icon: Target },
    { title: 'Reports', url: '/dashboard/reports', icon: BarChart3 },
  ],
  officer: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'My Complaints', url: '/dashboard/complaints', icon: ClipboardList },
    { title: 'Assessments', url: '/dashboard/assessments', icon: CheckCircle },
    { title: 'Responses', url: '/dashboard/responses', icon: MessageSquare },
    { title: 'Documents', url: '/dashboard/documents', icon: FolderOpen },
  ],
  directorate: [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Incoming Complaints', url: '/dashboard/complaints', icon: ClipboardList },
    { title: 'Assessments', url: '/dashboard/assessments', icon: CheckCircle },
    { title: 'Responses', url: '/dashboard/responses', icon: MessageSquare },
  ],
};

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  if (!user) return null;
  const items = roleNavItems[user.role] || [];

  const roleLabelMap: Record<UserRole, string> = {
    admin: 'Administrator',
    director: 'Director',
    team_leader: 'Team Leader',
    officer: 'Officer',
    directorate: 'Directorate',
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-sidebar-border',
        collapsed && 'justify-center px-2'
      )}>
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-sidebar-accent-foreground truncate">Complaints Portal</h2>
            <p className="text-[11px] text-sidebar-muted truncate">{roleLabelMap[user.role]}</p>
          </div>
        )}
      </div>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-muted text-[11px] uppercase tracking-wider mb-1">Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.children) {
                  if (collapsed) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <NavLink to={item.children[0].url} activeClassName="bg-sidebar-accent text-sidebar-primary">
                            <item.icon className="w-4 h-4" />
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                  return (
                    <Collapsible key={item.title} defaultOpen={item.children.some(c => location.pathname === c.url)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between hover:bg-sidebar-accent/50">
                            <span className="flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              <span>{item.title}</span>
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="ml-6 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
                            {item.children.map(child => (
                              <SidebarMenuButton key={child.url} asChild className="h-8 text-[13px]">
                                <NavLink
                                  to={child.url}
                                  activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                                  className="hover:bg-sidebar-accent/50"
                                >
                                  {child.title}
                                </NavLink>
                              </SidebarMenuButton>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === '/dashboard'}
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                        className="hover:bg-sidebar-accent/50"
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
