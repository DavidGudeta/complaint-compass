import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, FileText, Users, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const reports = [
  { title: 'Complaints Report', desc: 'Summary of all complaints by status, category, and period.', icon: FileText, url: '/dashboard/reports/complaints' },
  { title: 'Assessment Report', desc: 'Officer & directorate assessment details.', icon: CheckCircle, url: '/dashboard/reports/assessments' },
  { title: 'Response Report', desc: 'All responses sent to complainants.', icon: MessageSquare, url: '/dashboard/reports/responses' },
  { title: 'Performance Report', desc: 'Officer and team performance metrics.', icon: Users, url: '/dashboard/reports/performance' },
  { title: 'Contact Survey', desc: 'Complainant contact information report.', icon: Phone, url: '/dashboard/reports/contacts' },
];

const ReportsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-secondary" /> Reports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map(r => (
          <Card
            key={r.title}
            className="glass-card cursor-pointer hover:shadow-xl transition-shadow group"
            onClick={() => navigate(r.url)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <r.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
