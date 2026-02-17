import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success(t('login.welcome'));
      navigate('/dashboard');
    } else {
      toast.error(t('login.invalid'));
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-end mb-2">
            <LanguageSwitcher variant="ghost" />
          </div>
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl text-foreground">{t('login.title')}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{t('login.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t('login.enterEmail')} />
            </div>
            <div>
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder={t('login.enterPassword')} />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground">
              <LogIn className="w-4 h-4 mr-2" /> {t('login.signIn')}
            </Button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <p className="font-medium mb-1.5">{t('login.demoAccounts')}:</p>
            <div className="space-y-0.5">
              <p>admin@portal.gov — Admin</p>
              <p>director@portal.gov — Director</p>
              <p>teamlead@portal.gov — Team Leader</p>
              <p>ahmed@portal.gov — Officer</p>
              <p>domestic@portal.gov — Directorate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffLogin;
