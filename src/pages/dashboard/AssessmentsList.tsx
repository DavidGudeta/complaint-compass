import { mockAssessments } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const statusColor: Record<string, string> = {
  Pending:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Sent:      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Responded: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  Closed:    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

const AssessmentsList = () => {
  const [search, setSearch] = useState('');
  const filtered = mockAssessments.filter(a =>
    a.assess_no.toLowerCase().includes(search.toLowerCase()) ||
    a.complaint_id.toLowerCase().includes(search.toLowerCase()) ||
    a.explanation_topic.toLowerCase().includes(search.toLowerCase()) ||
    a.sent_to.toLowerCase().includes(search.toLowerCase()) ||
    a.sent_by.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-secondary" /> All Assessments
        </h1>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
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
                  <TableHead>Assess No.</TableHead>
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Explanation Topic</TableHead>
                  <TableHead className="hidden lg:table-cell">Sent To</TableHead>
                  <TableHead className="hidden lg:table-cell">Sent By</TableHead>
                  <TableHead className="hidden xl:table-cell">Sent Date</TableHead>
                  <TableHead className="hidden xl:table-cell">Explanation Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium text-foreground">{a.id}</TableCell>
                    <TableCell className="font-mono text-xs text-foreground">{a.assess_no}</TableCell>
                    <TableCell className="font-mono text-xs text-primary">{a.complaint_id}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[a.assessment_status] ?? ''}`}>
                        {a.assessment_status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">{a.explanation_topic}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{a.sent_to}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{a.sent_by}</TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">{a.sent_date}</TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">{a.explanation_date ?? '—'}</TableCell>
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

export default AssessmentsList;
