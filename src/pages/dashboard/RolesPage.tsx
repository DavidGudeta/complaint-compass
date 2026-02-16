import { Card, CardContent } from '@/components/ui/card';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const roles = [
  { name: 'Admin', description: 'Full system access, user management', users: 1 },
  { name: 'Director', description: 'Complaint settings, oversight, reports', users: 1 },
  { name: 'Team Leader', description: 'Assign complaints, team KPIs', users: 1 },
  { name: 'Officer', description: 'Handle complaints, assessments, responses', users: 2 },
  { name: 'Directorate', description: 'Secondary assessments, official responses', users: 1 },
];

const RolesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Shield className="w-6 h-6 text-secondary" /> Roles
      </h1>
      <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Add Role</Button>
    </div>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(r => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium text-foreground">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.description}</TableCell>
                  <TableCell className="text-foreground">{r.users}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
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

export default RolesPage;
