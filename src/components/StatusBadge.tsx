import { ComplaintStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusStyles: Record<ComplaintStatus, string> = {
  'New': 'bg-status-new/15 text-status-new border-status-new/30',
  'Categorized': 'bg-status-categorized/15 text-status-categorized border-status-categorized/30',
  'Assigned': 'bg-status-assigned/15 text-status-assigned border-status-assigned/30',
  'In Progress': 'bg-status-in-progress/15 text-status-in-progress border-status-in-progress/30',
  'Sent to Directorate': 'bg-status-sent-directorate/15 text-status-sent-directorate border-status-sent-directorate/30',
  'Assessment Completed': 'bg-status-assessment-completed/15 text-status-assessment-completed border-status-assessment-completed/30',
  'Responded': 'bg-status-responded/15 text-status-responded border-status-responded/30',
  'Closed': 'bg-status-closed/15 text-status-closed border-status-closed/30',
  'Rejected': 'bg-status-rejected/15 text-status-rejected border-status-rejected/30',
};

export const StatusBadge = ({ status }: { status: ComplaintStatus }) => (
  <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', statusStyles[status])}>
    {status}
  </span>
);
