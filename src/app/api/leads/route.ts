import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(8).max(25),
  email: z.string().email().optional().or(z.literal('')),
  budget: z.union([z.number(), z.string()]).optional(),
  source: z.enum(['calculator', 'listing', 'contact', 'download']).default('contact'),
  tag: z.enum(['HOT_INVESTOR', 'WARM_LISTING', 'COLD_NURTURE']).default('HOT_INVESTOR'),
  metadata: z.record(z.string(), z.any()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: 'Invalid lead submission data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from('leads').insert({
        ...result.data,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('[Supabase Insert Error]', error);
        return Response.json({ error: 'Failed to save lead record' }, { status: 500 });
      }
    } else {
      // Development mode fallback
      console.log('✅ [Lead Ingestion Logged]', {
        timestamp: new Date().toISOString(),
        ...result.data,
      });
    }

    return Response.json(
      {
        success: true,
        message: 'Lead registered successfully',
        tag: result.data.tag,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Lead API Route Error]', error);
    return Response.json({ error: 'Internal server error processing lead' }, { status: 500 });
  }
}
