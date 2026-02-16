import { mockComplaints } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const unassigned = mockComplaints.filter(c => !c.assignedOfficer);

const UnassignedComplaintsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <ClipboardList className="w-6 h-6 text-secondary" /> Unassigned Complaints
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
              {unassigned.length > 0 ? unassigned.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-foreground">{c.id}</TableCell>
                  <TableCell className="text-foreground">{c.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{c.category || '—'}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">All complaints are assigned</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default UnassignedComplaintsPage;
