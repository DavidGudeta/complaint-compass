import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReopenedComplaintsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <ClipboardList className="w-6 h-6 text-secondary" /> Re-opened Complaints
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
                <TableHead>Original Status</TableHead>
                <TableHead>Re-opened Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No re-opened complaints</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ReopenedComplaintsPage;
