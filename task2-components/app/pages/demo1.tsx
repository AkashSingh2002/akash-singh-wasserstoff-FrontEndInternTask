'use client';

import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Demo1() {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    alert(`Welcome, ${name}!`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card title="Login" description="Enter your name to proceed">
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <Button label="Submit" onClick={handleSubmit} />
      </Card>
    </div>
  );
}
