// CountdownPage.tsx
import CountdownContent from '@/components/countdown-content';
import { Suspense } from 'react';

export default function CountdownPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CountdownContent />
    </Suspense>
  );
}
