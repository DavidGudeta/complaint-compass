import { mockComplaints } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { Badge } from '@/components/ui/badge';
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
                <TableHead>Complaint Code</TableHead>
                <TableHead>Complaint Title</TableHead>
                <TableHead>Taxpayer Name</TableHead>
                <TableHead>TIN</TableHead>
                <TableHead className="hidden md:table-cell">Complainant</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Case Type</TableHead>
                <TableHead className="hidden lg:table-cell">Tax Center</TableHead>
                <TableHead className="hidden xl:table-cell">Ref. No.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Applied Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {closed.length > 0 ? closed.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-foreground whitespace-nowrap">{c.complaint_code}</TableCell>
                  <TableCell className="text-foreground max-w-[160px] truncate" title={c.complaint_title}>{c.complaint_title}</TableCell>
                  <TableCell className="text-foreground">{c.taxpayer_name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{c.tin}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{c.complainant_name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{c.complainant_phone}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{c.category || '—'}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className="text-xs">{c.case_type}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">{c.tax_center || '—'}</TableCell>
                  <TableCell className="hidden xl:table-cell text-muted-foreground text-xs">{c.reference_number || '—'}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{new Date(c.applied_date).toLocaleDateString()}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center text-muted-foreground py-8">No closed complaints</TableCell>
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
