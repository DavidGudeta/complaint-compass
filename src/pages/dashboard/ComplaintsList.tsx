import { mockComplaints } from '@/lib/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ClipboardList, Search } from 'lucide-react';
import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const ComplaintsList = () => {
  const [search, setSearch] = useState('');
  const filtered = mockComplaints.filter(c =>
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.tin.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-secondary" /> All Complaints
        </h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, name or TIN..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Complainant</TableHead>
                  <TableHead className="hidden md:table-cell">TIN</TableHead>
                  <TableHead className="hidden lg:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{c.id}</TableCell>
                    <TableCell className="text-foreground">{c.fullName}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{c.tin}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{c.category || '—'}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {new Date(c.createdAt).toLocaleDateString()}
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
};

export default ComplaintsList;
