import sampleAPIResponse from '@/sampleData';

export async function GET() {
  return new Response(JSON.stringify(sampleAPIResponse), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
