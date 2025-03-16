
import React from 'react';
import { SamplePDFGenerator } from '@/components/SamplePDFGenerator';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Medical Legal Report System</h1>
      <SamplePDFGenerator />
    </div>
  );
}
