import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockComplaints, mockAssessments, mockResponses } from '@/lib/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { ClipboardList, CheckCircle, MessageSquare, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) => (
  <Card className="glass-card">
    <CardContent className="p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground animate-count-up">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const newCount = mockComplaints.filter(c => c.status === 'New').length;
  const inProgressCount = mockComplaints.filter(c => ['In Progress', 'Assigned', 'Sent to Directorate'].includes(c.status)).length;
  const respondedCount = mockComplaints.filter(c => c.status === 'Responded').length;
  const totalCount = mockComplaints.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's an overview of the complaints portal activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Complaints" value={totalCount} icon={ClipboardList} color="gradient-primary" />
        <StatCard title="New Complaints" value={newCount} icon={AlertTriangle} color="gradient-accent" />
        <StatCard title="In Progress" value={inProgressCount} icon={Clock} color="bg-status-in-progress" />
        <StatCard title="Responded" value={respondedCount} icon={CheckCircle} color="bg-secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-secondary" /> Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockComplaints.slice(0, 5).map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.id} — {c.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.details.slice(0, 60)}...</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" /> Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Assessments</span>
                <span className="text-lg font-bold text-foreground">{mockAssessments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Responses</span>
                <span className="text-lg font-bold text-foreground">{mockResponses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resolution Rate</span>
                <span className="text-lg font-bold text-secondary">{Math.round((respondedCount / totalCount) * 100)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <span className="text-lg font-bold text-foreground">3.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Officers</span>
                <span className="text-lg font-bold text-foreground">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
