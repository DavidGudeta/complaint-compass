import { mockStaffUsers } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';

const UserStatusPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <UserCheck className="w-6 h-6 text-secondary" /> User Status
    </h1>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStaffUsers.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{u.role.replace('_', ' ')}</TableCell>
                  <TableCell>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">Active</span>
                  </TableCell>
                  <TableCell><Switch defaultChecked /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default UserStatusPage;
