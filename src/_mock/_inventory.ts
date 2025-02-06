export interface InventoryItem {
  id: string;
  item: string;
  qty: number;
  uom: string;
  price_per_qty: number;
}

export const _inventory: InventoryItem[] = [
  {
    id: '1',
    item: 'Aren Sugar',
    qty: 1,
    uom: 'kg',
    price_per_qty: 60000,
  },
  {
    id: '2',
    item: 'Milk',
    qty: 1,
    uom: 'Liter',
    price_per_qty: 30000,
  },
  {
    id: '3',
    item: 'Ice Cube',
    qty: 1,
    uom: 'kg',
    price_per_qty: 15000,
  },
  {
    id: '4',
    item: 'Plastic Cup',
    qty: 10,
    uom: 'pcs',
    price_per_qty: 5000,
  },
  {
    id: '5',
    item: 'Coffee Bean',
    qty: 1,
    uom: 'kg',
    price_per_qty: 100000,
  },
  {
    id: '6',
    item: 'Mineral Water',
    qty: 1,
    uom: 'Liter',
    price_per_qty: 5000,
  },
];
