import { mockResponses } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ResponsesList = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
      <MessageSquare className="w-6 h-6 text-secondary" /> All Responses
    </h1>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead>Sent to User</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResponses.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                  <TableCell className="text-foreground">{r.complaintId}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{r.content}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${r.sentToUser ? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'}`}>
                      {r.sentToUser ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ResponsesList;
