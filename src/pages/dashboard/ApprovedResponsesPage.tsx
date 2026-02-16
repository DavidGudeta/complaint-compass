import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const approved = [
  { id: 'RES-001', complaint: 'CMP-2026-005', content: 'Withholding tax correction issued.', approvedBy: 'Team Lead A', date: '2026-02-11' },
];

const ApprovedResponsesPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <CheckCircle className="w-6 h-6 text-secondary" /> Approved Responses
    </h1>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Response ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approved.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                  <TableCell className="text-foreground">{a.complaint}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{a.content}</TableCell>
                  <TableCell className="text-muted-foreground">{a.approvedBy}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{a.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ApprovedResponsesPage;
