import { mockStaffUsers, mockComplaints, mockAssessments } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const officers = mockStaffUsers.filter(u => u.role === 'officer');

const officerMetrics = officers.map(o => {
  const assigned = mockComplaints.filter(c => c.assignedOfficer === o.id);
  const resolved = assigned.filter(c => c.status === 'Responded' || c.status === 'Closed');
  const assessments = mockAssessments.filter(a => a.assessedBy === o.id);
  return {
    ...o,
    total: assigned.length,
    resolved: resolved.length,
    assessments: assessments.length,
    rate: assigned.length > 0 ? Math.round((resolved.length / assigned.length) * 100) : 0,
  };
});

const PerformanceReportPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-secondary" /> Performance Report
      </h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> PDF</Button>
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> Excel</Button>
      </div>
    </div>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Officer</TableHead>
                <TableHead>Directorate</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Resolved</TableHead>
                <TableHead>Assessments</TableHead>
                <TableHead>Resolution Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {officerMetrics.map(o => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium text-foreground">{o.name}</TableCell>
                  <TableCell className="text-muted-foreground">{o.directorate || '—'}</TableCell>
                  <TableCell className="text-foreground">{o.total}</TableCell>
                  <TableCell className="text-foreground">{o.resolved}</TableCell>
                  <TableCell className="text-foreground">{o.assessments}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={o.rate} className="h-2 w-20" />
                      <span className="text-sm text-muted-foreground">{o.rate}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PerformanceReportPage;
