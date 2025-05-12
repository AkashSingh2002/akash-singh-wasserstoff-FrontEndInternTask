'use client';

import React, { useState, FormEvent } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Demo1() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Basic validation
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'username':
        setErrors(prev => ({
          ...prev,
          username: value.length < 3 ? 'Username must be at least 3 characters' : ''
        }));
        break;
      case 'email':
        setErrors(prev => ({
          ...prev,
          email: !value.includes('@') ? 'Invalid email address' : ''
        }));
        break;
      case 'password':
        setErrors(prev => ({
          ...prev,
          password: value.length < 6 ? 'Password must be at least 6 characters' : ''
        }));
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      username: formData.username.length < 3 ? 'Username must be at least 3 characters' : '',
      email: !formData.email.includes('@') ? 'Invalid email address' : '',
      password: formData.password.length < 6 ? 'Password must be at least 6 characters' : ''
    };

    setErrors(newErrors);

    // Check if there are no errors
    if (!Object.values(newErrors).some(error => error)) {
      alert('Form submitted successfully!');
      // Here you would typically send the data to a backend
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card 
        title="Registration Form" 
        description="Create your account"
        variant="elevated"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Choose a username"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a password"
          />
          <Button 
            label="Register" 
            type="submit" 
            fullWidth 
            variant="primary"
            size="large"
          />
        </form>
      </Card>
    </div>
  );
}