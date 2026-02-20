import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Response } from '@/lib/types';
import { mockStaffUsers, mockComplaints } from '@/lib/mockData';
import { MessageSquare, Download, Pencil, Trash2, X, Save, Send, FileText, User, Mail, Calendar, Hash, CheckCircle, Clock } from 'lucide-react';

export type ResponseSheetMode = 'detail' | 'edit' | 'send';

interface ResponseDetailSheetProps {
  response: Response | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updated: Response) => void;
  onDelete: (id: string) => void;
  initialMode?: ResponseSheetMode;
}

const staffMap = Object.fromEntries(mockStaffUsers.map(u => [u.id, u.name]));
const complaintMap = Object.fromEntries(mockComplaints.map(c => [c.id, c]));

const statusColors: Record<string, string> = {
  'Draft': 'bg-muted text-muted-foreground',
  'Pending Approval': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Approved': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Sent': 'bg-secondary/15 text-secondary',
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

const ResponseDetailSheet = ({ response, open, onClose, onUpdate, onDelete, initialMode = 'detail' }: ResponseDetailSheetProps) => {
  const [mode, setMode] = useState<ResponseSheetMode>(initialMode);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [form, setForm] = useState<Response | null>(null);
  const [sendForm, setSendForm] = useState({ recipient_name: '', recipient_email: '', subject: '', notes: '' });

  useEffect(() => {
    if (open && response) {
      setMode(initialMode);
      setForm({ ...response });
      setSendForm({
        recipient_name: response.recipient_name || '',
        recipient_email: response.recipient_email || '',
        subject: response.subject || '',
        notes: response.notes || '',
      });
    } else if (!open) {
      setMode('detail');
      setForm(null);
    }
  }, [open, initialMode, response?.id]);

  const handleOpenChange = (v: boolean) => {
    if (!v) { onClose(); }
  };

  const saveEdit = () => {
    if (form) { onUpdate(form); setMode('detail'); }
  };

  const confirmSend = () => {
    if (response) {
      onUpdate({
        ...response,
        ...sendForm,
        sentToUser: true,
        response_status: 'Sent',
        sent_date: new Date().toISOString().split('T')[0],
      });
      setMode('detail');
    }
  };

  const handleDownload = () => {
    if (!response) return;
    const complaint = complaintMap[response.complaintId];
    const lines = [
      'MINISTRY OF REVENUES — OFFICIAL RESPONSE DOCUMENT',
      '====================================================',
      '',
      `Response ID    : ${response.id}`,
      `Complaint ID   : ${response.complaintId}`,
      `Status         : ${response.response_status}`,
      `Created        : ${new Date(response.createdAt).toLocaleDateString()}`,
      `Responded By   : ${staffMap[response.respondedBy] ?? response.respondedBy}`,
      '',
      '--- RECIPIENT INFORMATION ---',
      `Name           : ${response.recipient_name || complaint?.taxpayer_name || '—'}`,
      `Email          : ${response.recipient_email || complaint?.complainant_email || '—'}`,
      '',
      '--- RESPONSE CONTENT ---',
      `Subject        : ${response.subject || '—'}`,
      '',
      response.content,
      '',
      response.approved_by ? `Approved By    : ${response.approved_by}` : '',
      response.approved_date ? `Approved Date  : ${response.approved_date}` : '',
      response.sent_date ? `Sent Date      : ${response.sent_date}` : '',
      '',
      '====================================================',
      `Generated: ${new Date().toLocaleString()}`,
    ].filter(l => l !== undefined).join('\n');

    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${response.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!response) return null;

  const complaint = complaintMap[response.complaintId];

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-0">
          {/* Header */}
          <div className="gradient-primary p-6 text-primary-foreground">
            <SheetHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-5 h-5 opacity-80" />
                    <span className="text-sm font-mono opacity-80">{response.id}</span>
                  </div>
                  <SheetTitle className="text-primary-foreground text-xl font-bold leading-tight">
                    {response.subject || `Response for ${response.complaintId}`}
                  </SheetTitle>
                  <p className="text-sm opacity-70 mt-1">Complaint: {response.complaintId}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[response.response_status] || 'bg-muted text-muted-foreground'}`}>
                  {response.response_status}
                </span>
              </div>
            </SheetHeader>
          </div>

          {/* Actions bar */}
          <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b bg-muted/30">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Download
            </Button>
            {mode === 'detail' && (
              <>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setMode('edit')}>
                  <Pencil className="w-4 h-4" /> Edit
                </Button>
                <Button size="sm" className="gap-1.5 gradient-primary text-primary-foreground" onClick={() => setMode('send')}>
                  <Send className="w-4 h-4" /> Send
                </Button>
              </>
            )}
            {mode === 'edit' && (
              <>
                <Button size="sm" className="gap-1.5" onClick={saveEdit}>
                  <Save className="w-4 h-4" /> Save
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => setMode('detail')}>
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </>
            )}
            {mode === 'send' && (
              <>
                <Button size="sm" className="gap-1.5 gradient-primary text-primary-foreground" onClick={confirmSend}>
                  <Send className="w-4 h-4" /> Confirm Send
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => setMode('detail')}>
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </>
            )}
            <Button size="sm" variant="destructive" className="gap-1.5 ml-auto" onClick={() => setDeleteDialog(true)}>
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>

          {/* Mode tabs indicator */}
          <div className="flex border-b">
            {(['detail', 'edit', 'send'] as ResponseSheetMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  mode === m
                    ? 'border-b-2 border-primary text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'detail' ? 'Detail View' : m === 'edit' ? 'Edit' : 'Send'}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">

            {/* ── DETAIL VIEW ── */}
            {mode === 'detail' && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/40 px-5 py-3 flex items-center gap-3 border-b">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Ministry of Revenues</p>
                    <p className="text-xs text-muted-foreground">Official Response Document</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm font-semibold text-foreground">{new Date(response.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* IDs */}
                  <div className="grid grid-cols-3 gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Response ID</p>
                      <p className="text-sm font-mono font-bold text-primary mt-0.5">{response.id}</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Complaint</p>
                      <p className="text-sm font-mono font-semibold text-foreground mt-0.5">{response.complaintId}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                      <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[response.response_status]}`}>
                        {response.response_status}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Complaint Context */}
                  {complaint && (
                    <>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Related Complaint</p>
                        <div className="bg-muted/20 rounded-lg p-3 border border-border/50">
                          <p className="text-sm font-semibold text-foreground">{complaint.complaint_title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{complaint.taxpayer_name} · TIN: {complaint.tin}</p>
                        </div>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Recipient & Sender */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Recipient & Sender</p>
                    <div className="grid grid-cols-2 gap-4">
                      <InfoRow icon={User} label="Recipient Name" value={response.recipient_name} />
                      <InfoRow icon={Mail} label="Recipient Email" value={response.recipient_email} />
                      <InfoRow icon={User} label="Responded By" value={staffMap[response.respondedBy] ?? response.respondedBy} />
                      <InfoRow icon={Calendar} label="Created Date" value={new Date(response.createdAt).toLocaleDateString()} />
                    </div>
                  </div>

                  <Separator />

                  {/* Approval & Send Info */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Approval & Dispatch</p>
                    <div className="grid grid-cols-2 gap-4">
                      <InfoRow icon={CheckCircle} label="Approved By" value={response.approved_by} />
                      <InfoRow icon={Calendar} label="Approved Date" value={response.approved_date} />
                      <InfoRow icon={Send} label="Sent Date" value={response.sent_date} />
                      <InfoRow icon={Hash} label="Sent to User" value={response.sentToUser ? 'Yes' : 'No'} />
                    </div>
                  </div>

                  <Separator />

                  {/* Subject & Content */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Subject</p>
                    <p className="text-sm font-medium text-foreground mb-4">{response.subject || '—'}</p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Response Content</p>
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{response.content}</p>
                    </div>
                  </div>

                  {response.notes && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Internal Notes</p>
                        <div className="bg-muted/40 rounded-lg p-3 border border-border">
                  <p className="text-sm text-foreground">{response.notes}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="px-5 py-3 border-t bg-muted/20">
                  <p className="text-xs text-center text-muted-foreground">Document generated by MOR Complaints Portal · {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {/* ── EDIT FORM ── */}
            {mode === 'edit' && form && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <Label>Subject</Label>
                    <Input value={form.subject || ''} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Response subject line" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Recipient Name</Label>
                    <Input value={form.recipient_name || ''} onChange={e => setForm({ ...form, recipient_name: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Recipient Email</Label>
                    <Input type="email" value={form.recipient_email || ''} onChange={e => setForm({ ...form, recipient_email: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Status</Label>
                    <Select value={form.response_status} onValueChange={v => setForm({ ...form, response_status: v as Response['response_status'] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Sent">Sent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Approved By</Label>
                    <Select value={form.approved_by || ''} onValueChange={v => setForm({ ...form, approved_by: v })}>
                      <SelectTrigger><SelectValue placeholder="Select approver" /></SelectTrigger>
                      <SelectContent>
                        {mockStaffUsers.filter(u => u.role === 'team_leader' || u.role === 'director').map(u =>
                          <SelectItem key={u.id} value={u.name}>{u.name}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Approved Date</Label>
                    <Input type="date" value={form.approved_date || ''} onChange={e => setForm({ ...form, approved_date: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Sent Date</Label>
                    <Input type="date" value={form.sent_date || ''} onChange={e => setForm({ ...form, sent_date: e.target.value })} />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label>Response Content</Label>
                    <Textarea rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label>Internal Notes</Label>
                    <Textarea rows={2} value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Internal notes (not sent to user)" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="gap-1.5" onClick={saveEdit}><Save className="w-4 h-4" /> Save Changes</Button>
                  <Button variant="ghost" onClick={() => setMode('detail')}><X className="w-4 h-4" /> Cancel</Button>
                </div>
              </div>
            )}

            {/* ── SEND FORM ── */}
            {mode === 'send' && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <Send className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-sm text-foreground">Confirm the recipient details below before dispatching this response.</p>
                </div>

                {/* Preview the letter */}
                <div className="border border-border rounded-lg p-4 bg-muted/20 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Response Preview</p>
                  <p className="text-sm font-medium text-foreground">{response.subject || `Response for ${response.complaintId}`}</p>
                  <p className="text-xs text-muted-foreground line-clamp-3">{response.content}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Recipient Name <span className="text-destructive">*</span></Label>
                    <Input
                      value={sendForm.recipient_name}
                      onChange={e => setSendForm({ ...sendForm, recipient_name: e.target.value })}
                      placeholder="Full name of recipient"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Recipient Email <span className="text-destructive">*</span></Label>
                    <Input
                      type="email"
                      value={sendForm.recipient_email}
                      onChange={e => setSendForm({ ...sendForm, recipient_email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label>Subject</Label>
                    <Input
                      value={sendForm.subject}
                      onChange={e => setSendForm({ ...sendForm, subject: e.target.value })}
                      placeholder="Email subject line"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label>Dispatch Notes</Label>
                    <Textarea
                      rows={2}
                      value={sendForm.notes}
                      onChange={e => setSendForm({ ...sendForm, notes: e.target.value })}
                      placeholder="Any notes for the dispatch record..."
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="gap-1.5 gradient-primary text-primary-foreground" onClick={confirmSend}>
                    <Send className="w-4 h-4" /> Confirm & Send
                  </Button>
                  <Button variant="ghost" onClick={() => setMode('detail')}><X className="w-4 h-4" /> Cancel</Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Response</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{response.id}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { onDelete(response.id); setDeleteDialog(false); onClose(); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ResponseDetailSheet;
