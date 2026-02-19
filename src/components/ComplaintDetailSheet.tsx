import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/StatusBadge';
import { Complaint } from '@/lib/types';
import { mockStaffUsers, CATEGORIES, TAX_CENTERS } from '@/lib/mockData';
import { Download, Pencil, Trash2, X, Save, FileText, Building2, Phone, Mail, Hash, Calendar, User, Tag, MapPin, Layers } from 'lucide-react';

interface ComplaintDetailSheetProps {
  complaint: Complaint | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updated: Complaint) => void;
  onDelete: (id: string) => void;
}

const staffMap = Object.fromEntries(mockStaffUsers.map(u => [u.id, u.name]));

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | null }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
      <p className="text-sm text-foreground font-medium mt-0.5 break-words">{value || '—'}</p>
    </div>
  </div>
);

const ComplaintDetailSheet = ({ complaint, open, onClose, onUpdate, onDelete }: ComplaintDetailSheetProps) => {
  const [editing, setEditing] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [form, setForm] = useState<Complaint | null>(null);

  const startEdit = () => {
    setForm(complaint ? { ...complaint } : null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setForm(null);
  };

  const saveEdit = () => {
    if (form) {
      onUpdate(form);
      setEditing(false);
      setForm(null);
    }
  };

  const handleDownload = () => {
    if (!complaint) return;
    const lines = [
      'MINISTRY OF REVENUES — COMPLAINT RECORD',
      '================================================',
      '',
      `Complaint Code : ${complaint.complaint_code}`,
      `Case Status    : ${complaint.case_status}`,
      `Applied Date   : ${complaint.applied_date}`,
      `Case Type      : ${complaint.case_type}`,
      '',
      '--- TAXPAYER INFORMATION ---',
      `Name           : ${complaint.taxpayer_name}`,
      `TIN            : ${complaint.tin}`,
      `Phone          : ${complaint.taxpayer_phone}`,
      '',
      '--- COMPLAINANT INFORMATION ---',
      `Name           : ${complaint.complainant_name}`,
      `Phone          : ${complaint.complainant_phone}`,
      `Email          : ${complaint.complainant_email}`,
      '',
      '--- COMPLAINT DETAILS ---',
      `Title          : ${complaint.complaint_title}`,
      `Category       : ${complaint.category || complaint.category_id}`,
      `Sub-Category   : ${complaint.subcategory || complaint.sub_category_id}`,
      `Complaints On  : ${complaint.complaints_on}`,
      `Tax Center     : ${complaint.tax_center || '—'}`,
      `Reference No.  : ${complaint.reference_number || '—'}`,
      `Machine Code   : ${complaint.machine_code || '—'}`,
      `Assigned To    : ${complaint.assigned_to ? (staffMap[complaint.assigned_to] ?? complaint.assigned_to) : '—'}`,
      '',
      '--- DESCRIPTION ---',
      complaint.details,
      '',
      '================================================',
      `Generated: ${new Date().toLocaleString()}`,
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${complaint.complaint_code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!complaint) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={v => { if (!v) onClose(); }}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-0">
          {/* Header */}
          <div className="gradient-primary p-6 text-primary-foreground">
            <SheetHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 opacity-80" />
                    <span className="text-sm font-mono opacity-80">{complaint.complaint_code}</span>
                  </div>
                  <SheetTitle className="text-primary-foreground text-xl font-bold leading-tight">
                    {complaint.complaint_title}
                  </SheetTitle>
                </div>
                <StatusBadge status={complaint.status} />
              </div>
            </SheetHeader>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-6 py-3 border-b bg-muted/30">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Download
            </Button>
            {!editing ? (
              <Button size="sm" variant="outline" className="gap-1.5" onClick={startEdit}>
                <Pencil className="w-4 h-4" /> Edit
              </Button>
            ) : (
              <>
                <Button size="sm" className="gap-1.5" onClick={saveEdit}>
                  <Save className="w-4 h-4" /> Save
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5" onClick={cancelEdit}>
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </>
            )}
            <Button size="sm" variant="destructive" className="gap-1.5 ml-auto" onClick={() => setDeleteDialog(true)}>
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {editing && form ? (
              /* ── EDIT FORM ── */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <Label>Complaint Title</Label>
                    <Input value={form.complaint_title} onChange={e => setForm({ ...form, complaint_title: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Taxpayer Name</Label>
                    <Input value={form.taxpayer_name} onChange={e => setForm({ ...form, taxpayer_name: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>TIN</Label>
                    <Input value={form.tin} onChange={e => setForm({ ...form, tin: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Taxpayer Phone</Label>
                    <Input value={form.taxpayer_phone} onChange={e => setForm({ ...form, taxpayer_phone: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Complainant Name</Label>
                    <Input value={form.complainant_name} onChange={e => setForm({ ...form, complainant_name: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Complainant Phone</Label>
                    <Input value={form.complainant_phone} onChange={e => setForm({ ...form, complainant_phone: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Complainant Email</Label>
                    <Input value={form.complainant_email} onChange={e => setForm({ ...form, complainant_email: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Select value={form.category || ''} onValueChange={v => setForm({ ...form, category: v })}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Sub-Category</Label>
                    <Input value={form.subcategory || ''} onChange={e => setForm({ ...form, subcategory: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Case Type</Label>
                    <Select value={form.case_type} onValueChange={v => setForm({ ...form, case_type: v as Complaint['case_type'] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tax Center</Label>
                    <Select value={form.tax_center || ''} onValueChange={v => setForm({ ...form, tax_center: v })}>
                      <SelectTrigger><SelectValue placeholder="Select center" /></SelectTrigger>
                      <SelectContent>
                        {TAX_CENTERS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Reference Number</Label>
                    <Input value={form.reference_number || ''} onChange={e => setForm({ ...form, reference_number: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Machine Code</Label>
                    <Input value={form.machine_code || ''} onChange={e => setForm({ ...form, machine_code: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Complaints On</Label>
                    <Input value={form.complaints_on} onChange={e => setForm({ ...form, complaints_on: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Assigned To</Label>
                    <Select value={form.assigned_to || ''} onValueChange={v => setForm({ ...form, assigned_to: v })}>
                      <SelectTrigger><SelectValue placeholder="Select officer" /></SelectTrigger>
                      <SelectContent>
                        {mockStaffUsers.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label>Details</Label>
                    <Textarea rows={4} value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
                  </div>
                </div>
              </div>
            ) : (
              /* ── LETTER VIEW ── */
              <>
                {/* Official letter header */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/40 px-5 py-3 flex items-center gap-3 border-b">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Ministry of Revenues</p>
                      <p className="text-xs text-muted-foreground">Complaint Reference Document</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs text-muted-foreground">Date Filed</p>
                      <p className="text-sm font-semibold text-foreground">{new Date(complaint.applied_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* IDs row */}
                    <div className="grid grid-cols-3 gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Code</p>
                        <p className="text-sm font-mono font-bold text-primary mt-0.5">{complaint.complaint_code}</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Status ID</p>
                        <p className="text-sm font-mono font-semibold text-foreground mt-0.5">{complaint.status_id}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Case Type</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{complaint.case_type}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Taxpayer info */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Taxpayer Information</p>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoRow icon={Building2} label="Taxpayer Name" value={complaint.taxpayer_name} />
                        <InfoRow icon={Hash} label="TIN" value={complaint.tin} />
                        <InfoRow icon={Phone} label="Taxpayer Phone" value={complaint.taxpayer_phone} />
                      </div>
                    </div>

                    <Separator />

                    {/* Complainant info */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Complainant Information</p>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoRow icon={User} label="Complainant Name" value={complaint.complainant_name} />
                        <InfoRow icon={Phone} label="Phone" value={complaint.complainant_phone} />
                        <InfoRow icon={Mail} label="Email" value={complaint.complainant_email} />
                      </div>
                    </div>

                    <Separator />

                    {/* Classification */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Classification & Assignment</p>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoRow icon={Tag} label="Category" value={complaint.category || complaint.category_id} />
                        <InfoRow icon={Layers} label="Sub-Category" value={complaint.subcategory || complaint.sub_category_id} />
                        <InfoRow icon={MapPin} label="Tax Center" value={complaint.tax_center} />
                        <InfoRow icon={Building2} label="Complaints On" value={complaint.complaints_on} />
                        <InfoRow icon={User} label="Assigned To" value={complaint.assigned_to ? (staffMap[complaint.assigned_to] ?? complaint.assigned_to) : undefined} />
                        <InfoRow icon={Hash} label="Reference No." value={complaint.reference_number} />
                        <InfoRow icon={Hash} label="Machine Code" value={complaint.machine_code} />
                        <InfoRow icon={Calendar} label="Applied Date" value={new Date(complaint.applied_date).toLocaleDateString()} />
                      </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Complaint Description</p>
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                        <p className="text-sm text-foreground leading-relaxed">{complaint.details}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <p className="text-xs text-center text-muted-foreground">
                  Document generated by MOR Complaints Portal • {new Date().toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{complaint.complaint_code}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { onDelete(complaint.id); setDeleteDialog(false); onClose(); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ComplaintDetailSheet;
