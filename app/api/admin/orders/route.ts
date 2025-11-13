import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(orders);
}
