import { mockComplaints } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const closed = mockComplaints.filter(c => c.status === 'Closed' || c.status === 'Rejected');

const ClosedComplaintsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <ClipboardList className="w-6 h-6 text-secondary" /> Closed Complaints
    </h1>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Complainant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closed.length > 0 ? closed.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-foreground">{c.id}</TableCell>
                  <TableCell className="text-foreground">{c.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{c.category || '—'}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(c.updatedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No closed complaints</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ClosedComplaintsPage;
