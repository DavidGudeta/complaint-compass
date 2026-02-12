import { mockAssessments, mockComplaints } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AssessmentsList = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <CheckCircle className="w-6 h-6 text-secondary" /> All Assessments
    </h1>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAssessments.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                  <TableCell className="text-foreground">{a.complaintId}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${a.type === 'officer' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                      {a.type}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{a.content}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(a.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AssessmentsList;
