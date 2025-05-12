'use client';

import Card from '../components/Card';
import Button from '../components/Button';

const items = [
  { id: 1, title: 'Dashboard Item 1', description: 'Details for item 1' },
  { id: 2, title: 'Dashboard Item 2', description: 'Details for item 2' },
];

export default function Demo2() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} title={item.title} description={item.description}>
            <Button label="View" variant="secondary" />
          </Card>
        ))}
      </div>
    </div>
  );
}
