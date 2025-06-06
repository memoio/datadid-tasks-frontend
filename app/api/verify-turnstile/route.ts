import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();
  
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const secret = process.env.TURNSTILE_SECRET_KEY!;

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token
      })
    });

    const data = await response.json();
    
    if (data.success) {
      // 验证通过，继续业务流程
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}