import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const entries = await prisma.setting.findMany();
  const map: any = {};
  entries.forEach(e => map[e.key] = Number(e.value));
  return NextResponse.json({
    exchange: map.exchange_rate || Number(process.env.NEXT_PUBLIC_DEFAULT_EXCHANGE_RATE || 150),
    markup: map.markup_percent || Number(process.env.NEXT_PUBLIC_DEFAULT_MARKUP_PERCENT || 10),
    shipping: map.shipping_fee_dzd || 200
  });
}
