import { mockComplaints, STATUSES } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { ComplaintStatus } from '@/lib/types';

const statusCounts = STATUSES.map(s => ({
  status: s,
  count: mockComplaints.filter(c => c.status === s).length,
}));

const ComplaintsReportPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <FileText className="w-6 h-6 text-secondary" /> Complaints Report
      </h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> PDF</Button>
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> Excel</Button>
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> CSV</Button>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {statusCounts.map(s => (
        <Card key={s.status} className="glass-card">
          <CardContent className="p-4 text-center">
            <StatusBadge status={s.status as ComplaintStatus} />
            <p className="text-2xl font-bold text-foreground mt-2">{s.count}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Total Complaints</p>
              <p className="text-xl font-bold text-foreground">{mockComplaints.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Open</p>
              <p className="text-xl font-bold text-foreground">{mockComplaints.filter(c => c.status !== 'Closed' && c.status !== 'Rejected').length}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Closed</p>
              <p className="text-xl font-bold text-foreground">{mockComplaints.filter(c => c.status === 'Closed').length}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground">Rejected</p>
              <p className="text-xl font-bold text-foreground">{mockComplaints.filter(c => c.status === 'Rejected').length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-3">By Case Type</h3>
          <div className="space-y-3 text-sm">
            {(['Individual', 'Business', 'Organization'] as const).map(type => (
              <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">{type}</span>
                <span className="text-lg font-bold text-foreground">{mockComplaints.filter(c => c.case_type === type).length}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ComplaintsReportPage;
