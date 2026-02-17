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
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 5;

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'submit' | 'track' | null>(null);
  const [tinSearch, setTinSearch] = useState('');
  const [tinVerified, setTinVerified] = useState(false);
  const [trackCode, setTrackCode] = useState('');
  const [trackedComplaint, setTrackedComplaint] = useState<typeof mockComplaints[0] | null>(null);
  const [trackError, setTrackError] = useState('');
  const [form, setForm] = useState({ tin: '', fullName: '', contact: '', details: '' });
  const [submitFiles, setSubmitFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const additionalFileRef = useRef<HTMLInputElement>(null);
  const submitFileRef = useRef<HTMLInputElement>(null);

  const handleTinVerify = () => {
    if (tinSearch.length >= 5) {
      setTinVerified(true);
      setForm(prev => ({ ...prev, tin: tinSearch }));
    } else {
      toast.error(t('common.invalidTin'));
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
        toast.error(`"${file.name}" ${t('common.exceeds5MB')}`);
        continue;
      }
      if (existingFiles.length + valid.length >= MAX_FILES) {
        toast.error(t('common.maxFiles'));
        break;
      }
      valid.push(file);
    }
    if (valid.length > 0) setFiles(prev => [...prev, ...valid]);
  };

  const removeFile = (index: number, setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const FileListDisplay = ({ files, onRemove }: { files: File[]; onRemove: (i: number) => void }) => (
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
        <p className="text-xs text-muted-foreground">{files.length}/{MAX_FILES} {t('common.filesAttached')}</p>
      </div>
    ) : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CMP-2026-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`;
    toast.success(`${t('submit.success')}: ${id}`);
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
      setTrackError(t('track.enterCode'));
      setTrackedComplaint(null);
      return;
    }
    const found = mockComplaints.find(c => c.id.toLowerCase() === code.toLowerCase());
    if (found) {
      setTrackedComplaint(found);
    } else {
      setTrackError(t('track.notFound'));
      setTrackedComplaint(null);
    }
  };

  const handleUploadAdditional = () => {
    if (additionalFiles.length === 0) {
      toast.error(t('common.selectFile'));
      return;
    }
    toast.success(`${additionalFiles.length} ${t('track.uploadSuccess')}`);
    setAdditionalFiles([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">{t('header.title')}</h1>
              <p className="text-[11px] text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground mr-4">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +251-111-000000</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> support@portal.gov</span>
            </div>
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={() => navigate('/suggestions')} className="text-muted-foreground text-xs">
              <MessageCircle className="w-4 h-4 mr-1" /> {t('header.suggestions')}
            </Button>
            <Button size="sm" onClick={() => navigate('/login')} className="gradient-primary text-primary-foreground text-xs">
              {t('header.staffLogin')}
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight whitespace-pre-line">
            {t('hero.title')}
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => { setActiveTab('submit'); setTrackedComplaint(null); }}
              className="gradient-accent text-accent-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5 mr-2" /> {t('hero.submit')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { setActiveTab('track'); setTinVerified(false); setTinSearch(''); setTrackedComplaint(null); setTrackError(''); setAdditionalFiles([]); }}
              className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base px-8 py-6 rounded-xl"
            >
              <Search className="w-5 h-5 mr-2" /> {t('hero.track')}
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-8 relative z-10 pb-16">
        {activeTab === 'submit' && (
          <Card className="max-w-2xl mx-auto glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="w-5 h-5 text-secondary" /> {t('submit.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!tinVerified ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{t('submit.tinPrompt')}</p>
                  <div className="flex gap-2">
                    <Input placeholder={t('submit.enterTin')} value={tinSearch} onChange={(e) => setTinSearch(e.target.value)} className="flex-1" />
                    <Button onClick={handleTinVerify} className="gradient-primary text-primary-foreground">
                      {t('submit.verify')} <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-foreground">{t('submit.tinVerified')}: <strong>{form.tin}</strong></span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">{t('submit.fullName')}</Label>
                      <Input id="fullName" required value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} />
                    </div>
                    <div>
                      <Label htmlFor="contact">{t('submit.contact')}</Label>
                      <Input id="contact" required value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="details">{t('submit.details')}</Label>
                    <Textarea id="details" required rows={4} value={form.details} onChange={e => setForm(p => ({ ...p, details: e.target.value }))} />
                  </div>
                  <div>
                    <Label>{t('submit.attachments')}</Label>
                    <div onClick={() => submitFileRef.current?.click()} className="mt-1 border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                      <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                      <p className="text-sm text-muted-foreground">{t('submit.clickToSelect')}</p>
                      <p className="text-xs text-muted-foreground">{t('submit.fileTypes')}</p>
                    </div>
                    <input ref={submitFileRef} type="file" multiple className="hidden" onChange={(e) => { validateAndAddFiles(e.target.files, submitFiles, setSubmitFiles); e.target.value = ''; }} />
                    <FileListDisplay files={submitFiles} onRemove={(i) => removeFile(i, setSubmitFiles)} />
                  </div>
                  <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                    {t('submit.button')}
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
                <Search className="w-5 h-5 text-secondary" /> {t('track.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t('track.prompt')}</p>
              <div className="flex gap-2">
                <Input placeholder={t('track.placeholder')} value={trackCode} onChange={(e) => setTrackCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTrack()} />
                <Button onClick={handleTrack} className="gradient-primary text-primary-foreground">
                  {t('track.search')} <Search className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {trackError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">{trackError}</div>
              )}

              {trackedComplaint && (
                <div className="space-y-5 pt-4 animate-fade-in">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground text-base">{trackedComplaint.id}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium gradient-primary text-primary-foreground">{trackedComplaint.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">{t('track.complainant')}:</span> <strong className="text-foreground">{trackedComplaint.fullName}</strong></div>
                      <div><span className="text-muted-foreground">{t('track.category')}:</span> <strong className="text-foreground">{trackedComplaint.category || t('track.pending')}</strong></div>
                      <div><span className="text-muted-foreground">{t('track.submitted')}:</span> <strong className="text-foreground">{new Date(trackedComplaint.createdAt).toLocaleDateString()}</strong></div>
                      <div><span className="text-muted-foreground">{t('track.lastUpdated')}:</span> <strong className="text-foreground">{new Date(trackedComplaint.updatedAt).toLocaleDateString()}</strong></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">{t('track.progress')}</p>
                    <ComplaintProgressBar currentStatus={trackedComplaint.status} />
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border text-sm">
                    <p className="text-muted-foreground mb-1 font-medium">{t('track.details')}:</p>
                    <p className="text-foreground">{trackedComplaint.details}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Upload className="w-4 h-4 text-primary" /> {t('track.uploadTitle')}
                    </h4>
                    <p className="text-xs text-muted-foreground">{t('track.uploadDesc')}</p>
                    <div onClick={() => additionalFileRef.current?.click()} className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                      <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                      <p className="text-sm text-muted-foreground">{t('submit.clickToSelect')}</p>
                      <p className="text-xs text-muted-foreground">{t('submit.fileTypes')}</p>
                    </div>
                    <input ref={additionalFileRef} type="file" multiple className="hidden" onChange={(e) => { validateAndAddFiles(e.target.files, additionalFiles, setAdditionalFiles); e.target.value = ''; }} />
                    <FileListDisplay files={additionalFiles} onRemove={(i) => removeFile(i, setAdditionalFiles)} />
                    {additionalFiles.length > 0 && (
                      <Button onClick={handleUploadAdditional} className="w-full gradient-primary text-primary-foreground">
                        <Upload className="w-4 h-4 mr-2" /> {t('track.uploadButton')} {additionalFiles.length}
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
              { icon: Send, title: t('feature.easySubmission'), desc: t('feature.easySubmissionDesc') },
              { icon: Search, title: t('feature.realTimeTracking'), desc: t('feature.realTimeTrackingDesc') },
              { icon: CheckCircle, title: t('feature.transparentProcess'), desc: t('feature.transparentProcessDesc') },
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

      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>{t('footer.rights')}</span>
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
