import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ComplaintProgressBar } from '@/components/ComplaintProgressBar';
import { mockComplaints } from '@/lib/mockData';
import { Shield, FileText, Search, Phone, Mail, MapPin, MessageCircle, Send, ArrowRight, CheckCircle, Upload, X, Paperclip } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'submit' | 'track' | null>(null);
  const [tinSearch, setTinSearch] = useState('');
  const [tinVerified, setTinVerified] = useState(false);
  const [trackCode, setTrackCode] = useState('');
  const [trackedComplaint, setTrackedComplaint] = useState<typeof mockComplaints[0] | null>(null);
  const [trackError, setTrackError] = useState('');

  // Submit form state
  const [form, setForm] = useState({ tin: '', fullName: '', contact: '', details: '' });
  const [submitFiles, setSubmitFiles] = useState<File[]>([]);

  // Additional document upload for tracked complaint
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const additionalFileRef = useRef<HTMLInputElement>(null);
  const submitFileRef = useRef<HTMLInputElement>(null);

  const handleTinVerify = () => {
    if (tinSearch.length >= 5) {
      setTinVerified(true);
      setForm(prev => ({ ...prev, tin: tinSearch }));
    } else {
      toast.error('Please enter a valid TIN (at least 5 digits)');
    }
  };

  const validateAndAddFiles = (
    newFiles: FileList | null,
    existingFiles: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    if (!newFiles) return;
    const valid: File[] = [];
    for (const file of Array.from(newFiles)) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 5MB limit`);
        continue;
      }
      if (existingFiles.length + valid.length >= MAX_FILES) {
        toast.error(`Maximum ${MAX_FILES} files allowed`);
        break;
      }
      valid.push(file);
    }
    if (valid.length > 0) setFiles(prev => [...prev, ...valid]);
  };

  const removeFile = (
    index: number,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const FileList = ({ files, onRemove }: { files: File[]; onRemove: (i: number) => void }) => (
    files.length > 0 ? (
      <div className="space-y-2 mt-2">
        {files.map((file, i) => (
          <div key={i} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="truncate text-foreground">{file.name}</span>
              <span className="text-muted-foreground text-xs shrink-0">({formatFileSize(file.size)})</span>
            </div>
            <button onClick={() => onRemove(i)} className="text-muted-foreground hover:text-destructive shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">{files.length}/{MAX_FILES} files attached</p>
      </div>
    ) : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CMP-2026-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`;
    toast.success(`Complaint submitted! Your tracking ID: ${id}`);
    setActiveTab(null);
    setTinVerified(false);
    setTinSearch('');
    setForm({ tin: '', fullName: '', contact: '', details: '' });
    setSubmitFiles([]);
  };

  const handleTrack = () => {
    setTrackError('');
    setAdditionalFiles([]);
    const code = trackCode.trim();
    if (!code) {
      setTrackError('Please enter a complaint code');
      setTrackedComplaint(null);
      return;
    }
    const found = mockComplaints.find(c => c.id.toLowerCase() === code.toLowerCase());
    if (found) {
      setTrackedComplaint(found);
    } else {
      setTrackError('No complaint found with that code. Please check and try again.');
      setTrackedComplaint(null);
    }
  };

  const handleUploadAdditional = () => {
    if (additionalFiles.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }
    toast.success(`${additionalFiles.length} document(s) uploaded successfully`);
    setAdditionalFiles([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">MOR Complaints Portal</h1>
              <p className="text-[11px] text-muted-foreground">Ministry of Revenues</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground mr-4">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +251-111-000000</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> support@portal.gov</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/suggestions')} className="text-muted-foreground text-xs">
              <MessageCircle className="w-4 h-4 mr-1" /> Suggestions
            </Button>
            <Button size="sm" onClick={() => navigate('/login')} className="gradient-primary text-primary-foreground text-xs">
              Staff Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
            Ethiopia Ministry of Revenues<br />Complaints Portal
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Submit and track your complaints with ease. We are committed to resolving your concerns promptly and transparently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => { setActiveTab('submit'); setTrackedComplaint(null); }}
              className="gradient-accent text-accent-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5 mr-2" /> Submit a Complaint
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { setActiveTab('track'); setTinVerified(false); setTinSearch(''); setTrackedComplaint(null); setTrackError(''); setAdditionalFiles([]); }}
              className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base px-8 py-6 rounded-xl"
            >
              <Search className="w-5 h-5 mr-2" /> Track Complaint
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 pb-16">
        {activeTab === 'submit' && (
          <Card className="max-w-2xl mx-auto glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="w-5 h-5 text-secondary" /> Submit a Complaint
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!tinVerified ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">First, verify your TIN (Tax Identification Number) to proceed.</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your TIN..."
                      value={tinSearch}
                      onChange={(e) => setTinSearch(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleTinVerify} className="gradient-primary text-primary-foreground">
                      Verify <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-foreground">TIN Verified: <strong>{form.tin}</strong></span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" required value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" required value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="details">Complaint Details</Label>
                    <Textarea id="details" required rows={4} value={form.details} onChange={e => setForm(p => ({ ...p, details: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Attachments (optional, max 5 files, 5MB each)</Label>
                    <div
                      onClick={() => submitFileRef.current?.click()}
                      className="mt-1 border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                      <p className="text-sm text-muted-foreground">Click to select files</p>
                      <p className="text-xs text-muted-foreground">PDF, Images, Documents — up to 5MB each</p>
                    </div>
                    <input
                      ref={submitFileRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        validateAndAddFiles(e.target.files, submitFiles, setSubmitFiles);
                        e.target.value = '';
                      }}
                    />
                    <FileList files={submitFiles} onRemove={(i) => removeFile(i, setSubmitFiles)} />
                  </div>
                  <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                    Submit Complaint
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'track' && (
          <Card className="max-w-2xl mx-auto glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Search className="w-5 h-5 text-secondary" /> Track Your Complaint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Enter your Complaint Code to view your complaint status.</p>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. CMP-2026-001"
                  value={trackCode}
                  onChange={(e) => setTrackCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                />
                <Button onClick={handleTrack} className="gradient-primary text-primary-foreground">
                  Search <Search className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {trackError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                  {trackError}
                </div>
              )}

              {trackedComplaint && (
                <div className="space-y-5 pt-4 animate-fade-in">
                  {/* Complaint info */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground text-base">{trackedComplaint.id}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium gradient-primary text-primary-foreground">
                        {trackedComplaint.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">Complainant:</span> <strong className="text-foreground">{trackedComplaint.fullName}</strong></div>
                      <div><span className="text-muted-foreground">Category:</span> <strong className="text-foreground">{trackedComplaint.category || 'Pending'}</strong></div>
                      <div><span className="text-muted-foreground">Submitted:</span> <strong className="text-foreground">{new Date(trackedComplaint.createdAt).toLocaleDateString()}</strong></div>
                      <div><span className="text-muted-foreground">Last Updated:</span> <strong className="text-foreground">{new Date(trackedComplaint.updatedAt).toLocaleDateString()}</strong></div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Complaint Progress</p>
                    <ComplaintProgressBar currentStatus={trackedComplaint.status} />
                  </div>

                  {/* Details */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border text-sm">
                    <p className="text-muted-foreground mb-1 font-medium">Complaint Details:</p>
                    <p className="text-foreground">{trackedComplaint.details}</p>
                  </div>

                  {/* Upload additional documents */}
                  <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" /> Upload Additional Documents
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Upload supporting documents for this complaint (max {MAX_FILES} files, 5MB each).
                    </p>
                    <div
                      onClick={() => additionalFileRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                      <p className="text-sm text-muted-foreground">Click to select files</p>
                      <p className="text-xs text-muted-foreground">PDF, Images, Documents — up to 5MB each</p>
                    </div>
                    <input
                      ref={additionalFileRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        validateAndAddFiles(e.target.files, additionalFiles, setAdditionalFiles);
                        e.target.value = '';
                      }}
                    />
                    <FileList files={additionalFiles} onRemove={(i) => removeFile(i, setAdditionalFiles)} />
                    {additionalFiles.length > 0 && (
                      <Button onClick={handleUploadAdditional} className="w-full gradient-primary text-primary-foreground">
                        <Upload className="w-4 h-4 mr-2" /> Upload {additionalFiles.length} Document{additionalFiles.length > 1 ? 's' : ''}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!activeTab && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            {[
              { icon: Send, title: 'Easy Submission', desc: 'Submit your complaint online in minutes with our simple form.' },
              { icon: Search, title: 'Real-time Tracking', desc: 'Track your complaint status with our visual progress tracker.' },
              { icon: CheckCircle, title: 'Transparent Process', desc: 'Every step is documented and visible for full accountability.' },
            ].map((feature, i) => (
              <Card key={i} className="glass-card text-center p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>© 2026 MOR Complaints Portal. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Addis Ababa, Ethiopia</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +251-111-000000</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
