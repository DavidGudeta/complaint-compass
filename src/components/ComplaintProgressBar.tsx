import { ComplaintStatus } from '@/lib/types';
import { STATUS_FLOW } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Props {
  currentStatus: ComplaintStatus;
}

export const ComplaintProgressBar = ({ currentStatus }: Props) => {
  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const isRejected = currentStatus === 'Rejected';

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
        <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground text-xs font-bold">✕</div>
        <span className="text-sm font-medium text-destructive">Complaint Rejected / Invalid</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {STATUS_FLOW.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <div key={status} className="flex flex-col items-center flex-1">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2',
                isCompleted
                  ? 'gradient-primary text-primary-foreground border-transparent'
                  : 'bg-muted text-muted-foreground border-border',
                isCurrent && 'ring-4 ring-primary/20 scale-110'
              )}>
                {isCompleted && index < currentIndex ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={cn(
                'text-[10px] mt-1 text-center leading-tight max-w-[70px]',
                isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative h-1.5 bg-muted rounded-full mx-4 mt-1">
        <div
          className="absolute left-0 top-0 h-full gradient-primary rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / (STATUS_FLOW.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};
