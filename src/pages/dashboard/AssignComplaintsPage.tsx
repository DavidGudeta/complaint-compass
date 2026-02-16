import { mockComplaints, mockStaffUsers } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const officers = mockStaffUsers.filter(u => u.role === 'officer');
const assignable = mockComplaints.filter(c => c.status === 'Categorized' || c.status === 'New');

const AssignComplaintsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <UserCheck className="w-6 h-6 text-secondary" /> Assign Complaints
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
                <TableHead>Assign To</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignable.length > 0 ? assignable.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-foreground">{c.id}</TableCell>
                  <TableCell className="text-foreground">{c.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{c.category || '—'}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-40 h-8 text-xs">
                        <SelectValue placeholder="Select officer" />
                      </SelectTrigger>
                      <SelectContent>
                        {officers.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="text-xs gradient-primary text-primary-foreground">Assign</Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No complaints to assign</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AssignComplaintsPage;
