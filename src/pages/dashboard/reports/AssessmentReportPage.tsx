import { mockAssessments } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const statusColor: Record<string, string> = {
  Pending:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Sent:      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Responded: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  Closed:    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

const AssessmentReportPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <CheckCircle className="w-6 h-6 text-secondary" /> Assessment Report
      </h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> PDF</Button>
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> Excel</Button>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Total</p><p className="text-2xl font-bold text-foreground">{mockAssessments.length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Pending</p><p className="text-2xl font-bold text-yellow-600">{mockAssessments.filter(a => a.assessment_status === 'Pending').length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Sent</p><p className="text-2xl font-bold text-blue-600">{mockAssessments.filter(a => a.assessment_status === 'Sent').length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Closed</p><p className="text-2xl font-bold text-green-600">{mockAssessments.filter(a => a.assessment_status === 'Closed').length}</p></CardContent></Card>
    </div>

    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Assess No.</TableHead>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Explanation Topic</TableHead>
                <TableHead className="hidden lg:table-cell">Sent To</TableHead>
                <TableHead className="hidden lg:table-cell">Sent By</TableHead>
                <TableHead className="hidden xl:table-cell">Sent Date</TableHead>
                <TableHead className="hidden xl:table-cell">Explanation Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssessments.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                  <TableCell className="font-mono text-xs text-foreground">{a.assess_no}</TableCell>
                  <TableCell className="font-mono text-xs text-primary">{a.complaint_id}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[a.assessment_status] ?? ''}`}>
                      {a.assessment_status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{a.explanation_topic}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{a.sent_to}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{a.sent_by}</TableCell>
                  <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">{a.sent_date}</TableCell>
                  <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">{a.explanation_date ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AssessmentReportPage;
