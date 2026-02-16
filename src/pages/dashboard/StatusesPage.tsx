import { STATUSES } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { ComplaintStatus } from '@/lib/types';

const StatusesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Settings className="w-6 h-6 text-secondary" /> Complaint Statuses
      </h1>
      <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Add Status</Button>
    </div>
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="space-y-2">
          {STATUSES.map((status, i) => (
            <div key={status} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                <span className="text-sm font-medium text-muted-foreground w-6">{i + 1}.</span>
                <StatusBadge status={status as ComplaintStatus} />
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                <Button variant="ghost" size="sm" className="text-xs text-destructive">Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default StatusesPage;
