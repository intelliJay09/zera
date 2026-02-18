/**
 * GET /.well-known/security.txt
 *
 * RFC 9116 compliant security.txt for responsible vulnerability disclosure.
 * https://securitytxt.org/
 */

export async function GET() {
  const expiresDate = new Date();
  expiresDate.setFullYear(expiresDate.getFullYear() + 1);

  const body = [
    '# ZERA Digital Growth Systems — Security Policy',
    '#',
    '# If you discover a security vulnerability, please report it responsibly.',
    '',
    `Contact: mailto:security@zerahq.com`,
    `Expires: ${expiresDate.toISOString()}`,
    'Preferred-Languages: en',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
