import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Page';

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="glass-card max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Construction className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground capitalize mb-2">{pageName}</h2>
          <p className="text-sm text-muted-foreground">This section is coming soon. Stay tuned for updates!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
