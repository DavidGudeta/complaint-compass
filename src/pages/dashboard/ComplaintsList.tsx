import { useState } from 'react';
import { mockComplaints as initialComplaints, mockStaffUsers } from '@/lib/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Complaint } from '@/lib/types';
import ComplaintDetailSheet from '@/components/ComplaintDetailSheet';

const staffMap = Object.fromEntries(mockStaffUsers.map(u => [u.id, u.name]));

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<'detail' | 'edit'>('detail');
  const [deleteTarget, setDeleteTarget] = useState<Complaint | null>(null);

  const filtered = complaints.filter(c =>
    c.complaint_code.toLowerCase().includes(search.toLowerCase()) ||
    c.complainant_name.toLowerCase().includes(search.toLowerCase()) ||
    c.taxpayer_name.toLowerCase().includes(search.toLowerCase()) ||
    c.tin.includes(search) ||
    c.complaint_title.toLowerCase().includes(search.toLowerCase())
  );

  const openDetail = (c: Complaint) => { setSelected(c); setSheetMode('detail'); setSheetOpen(true); };
  const openEdit = (c: Complaint) => { setSelected(c); setSheetMode('edit'); setSheetOpen(true); };

  const handleUpdate = (updated: Complaint) => {
    setComplaints(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelected(updated);
  };

  const handleDelete = (id: string) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
    setSheetOpen(false);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-secondary" /> All Complaints
        </h1>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by code, name, TIN..."
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
                  <TableHead>Complaint Code</TableHead>
                  <TableHead>Complaint Title</TableHead>
                  <TableHead>Taxpayer Name</TableHead>
                  <TableHead>TIN</TableHead>
                  <TableHead className="hidden md:table-cell">Complainant</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Sub-Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Case Type</TableHead>
                  <TableHead className="hidden xl:table-cell">Tax Center</TableHead>
                  <TableHead className="hidden xl:table-cell">Complaints On</TableHead>
                  <TableHead className="hidden xl:table-cell">Ref. No.</TableHead>
                  <TableHead className="hidden xl:table-cell">Machine Code</TableHead>
                  <TableHead className="hidden xl:table-cell">Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? filtered.map(c => (
                  <TableRow key={c.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground whitespace-nowrap">{c.complaint_code}</TableCell>
                    <TableCell className="text-foreground max-w-[180px] truncate" title={c.complaint_title}>{c.complaint_title}</TableCell>
                    <TableCell className="text-foreground whitespace-nowrap">{c.taxpayer_name}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">{c.tin}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground whitespace-nowrap">{c.complainant_name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{c.complainant_phone}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{c.category || '—'}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{c.subcategory || '—'}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className="text-xs">{c.case_type}</Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-xs">{c.tax_center || '—'}</TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-xs max-w-[120px] truncate" title={c.complaints_on}>{c.complaints_on}</TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-xs">{c.reference_number || '—'}</TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-xs">{c.machine_code || '—'}</TableCell>
                    <TableCell className="hidden xl:table-cell text-muted-foreground text-xs">{c.assigned_to ? staffMap[c.assigned_to] ?? c.assigned_to : '—'}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm whitespace-nowrap">
                      {new Date(c.applied_date).toLocaleDateString()}
                    </TableCell>
                     <TableCell>
                       <div className="flex items-center gap-1">
                         <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary" title="View Details" onClick={() => openDetail(c)}>
                           <Eye className="w-4 h-4" />
                         </Button>
                         <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground" title="Edit" onClick={() => openEdit(c)}>
                           <Pencil className="w-4 h-4" />
                         </Button>
                         <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive" title="Delete" onClick={() => setDeleteTarget(c)}>
                           <Trash2 className="w-4 h-4" />
                         </Button>
                       </div>
                     </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={17} className="text-center text-muted-foreground py-8">No complaints found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ComplaintDetailSheet
        complaint={selected}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        initialMode={sheetMode}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={v => { if (!v) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteTarget?.complaint_code}</strong>? This action cannot be undone.
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

export default ComplaintsList;
