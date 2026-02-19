import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Assessment } from '@/lib/types';
import { mockComplaints } from '@/lib/mockData';
import { Pencil, Trash2, X, Save, ClipboardCheck, Hash, User, Calendar, FileText, MessageSquare, Plus } from 'lucide-react';

interface AssessmentDetailSheetProps {
  assessment: Assessment | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updated: Assessment) => void;
  onDelete: (id: string) => void;
}

const statusColor: Record<string, string> = {
  Pending:   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Sent:      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Responded: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  Closed:    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

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

interface AddAssessmentDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (assessment: Assessment) => void;
}

const emptyForm = (): Omit<Assessment, 'id'> => ({
  complaint_id: '',
  assessment_status: 'Pending',
  assess_no: `ASN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`,
  explanation_topic: '',
  sent_to: '',
  sent_date: new Date().toISOString().slice(0, 10),
  sent_by: '',
  explanation_date: '',
});

export const AddAssessmentDialog = ({ open, onClose, onAdd }: AddAssessmentDialogProps) => {
  const [form, setForm] = useState(emptyForm());

  const handleAdd = () => {
    const newAssessment: Assessment = {
      ...form,
      id: `ASS-${Date.now()}`,
      explanation_date: form.explanation_date || undefined,
    };
    onAdd(newAssessment);
    setForm(emptyForm());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Add New Assessment
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="space-y-1.5">
            <Label>Assess No.</Label>
            <Input value={form.assess_no} onChange={e => setForm({ ...form, assess_no: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Complaint ID</Label>
            <Select value={form.complaint_id} onValueChange={v => setForm({ ...form, complaint_id: v })}>
              <SelectTrigger><SelectValue placeholder="Select complaint" /></SelectTrigger>
              <SelectContent>
                {mockComplaints.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.complaint_code} — {c.complainant_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Explanation Topic</Label>
            <Input value={form.explanation_topic} onChange={e => setForm({ ...form, explanation_topic: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Sent To</Label>
            <Input value={form.sent_to} onChange={e => setForm({ ...form, sent_to: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Sent By</Label>
            <Input value={form.sent_by} onChange={e => setForm({ ...form, sent_by: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Sent Date</Label>
            <Input type="date" value={form.sent_date} onChange={e => setForm({ ...form, sent_date: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>Explanation Date</Label>
            <Input type="date" value={form.explanation_date || ''} onChange={e => setForm({ ...form, explanation_date: e.target.value })} />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Status</Label>
            <Select value={form.assessment_status} onValueChange={v => setForm({ ...form, assessment_status: v as Assessment['assessment_status'] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Responded">Responded</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!form.complaint_id || !form.explanation_topic || !form.sent_to || !form.sent_by}>
            Add Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AssessmentDetailSheet = ({ assessment, open, onClose, onUpdate, onDelete }: AssessmentDetailSheetProps) => {
  const [editing, setEditing] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [form, setForm] = useState<Assessment | null>(null);

  const startEdit = () => {
    setForm(assessment ? { ...assessment } : null);
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

  if (!assessment) return null;

  const complaint = mockComplaints.find(c => c.id === assessment.complaint_id);

  return (
    <>
      <Sheet open={open} onOpenChange={v => { if (!v) onClose(); }}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0">
          {/* Header */}
          <div className="gradient-primary p-6 text-primary-foreground">
            <SheetHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ClipboardCheck className="w-5 h-5 opacity-80" />
                    <span className="text-sm font-mono opacity-80">{assessment.assess_no}</span>
                  </div>
                  <SheetTitle className="text-primary-foreground text-xl font-bold leading-tight">
                    {assessment.explanation_topic}
                  </SheetTitle>
                  <p className="text-primary-foreground/70 text-sm mt-1">
                    Linked to: {assessment.complaint_id}
                  </p>
                </div>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[assessment.assessment_status] ?? ''}`}>
                  {assessment.assessment_status}
                </span>
              </div>
            </SheetHeader>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-6 py-3 border-b bg-muted/30">
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Assess No.</Label>
                    <Input value={form.assess_no} onChange={e => setForm({ ...form, assess_no: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Status</Label>
                    <Select value={form.assessment_status} onValueChange={v => setForm({ ...form, assessment_status: v as Assessment['assessment_status'] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                        <SelectItem value="Responded">Responded</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label>Explanation Topic</Label>
                    <Input value={form.explanation_topic} onChange={e => setForm({ ...form, explanation_topic: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Sent To</Label>
                    <Input value={form.sent_to} onChange={e => setForm({ ...form, sent_to: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Sent By</Label>
                    <Input value={form.sent_by} onChange={e => setForm({ ...form, sent_by: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Sent Date</Label>
                    <Input type="date" value={form.sent_date} onChange={e => setForm({ ...form, sent_date: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Explanation Date</Label>
                    <Input type="date" value={form.explanation_date || ''} onChange={e => setForm({ ...form, explanation_date: e.target.value })} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/40 px-5 py-3 flex items-center gap-3 border-b">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Assessment Record</p>
                      <p className="text-xs text-muted-foreground">{assessment.assess_no}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* IDs */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Assess No.</p>
                        <p className="text-sm font-mono font-bold text-primary mt-0.5">{assessment.assess_no}</p>
                      </div>
                      <div className="text-center border-l border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                        <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[assessment.assessment_status] ?? ''}`}>
                          {assessment.assessment_status}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Linked complaint */}
                    {complaint && (
                      <>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Linked Complaint</p>
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-1">
                            <p className="text-sm font-semibold text-primary">{complaint.complaint_code}</p>
                            <p className="text-sm text-foreground">{complaint.complaint_title}</p>
                            <p className="text-xs text-muted-foreground">{complaint.complainant_name} • {complaint.taxpayer_name}</p>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    {/* Assessment details */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Assessment Details</p>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoRow icon={MessageSquare} label="Explanation Topic" value={assessment.explanation_topic} />
                        <InfoRow icon={Hash} label="Assessment ID" value={assessment.id} />
                        <InfoRow icon={User} label="Sent To" value={assessment.sent_to} />
                        <InfoRow icon={User} label="Sent By" value={assessment.sent_by} />
                        <InfoRow icon={Calendar} label="Sent Date" value={assessment.sent_date} />
                        <InfoRow icon={Calendar} label="Explanation Date" value={assessment.explanation_date} />
                        <InfoRow icon={FileText} label="Complaint ID" value={assessment.complaint_id} />
                      </div>
                    </div>

                    {assessment.content && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Assessment Content</p>
                          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                            <p className="text-sm text-foreground leading-relaxed">{assessment.content}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Assessment Record • MOR Complaints Portal • {new Date().toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete assessment <strong>{assessment.assess_no}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { onDelete(assessment.id); setDeleteDialog(false); onClose(); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AssessmentDetailSheet;
