export async function POST(request) {
  const { code } = await request.json();

  const correctCode = '1234';

  if (code === correctCode) {
    return new Response(
      JSON.stringify({ message: 'Code verified successfully!' }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ message: 'Incorrect code. Please try again.' }),
      { status: 400 }
    );
  }
}
