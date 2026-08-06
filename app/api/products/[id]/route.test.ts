/**
 * @jest-environment node
 */
import { DELETE, PATCH } from './route';
import { auth } from '@/auth';
import Product from '@/utils/models/Product';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/utils/db', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined),
}));

const VALID_ID = '507f1f77bcf86cd799439011';
const OTHER_ID = '507f1f77bcf86cd799439012';

const deleteOneMock = jest.fn();
const saveMock = jest.fn();

function ownedDoc(overrides: Record<string, unknown> = {}) {
  return {
    _id: VALID_ID,
    name: 'Apple',
    weight: 1000,
    price: 50,
    tags: ['fruit'],
    imageUrl: 'https://example.com/apple.jpg',
    ownerId: 'user-1',
    deleteOne: deleteOneMock,
    save: saveMock,
    ...overrides,
  };
}

jest.mock('@/utils/models/Product', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

function deleteRequest() {
  return new Request(`http://localhost/api/products/${VALID_ID}`, {
    method: 'DELETE',
  });
}

function patchRequest(body: unknown) {
  return new Request(`http://localhost/api/products/${VALID_ID}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const ctx = { params: Promise.resolve({ id: VALID_ID }) };

describe('DELETE /api/products/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    deleteOneMock.mockResolvedValue(undefined);
  });

  it('returns 401 when unauthenticated', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const res = await DELETE(deleteRequest(), ctx);

    expect(res.status).toBe(401);
    expect(Product.findById).not.toHaveBeenCalled();
  });

  it('returns 404 when product is missing', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    const res = await DELETE(deleteRequest(), ctx);

    expect(res.status).toBe(404);
    expect(deleteOneMock).not.toHaveBeenCalled();
  });

  it('returns 404 when ownerId does not match', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc({ ownerId: 'someone-else' })),
    });

    const res = await DELETE(deleteRequest(), ctx);

    expect(res.status).toBe(404);
    expect(deleteOneMock).not.toHaveBeenCalled();
  });

  it('deletes when owner matches', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc()),
    });

    const res = await DELETE(deleteRequest(), ctx);

    expect(res.status).toBe(200);
    expect(deleteOneMock).toHaveBeenCalled();
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it('returns 404 for invalid ObjectId', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });

    const res = await DELETE(deleteRequest(), {
      params: Promise.resolve({ id: 'not-an-id' }),
    });

    expect(res.status).toBe(404);
    expect(Product.findById).not.toHaveBeenCalled();
  });
});

describe('PATCH /api/products/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    saveMock.mockImplementation(function (this: Record<string, unknown>) {
      return Promise.resolve(this);
    });
  });

  it('returns 401 when unauthenticated', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const res = await PATCH(patchRequest({ name: 'Pear' }), ctx);

    expect(res.status).toBe(401);
    expect(Product.findById).not.toHaveBeenCalled();
  });

  it('returns 404 when ownerId does not match', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc({ ownerId: 'other' })),
    });

    const res = await PATCH(patchRequest({ name: 'Pear' }), ctx);

    expect(res.status).toBe(404);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('updates allowed fields when owner matches', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    const doc = ownedDoc();
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(doc),
    });

    const res = await PATCH(
      patchRequest({
        name: 'Pear',
        weight: 750,
        price: 60,
        tags: 'fruit, featured',
      }),
      ctx,
    );

    expect(res.status).toBe(200);
    expect(saveMock).toHaveBeenCalled();
    expect(doc).toMatchObject({
      name: 'Pear',
      weight: 750,
      price: 60,
      tags: ['fruit', 'featured'],
    });

    const body = await res.json();
    expect(body.result).toMatchObject({
      name: 'Pear',
      ownerId: 'user-1',
    });
  });

  it('rejects ownerId changes', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc()),
    });

    const res = await PATCH(
      patchRequest({ name: 'Pear', ownerId: OTHER_ID }),
      ctx,
    );

    expect(res.status).toBe(400);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('returns 400 when no updatable fields are provided', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc()),
    });

    const res = await PATCH(patchRequest({}), ctx);

    expect(res.status).toBe(400);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('returns 400 for null JSON body', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc()),
    });

    const res = await PATCH(
      new Request(`http://localhost/api/products/${VALID_ID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: 'null',
      }),
      ctx,
    );

    expect(res.status).toBe(400);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('returns 400 for non-finite weight or price', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc()),
    });

    const res = await PATCH(patchRequest({ weight: 'abc', price: 10 }), ctx);

    expect(res.status).toBe(400);
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('returns 400 for invalid name', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { _id: 'user-1' },
    });
    (Product.findById as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(ownedDoc()),
    });

    const res = await PATCH(patchRequest({ name: '   ' }), ctx);

    expect(res.status).toBe(400);
    expect(saveMock).not.toHaveBeenCalled();
  });
});
