import { useLanguage } from '@/contexts/LanguageContext';
import { Language, languageNames } from '@/lib/translations';
import { Globe } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const LanguageSwitcher = ({ variant = 'default' }: { variant?: 'default' | 'ghost' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant === 'ghost' ? 'ghost' : 'outline'} size="sm" className="gap-1.5 text-xs">
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover z-50">
        {(Object.keys(languageNames) as Language[]).map(lang => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(language === lang && 'bg-accent font-medium')}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
