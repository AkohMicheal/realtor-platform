import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-sanity-secret');

    if (secret && process.env.SANITY_REVALIDATE_SECRET && secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return Response.json({ error: 'Unauthorized secret token' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { _type, slug } = body;

    switch (_type) {
      case 'property':
        revalidatePath('/properties');
        revalidatePath('/');
        if (slug?.current) {
          revalidatePath(`/properties/${slug.current}`);
        }
        break;
      case 'testimonial':
        revalidatePath('/');
        break;
      default:
        revalidatePath('/');
        revalidatePath('/properties');
        break;
    }

    return Response.json({
      revalidated: true,
      type: _type || 'all',
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error('[Revalidation Error]', err);
    return Response.json({ error: 'Revalidation operation failed' }, { status: 500 });
  }
}
