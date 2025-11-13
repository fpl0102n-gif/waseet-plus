import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 });
    // naive detection
    const source = /temu\.com/i.test(url) ? 'temu' : /aliexpress\.com/i.test(url) ? 'aliexpress' : 'unknown';
    if (source === 'unknown') return NextResponse.json({ error: 'unsupported link' }, { status: 400 });

    // Mocked product data - replace with real parse logic
    const product = {
      title: 'Demo product title',
      image: '/placeholder_product.jpg',
      price_usd: 12.5,
      source,
      product_id: (source==='aliexpress'?'ALI_':'TEMU_') + Math.floor(Math.random()*1000000),
    };

    // Mocked exchange rate and markup - in real app read from DB/settings
    const exchange_rate = Number(process.env.NEXT_PUBLIC_DEFAULT_EXCHANGE_RATE || 150);
    const markup_percent = Number(process.env.NEXT_PUBLIC_DEFAULT_MARKUP_PERCENT || 10);
    const shipping_fee = 200;
    const base_dzd = Math.round(product.price_usd * exchange_rate);
    const final = Math.round(base_dzd * (1 + markup_percent/100) + shipping_fee);

    return NextResponse.json({
      ...product,
      exchange_rate,
      markup_percent,
      shipping_fee_dzd: shipping_fee,
      final_price_dzd: final
    });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || 'internal' }, { status: 500 });
  }
}
