import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const feedbackData = [
  { id: 'FB-001', complaint: 'CMP-2026-005', name: 'Michael Tesfaye', rating: 4, comment: 'Issue resolved satisfactorily.', date: '2026-02-12' },
  { id: 'FB-002', complaint: 'CMP-2026-001', name: 'John Doe', rating: 3, comment: 'Still waiting for final resolution.', date: '2026-02-10' },
];

const FeedbackReportPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-secondary" /> Feedback Report
      </h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> PDF</Button>
        <Button variant="outline" size="sm" className="text-xs"><Download className="w-3 h-3 mr-1" /> Excel</Button>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Total Feedback</p><p className="text-2xl font-bold text-foreground">{feedbackData.length}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Avg Rating</p><p className="text-2xl font-bold text-foreground">{(feedbackData.reduce((s, f) => s + f.rating, 0) / feedbackData.length).toFixed(1)}</p></CardContent></Card>
      <Card className="glass-card"><CardContent className="p-4 text-center"><p className="text-muted-foreground text-sm">Satisfied (%)</p><p className="text-2xl font-bold text-foreground">{Math.round((feedbackData.filter(f => f.rating >= 4).length / feedbackData.length) * 100)}%</p></CardContent></Card>
    </div>
    <Card className="glass-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Complaint</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell">Comment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackData.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium text-foreground">{f.id}</TableCell>
                  <TableCell className="text-foreground">{f.complaint}</TableCell>
                  <TableCell className="text-foreground">{f.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < f.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{f.comment}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{f.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default FeedbackReportPage;
