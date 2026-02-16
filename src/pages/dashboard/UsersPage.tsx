import { mockStaffUsers } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const roleBadge: Record<string, string> = {
  admin: 'bg-destructive/10 text-destructive',
  director: 'bg-primary/10 text-primary',
  team_leader: 'bg-accent/10 text-accent-foreground',
  officer: 'bg-secondary/10 text-secondary',
  directorate: 'bg-muted text-muted-foreground',
};

const UsersPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Users className="w-6 h-6 text-secondary" /> Users
      </h1>
      <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Add User</Button>
    </div>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Directorate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStaffUsers.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${roleBadge[u.role] || ''}`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.directorate || '—'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-destructive">Delete</Button>
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

export default UsersPage;
