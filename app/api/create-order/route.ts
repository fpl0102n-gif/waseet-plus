import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id, user, qty, final_price_dzd } = body;
    if (!product_id || !user) return NextResponse.json({ error: 'invalid' }, { status: 400 });
    const orderId = 'ORD_' + Date.now();
    const order = await prisma.order.create({
      data: {
        orderId, productId: product_id, title: body.title || '', image: body.image || '', qty: Number(qty||1),
        totalDzd: Number(final_price_dzd||0),
        customerName: user.name, phone: user.phone, address: user.address
      }
    });
    return NextResponse.json({ order_id: orderId, status: 'pending_payment' });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || 'internal' }, { status: 500 });
  }
}
