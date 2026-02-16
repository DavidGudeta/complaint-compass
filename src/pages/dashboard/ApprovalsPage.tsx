import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const pendingApprovals = [
  { id: 'RES-001', complaint: 'CMP-2026-005', officer: 'Officer Sara', content: 'Withholding tax correction issued.', date: '2026-02-11' },
];

const ApprovalsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <CheckCircle className="w-6 h-6 text-secondary" /> All Approvals
    </h1>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Response ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                  <TableCell className="text-foreground">{a.complaint}</TableCell>
                  <TableCell className="text-muted-foreground">{a.officer}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{a.content}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{a.date}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button size="sm" className="text-xs gradient-primary text-primary-foreground">Approve</Button>
                    <Button size="sm" variant="outline" className="text-xs text-destructive">Reject</Button>
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

export default ApprovalsPage;
