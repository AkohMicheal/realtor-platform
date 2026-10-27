import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
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

    const leadData = result.data;
    const timestamp = new Date().toISOString();

    // 1. Store in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let supabaseSaved = false;
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from('leads').insert({
          ...leadData,
          created_at: timestamp,
        });

        if (error) {
          console.error('[Supabase Insert Error]', error);
        } else {
          supabaseSaved = true;
        }
      } catch (err) {
        console.error('[Supabase Client Error]', err);
      }
    } else {
      console.log('ℹ️ [Supabase Not Configured - Lead Logged Locally]', leadData);
    }

    // 2. Send instant Email Notification via Resend
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const recipientEmail =
          process.env.LEAD_NOTIFICATION_EMAIL ||
          process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
          'maryakoh2017@gmail.com';

        const senderEmail =
          process.env.RESEND_FROM_EMAIL || 'MariRealty Alerts <onboarding@resend.dev>';

        const cleanPhone = leadData.phone.replace(/[^0-9]/g, '');
        const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
          `Hello ${leadData.name}, this is Mary Akoh from MariRealty. I received your inquiry regarding Lagos & Nigerian real estate / RECB cashback investments.`
        )}`;

        const budgetDisplay =
          leadData.metadata?.budget || leadData.budget || 'Not specified';
        const interestDisplay =
          leadData.metadata?.interest || 'General Real Estate Consultation';
        const messageDisplay =
          leadData.metadata?.message || 'No additional notes provided.';

        const emailResult = await resend.emails.send({
          from: senderEmail,
          to: [recipientEmail],
          replyTo: leadData.email && leadData.email.length > 3 ? leadData.email : undefined,
          subject: `🚨 New Lead: ${leadData.name} (${leadData.tag})`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Client Lead Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #0F172A;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background-color: #0B192C; padding: 28px 24px; text-align: center; border-bottom: 3px solid #D4AF37;">
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
        <span style="color: #D4AF37;">Mari</span>Realty
      </h1>
      <p style="color: #94A3B8; font-size: 13px; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">
        New Client Inquiry Notification
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 28px 24px;">
      <div style="background-color: #10B98115; border: 1px solid #10B98140; border-radius: 10px; padding: 12px 16px; margin-bottom: 24px;">
        <span style="color: #10B981; font-weight: 700; font-size: 13px;">● High-Priority Lead (${leadData.tag})</span>
        <p style="color: #475569; font-size: 12px; margin: 4px 0 0 0;">Received on ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })} WAT</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; width: 140px;">Client Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-weight: 700; color: #0B192C;">${leadData.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B;">Phone Number</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-weight: 700; color: #0B192C;">
            <a href="tel:${leadData.phone}" style="color: #0B192C; text-decoration: none;">${leadData.phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B;">Email Address</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-weight: 600; color: #0F172A;">
            ${leadData.email ? `<a href="mailto:${leadData.email}" style="color: #D4AF37; text-decoration: none;">${leadData.email}</a>` : 'Not provided'}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B;">Intended Budget</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-weight: 700; color: #10B981;">${budgetDisplay}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B;">Primary Interest</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-weight: 600; color: #0B192C;">${interestDisplay}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B;">Submission Source</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #475569; text-transform: capitalize;">${leadData.source} form</td>
        </tr>
      </table>

      <!-- Message block -->
      <div style="margin-top: 20px; background-color: #F8F9FA; border-radius: 12px; border: 1px solid #E2E8F0; padding: 16px;">
        <span style="font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px;">Client Message / Requirements</span>
        <p style="margin: 8px 0 0 0; font-size: 13px; line-height: 1.6; color: #334155;">
          ${messageDisplay}
        </p>
      </div>

      <!-- Action Buttons -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="${whatsappLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: 700; font-size: 14px; border-radius: 12px; margin-right: 8px; box-shadow: 0 4px 10px rgba(37,211,102,0.3);">
          Chat Client on WhatsApp &rarr;
        </a>
        <a href="tel:${leadData.phone}" style="display: inline-block; background-color: #0B192C; color: #ffffff; text-decoration: none; padding: 14px 24px; font-weight: 700; font-size: 14px; border-radius: 12px;">
          Call Phone
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #F1F5F9; padding: 16px 24px; text-align: center; font-size: 11px; color: #94A3B8;">
      MariRealty Lead Notification Engine &bull; Stored securely in Supabase &bull; Sent via Resend
    </div>
  </div>
</body>
</html>
          `,
        });

        if (emailResult.error) {
          console.error('[Resend Error]', emailResult.error);
        } else {
          emailSent = true;
          console.log('📧 [Email Sent via Resend]', emailResult.data?.id);
        }
      } catch (emailErr) {
        console.error('[Resend Exception]', emailErr);
      }
    } else {
      console.warn('⚠️ [Resend Skipped] RESEND_API_KEY environment variable is not defined.');
    }

    return Response.json(
      {
        success: true,
        message: 'Lead registered successfully',
        tag: leadData.tag,
        emailSent,
        supabaseSaved,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Lead API Route Error]', error);
    return Response.json({ error: 'Internal server error processing lead' }, { status: 500 });
  }
}
