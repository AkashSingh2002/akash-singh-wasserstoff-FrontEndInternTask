'use client';

import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const COMPONENT_DOCS = [
  {
    name: 'Button',
    props: [
      { name: 'label', type: 'string', description: 'Text displayed on the button' },
      { name: 'variant', type: "'primary' | 'secondary' | 'outline'", description: 'Button style variant' },
      { name: 'size', type: "'small' | 'medium' | 'large'", description: 'Button size' },
      { name: 'fullWidth', type: 'boolean', description: 'Makes button full width' }
    ],
    example: `<Button 
  label="Click me" 
  variant="primary" 
  size="medium" 
/>`
  },
  {
    name: 'Input',
    props: [
      { name: 'label', type: 'string', description: 'Input label' },
      { name: 'name', type: 'string', description: 'Input name attribute' },
      { name: 'value', type: 'string', description: 'Input value' },
      { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', description: 'Change handler' },
      { name: 'error', type: 'string', description: 'Optional error message' }
    ],
    example: `<Input
  label="Username"
  name="username"
  value={username}
  onChange={handleChange}
  error={usernameError}
/>`
  },
  {
    name: 'Card',
    props: [
      { name: 'title', type: 'string', description: 'Card title' },
      { name: 'description', type: 'string', description: 'Optional card description' },
      { name: 'variant', type: "'default' | 'elevated' | 'outlined'", description: 'Card style variant' },
      { name: 'children', type: 'React.ReactNode', description: 'Card content' }
    ],
    example: `<Card 
  title="Component Details" 
  variant="elevated"
>
  <p>Card content here</p>
</Card>`
  }
];

export default function DocsPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Component Library Documentation
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {COMPONENT_DOCS.map((component) => (
          <Button
            key={component.name}
            label={component.name}
            variant={activeComponent === component.name ? 'primary' : 'secondary'}
            onClick={() => setActiveComponent(
              activeComponent === component.name ? null : component.name
            )}
          />
        ))}
      </div>

      {COMPONENT_DOCS.map((component) => (
        activeComponent === component.name && (
          <Card 
            key={component.name}
            title={`${component.name} Component`}
            description={`Detailed documentation for the ${component.name} component`}
            variant="elevated"
            className="mb-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Props</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-left">Type</th>
                      <th className="border p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.props.map((prop) => (
                      <tr key={prop.name} className="hover:bg-gray-50">
                        <td className="border p-2">{prop.name}</td>
                        <td className="border p-2">
                          <code className="bg-gray-100 rounded p-1 text-sm">
                            {prop.type}
                          </code>
                        </td>
                        <td className="border p-2">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Example Usage</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">{component.example}</code>
                </pre>
              </div>
            </div>
          </Card>
        )
      ))}

      <div className="text-center mt-12">
        <Card 
          title="Need More Help?" 
          description="Check out our comprehensive README or contact support"
          variant="outlined"
        >
          <div className="flex justify-center space-x-4">
            <Button 
              label="View README" 
              variant="secondary"
              onClick={() => window.open('/README.md', '_blank')}
            />
            <Button 
              label="Contact Support" 
              variant="primary"
              onClick={() => window.location.href = 'mailto:support@componentlibrary.com'}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}