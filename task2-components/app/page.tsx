'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';

const DEMOS = [
  {
    title: 'Registration Form',
    description: 'A comprehensive form with validation',
    path: '/pages/demo1',
    icon: '📝'
  },
  {
    title: 'Todo List',
    description: 'Interactive task management',
    path: '/pages/demo2',
    icon: '✅'
  }
];

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Component Library SDK
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern, reusable React component library built with TypeScript 
          and Tailwind CSS. Explore our demo pages to see the components in action.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {DEMOS.map((demo) => (
          <Card 
            key={demo.path}
            title={demo.title}
            description={demo.description}
            variant={activeDemo === demo.path ? 'elevated' : 'default'}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">{demo.icon}</span>
              <Link href={demo.path}>
                <Button 
                  label="View Demo" 
                  variant="primary"
                  size="small"
                  onClick={() => setActiveDemo(demo.path)}
                />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card 
          title="Component Documentation" 
          description="Explore our comprehensive component usage guide"
          variant="outlined"
        >
          <div className="flex justify-center">
            <Link href="/docs">
              <Button 
                label="View Docs" 
                variant="secondary"
              />
            </Link>
          </div>
        </Card>
      </div>

      <footer className="mt-16 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Component Library SDK. 
          Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}