/**
 * @jest-environment node
 *
 * API integration test — hits the Route Handler with mongoose mocked so we never
 * need a live Atlas cluster. Still “integration” because we exercise NextResponse
 * + the route module boundary, not just a pure helper.
 */
import { GET } from './route';

jest.mock('@/utils/db', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/utils/models/Product', () => ({
  __esModule: true,
  default: {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([
        {
          _id: 'abc123',
          name: 'Banana',
          weight: 500,
          price: 40,
          tags: ['fruit'],
          imageUrl: 'https://example.com/banana.jpg',
        },
      ]),
    }),
  },
}));

describe('GET /api/products', () => {
  it('returns products as JSON', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({
      name: 'Banana',
      price: 40,
      tags: ['fruit'],
    });
  });
});
