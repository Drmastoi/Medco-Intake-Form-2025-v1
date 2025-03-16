
import SamplePDFGenerator from '@/components/SamplePDFGenerator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Medical Legal Report System</h1>
        <SamplePDFGenerator />
      </div>
    </main>
  );
}
