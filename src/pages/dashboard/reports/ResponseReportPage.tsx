import { mockResponses } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ResponseReportPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-secondary" /> Response Report
      </h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> PDF</Button>
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> Excel</Button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Total Responses</p><p className="text-2xl font-bold text-foreground">{mockResponses.length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Sent to User</p><p className="text-2xl font-bold text-foreground">{mockResponses.filter(r => r.sentToUser).length}</p></CardContent></Card>
    </div>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResponses.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-foreground">{r.id}</TableCell>
                  <TableCell className="text-foreground">{r.complaintId}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{r.content}</TableCell>
                  <TableCell><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${r.sentToUser ? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'}`}>{r.sentToUser ? 'Yes' : 'No'}</span></TableCell>
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

export default ResponseReportPage;
