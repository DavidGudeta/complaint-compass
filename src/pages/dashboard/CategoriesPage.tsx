import { CATEGORIES } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoriesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Settings className="w-6 h-6 text-secondary" /> Categories & Subcategories
      </h1>
      <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Add Category</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CATEGORIES.map(cat => (
        <Card key={cat.name} className="glass-card">
          <CardContent className="p-5">
            <h3 className="font-semibold text-foreground mb-3">{cat.name}</h3>
            <div className="space-y-2">
              {cat.subcategories.map(sub => (
                <div key={sub} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm">
                  <span className="flex items-center gap-2 text-foreground">
                    <ChevronRight className="w-3 h-3 text-muted-foreground" /> {sub}
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-3 text-xs w-full">
              <Plus className="w-3 h-3 mr-1" /> Add Subcategory
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default CategoriesPage;
