import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/lib/types';
import { TranslationKey } from '@/lib/translations';
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
  titleKey: TranslationKey;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { titleKey: TranslationKey; url: string }[];
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { titleKey: 'nav.dashboard', url: '/dashboard', icon: LayoutDashboard },
    { titleKey: 'nav.users', url: '/dashboard/users', icon: Users },
    { titleKey: 'nav.roles', url: '/dashboard/roles', icon: Shield },
    { titleKey: 'nav.userStatus', url: '/dashboard/user-status', icon: UserCheck },
  ],
  director: [
    { titleKey: 'nav.dashboard', url: '/dashboard', icon: LayoutDashboard },
    {
      titleKey: 'nav.cases', url: '#', icon: ClipboardList,
      children: [
        { titleKey: 'nav.allComplaints', url: '/dashboard/complaints' },
        { titleKey: 'nav.allAssessments', url: '/dashboard/assessments' },
        { titleKey: 'nav.allResponses', url: '/dashboard/responses' },
      ]
    },
    {
      titleKey: 'nav.reports', url: '#', icon: BarChart3,
      children: [
        { titleKey: 'nav.complaintsReports', url: '/dashboard/reports/complaints' },
        { titleKey: 'nav.assessmentReports', url: '/dashboard/reports/assessments' },
        { titleKey: 'nav.responseReports', url: '/dashboard/reports/responses' },
        { titleKey: 'nav.feedbackReports', url: '/dashboard/reports/feedback' },
      ]
    },
    {
      titleKey: 'nav.settings', url: '#', icon: Settings,
      children: [
        { titleKey: 'nav.categorySubcategory', url: '/dashboard/categories' },
        { titleKey: 'nav.complaintStatus', url: '/dashboard/statuses' },
      ]
    },
    {
      titleKey: 'nav.manage', url: '#', icon: FolderOpen,
      children: [
        { titleKey: 'nav.reopenedComplaints', url: '/dashboard/reopened' },
      ]
    },
  ],
  team_leader: [
    { titleKey: 'nav.dashboard', url: '/dashboard', icon: LayoutDashboard },
    {
      titleKey: 'nav.cases', url: '#', icon: ClipboardList,
      children: [
        { titleKey: 'nav.allComplaints', url: '/dashboard/complaints' },
        { titleKey: 'nav.allAssessments', url: '/dashboard/assessments' },
        { titleKey: 'nav.allResponses', url: '/dashboard/responses' },
        { titleKey: 'nav.allApprovals', url: '/dashboard/approvals' },
      ]
    },
    {
      titleKey: 'nav.reports', url: '#', icon: BarChart3,
      children: [
        { titleKey: 'nav.complaintsReports', url: '/dashboard/reports/complaints' },
        { titleKey: 'nav.assessmentReports', url: '/dashboard/reports/assessments' },
        { titleKey: 'nav.responseReports', url: '/dashboard/reports/responses' },
        { titleKey: 'nav.feedbackReports', url: '/dashboard/reports/feedback' },
        { titleKey: 'nav.performanceReports', url: '/dashboard/reports/performance' },
      ]
    },
    {
      titleKey: 'nav.manage', url: '#', icon: UserCheck,
      children: [
        { titleKey: 'nav.assignComplaints', url: '/dashboard/assign' },
        { titleKey: 'nav.unassignedComplaints', url: '/dashboard/unassigned' },
        { titleKey: 'nav.closedComplaints', url: '/dashboard/closed' },
      ]
    },
  ],
  officer: [
    { titleKey: 'nav.dashboard', url: '/dashboard', icon: LayoutDashboard },
    {
      titleKey: 'nav.cases', url: '#', icon: ClipboardList,
      children: [
        { titleKey: 'nav.myComplaints', url: '/dashboard/complaints' },
        { titleKey: 'nav.myAssessments', url: '/dashboard/assessments' },
        { titleKey: 'nav.myResponses', url: '/dashboard/responses' },
        { titleKey: 'nav.approvedResponses', url: '/dashboard/approved' },
      ]
    },
    {
      titleKey: 'nav.reports', url: '#', icon: BarChart3,
      children: [
        { titleKey: 'nav.performanceReports', url: '/dashboard/reports/performance' },
        { titleKey: 'nav.feedbackReports', url: '/dashboard/reports/feedback' },
      ]
    },
    {
      titleKey: 'nav.manage', url: '#', icon: FolderOpen,
      children: [
        { titleKey: 'nav.assignComplaints', url: '/dashboard/assign' },
        { titleKey: 'nav.unassignedComplaints', url: '/dashboard/unassigned' },
        { titleKey: 'nav.closedComplaints', url: '/dashboard/closed' },
      ]
    },
  ],
  directorate: [
    { titleKey: 'nav.dashboard', url: '/dashboard', icon: LayoutDashboard },
    { titleKey: 'nav.incomingComplaints', url: '/dashboard/complaints', icon: ClipboardList },
    { titleKey: 'nav.assessments', url: '/dashboard/assessments', icon: CheckCircle },
    { titleKey: 'nav.responses', url: '/dashboard/responses', icon: MessageSquare },
  ],
};

export function AppSidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  if (!user) return null;
  const items = roleNavItems[user.role] || [];

  const roleKey = `role.${user.role}` as TranslationKey;

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
            <h2 className="text-sm font-bold text-sidebar-accent-foreground truncate">{t('header.title')}</h2>
            <p className="text-[11px] text-sidebar-muted truncate">{t(roleKey)}</p>
          </div>
        )}
      </div>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-muted text-[11px] uppercase tracking-wider mb-1">{t('nav.navigation')}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const title = t(item.titleKey);
                if (item.children) {
                  if (collapsed) {
                    return (
                      <SidebarMenuItem key={item.titleKey}>
                        <SidebarMenuButton asChild tooltip={title}>
                          <NavLink to={item.children[0].url} activeClassName="bg-sidebar-accent text-sidebar-primary">
                            <item.icon className="w-4 h-4" />
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                  return (
                    <Collapsible key={item.titleKey} defaultOpen={item.children.some(c => location.pathname === c.url)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full justify-between hover:bg-sidebar-accent/50">
                            <span className="flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              <span>{title}</span>
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
                                  {t(child.titleKey)}
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
                  <SidebarMenuItem key={item.titleKey}>
                    <SidebarMenuButton asChild tooltip={title}>
                      <NavLink
                        to={item.url}
                        end={item.url === '/dashboard'}
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                        className="hover:bg-sidebar-accent/50"
                      >
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{title}</span>}
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
