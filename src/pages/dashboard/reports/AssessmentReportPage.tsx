import { mockAssessments } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Total</p><p className="text-2xl font-bold text-foreground">{mockAssessments.length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Officer</p><p className="text-2xl font-bold text-foreground">{mockAssessments.filter(a => a.type === 'officer').length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Directorate</p><p className="text-2xl font-bold text-foreground">{mockAssessments.filter(a => a.type === 'directorate').length}</p></CardContent></Card>
    </div>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssessments.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                  <TableCell className="text-foreground">{a.complaintId}</TableCell>
                  <TableCell><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${a.type === 'officer' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>{a.type}</span></TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{a.content}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(a.createdAt).toLocaleDateString()}</TableCell>
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
