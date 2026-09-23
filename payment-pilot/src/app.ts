import { Hono } from 'hono';
import { pilotHtml } from './pilot-ui';
import { StripePaymentProvider } from './stripe-provider';
import { D1PaymentStore } from './store';
import { PaymentService } from './payment-service';

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  PAYMENTS_DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();
const services = (env: Env) => {
  const provider = new StripePaymentProvider(env.STRIPE_SECRET_KEY, env.STRIPE_WEBHOOK_SECRET);
  return { provider, service: new PaymentService(provider, new D1PaymentStore(env.PAYMENTS_DB)) };
};
const safeError = (error: unknown) => error instanceof Error ? error.message.replace(/sk_(test|live)_[A-Za-z0-9]+/g, '[redacted]') : 'Request failed';
const webhookDiagnostic = (error: unknown) => {
  const message = safeError(error);
  if (/signature|signed payload/i.test(message)) return 'Stripe webhook signature verification failed';
  if (/webhook secret|STRIPE_WEBHOOK_SECRET/i.test(message)) return 'Stripe webhook signing secret is not configured';
  if (/no such table|D1|database|SQL/i.test(message)) return 'Webhook verified, but event persistence failed';
  return 'Webhook processing failed';
};

app.onError((error, c) => c.json({ error: safeError(error) }, 400));
app.get('/dev/payments-pilot', c => {
  if (!c.env.STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test_')) return c.text('Stripe test-mode publishable key is not configured', 503);
  return c.html(pilotHtml(c.env.STRIPE_PUBLISHABLE_KEY));
});
app.post('/api/customers', async c => {
  const { name = 'Demo Property Management Client' } = await c.req.json<{ name?: string }>();
  return c.json(await services(c.env).provider.createCustomer(name, { pilot: '2nspira' }));
});
app.post('/api/setup-intents', async c => {
  const body = await c.req.json<{ customerId: string; type: 'card' | 'ach' }>();
  return c.json(await services(c.env).provider.createSetupIntent(body));
});
app.post('/api/payment-methods/save', async c => {
  const { customerId, paymentMethodId } = await c.req.json<{ customerId: string; paymentMethodId: string }>();
  return c.json(await services(c.env).service.saveVerifiedMethod(customerId, paymentMethodId));
});
app.post('/api/schedules', async c => c.json(await services(c.env).service.createSchedule(await c.req.json())));
app.post('/api/schedules/:id/execute', async c => c.json(await services(c.env).service.executeSchedule(c.req.param('id'))));
app.post('/api/schedules/:id/revoke', async c => c.json({ revoked: await services(c.env).service.revokeSchedule(c.req.param('id')) }));
app.post('/api/notices/run', async c => c.json({ created: await services(c.env).service.createAdvanceNotices() }));
app.get('/api/pilot-state', async c => c.json({ schedules: await new D1PaymentStore(c.env.PAYMENTS_DB).listSchedules() }));
app.post('/api/webhooks/stripe', async c => {
  if (!c.env.STRIPE_WEBHOOK_SECRET) return c.json({ error: 'Stripe webhook signing secret is not configured' }, 500);
  const signature = c.req.header('stripe-signature');
  if (!signature) return c.json({ error: 'Missing Stripe signature' }, 400);
  const payload = await c.req.text();
  const { provider, service } = services(c.env);
  try {
    const event = await provider.verifyWebhook(payload, signature);
    return c.json(await service.applyWebhook(event));
  } catch (error) {
    return c.json({ error: webhookDiagnostic(error) }, 400);
  }
});

export default app;
