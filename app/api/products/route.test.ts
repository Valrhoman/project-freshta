/**
 * @jest-environment node
 *
 * API integration test — hits the Route Handler with mongoose mocked so we never
 * need a live Atlas cluster. Still “integration” because we exercise NextResponse
 * + the route module boundary, not just a pure helper.
 */
import { GET, POST } from './route';
import { auth } from '@/auth';
import Product from '@/utils/models/Product';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/utils/db', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

const saveMock = jest.fn();

jest.mock('@/utils/models/Product', () => {
  const MockProduct = jest.fn().mockImplementation((data: Record<string, unknown>) => ({
    ...data,
    save: saveMock,
  }));
  (MockProduct as unknown as { find: jest.Mock }).find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([
      {
        _id: 'abc123',
        name: 'Banana',
        weight: 500,
        price: 40,
        tags: ['fruit'],
        imageUrl: 'https://example.com/banana.jpg',
        ownerId: 'user-1',
      },
    ]),
  });
  return {
    __esModule: true,
    default: MockProduct,
  };
});

function buildProductFormData() {
  const formData = new FormData();
  formData.append('name', 'Apple');
  formData.append('weight', '1000');
  formData.append('price', '50');
  formData.append('tags', 'fruit, featured');
  formData.append('imageUrl', 'https://example.com/apple.jpg');
  return formData;
}

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

describe('POST /api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    saveMock.mockResolvedValue({
      _id: 'new1',
      name: 'Apple',
      ownerId: 'user-1',
    });
  });

  it('returns 401 when unauthenticated', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const res = await POST(
      new Request('http://localhost/api/products', {
        method: 'POST',
        body: buildProductFormData(),
      }),
    );

    expect(res.status).toBe(401);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('creates a product with ownerId when authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1', email: 'seller@example.com' },
    });

    const res = await POST(
      new Request('http://localhost/api/products', {
        method: 'POST',
        body: buildProductFormData(),
      }),
    );

    expect(res.status).toBe(200);
    expect(Product).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Apple',
        weight: 1000,
        price: 50,
        tags: ['fruit', 'featured'],
        imageUrl: 'https://example.com/apple.jpg',
        ownerId: 'user-1',
      }),
    );
    expect(saveMock).toHaveBeenCalled();

    const body = await res.json();
    expect(body.result).toMatchObject({ name: 'Apple', ownerId: 'user-1' });
  });
});
