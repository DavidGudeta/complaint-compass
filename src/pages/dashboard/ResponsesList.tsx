import { useState } from 'react';
import { mockResponses as initialResponses } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Eye, Pencil, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Response } from '@/lib/types';
import ResponseDetailSheet, { ResponseSheetMode } from '@/components/ResponseDetailSheet';

const statusColors: Record<string, string> = {
  'Draft': 'bg-muted text-muted-foreground',
  'Pending Approval': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Approved': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Sent': 'bg-secondary/15 text-secondary',
};

const ResponsesList = () => {
  const [responses, setResponses] = useState<Response[]>(initialResponses);
  const [selected, setSelected] = useState<Response | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<ResponseSheetMode>('detail');
  const [deleteTarget, setDeleteTarget] = useState<Response | null>(null);

  const openSheet = (r: Response, mode: ResponseSheetMode) => { setSelected(r); setSheetMode(mode); setSheetOpen(true); };
  const handleUpdate = (updated: Response) => setResponses(prev => prev.map(r => r.id === updated.id ? updated : r));
  const handleDelete = (id: string) => { setResponses(prev => prev.filter(r => r.id !== id)); setSheetOpen(false); setSelected(null); };

  return (
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
                  <TableHead>Response ID</TableHead>
                  <TableHead>Complaint</TableHead>
                  <TableHead className="hidden md:table-cell">Subject</TableHead>
                  <TableHead className="hidden lg:table-cell">Content</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map(r => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground whitespace-nowrap">{r.id}</TableCell>
                    <TableCell className="text-foreground whitespace-nowrap">{r.complaintId}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-[160px] truncate" title={r.subject}>{r.subject || '—'}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground max-w-[200px] truncate" title={r.content}>{r.content}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[r.response_status] || 'bg-muted text-muted-foreground'}`}>
                        {r.response_status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm whitespace-nowrap">{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary" title="View Details" onClick={() => openSheet(r, 'detail')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" title="Edit" onClick={() => openSheet(r, 'edit')}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-secondary" title="Send" onClick={() => openSheet(r, 'send')}>
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive" title="Delete" onClick={() => setDeleteTarget(r)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ResponseDetailSheet
        response={selected}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        initialMode={sheetMode}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={v => { if (!v) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Response</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.id}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { if (deleteTarget) handleDelete(deleteTarget.id); setDeleteTarget(null); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResponsesList;
