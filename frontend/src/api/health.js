import { cors } from '../lib/helpers.js';

export default function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  return res.json({
    status:  'ok',
    version: '2.0.0',
    env:     process.env.NODE_ENV || 'production',
    time:    new Date().toISOString(),
  });
}
