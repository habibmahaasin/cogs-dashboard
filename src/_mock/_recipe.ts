export interface RecipeItem {
  id: string;
  name: string;
  recipeDetail: RecipeDetail[];
}

export interface RecipeDetail {
  id: string;
  item: string;
  qty: number;
}

export const _recipe: RecipeItem[] = [
  {
    id: '1',
    name: 'Iced Coffee',
    recipeDetail: [
      {
        id: '1',
        item: 'Aren Sugar',
        qty: 0.015,
      },
      {
        id: '2',
        item: 'Milk',
        qty: 0.15,
      },
      {
        id: '3',
        item: 'Ice Cube',
        qty: 0.02,
      },
      {
        id: '4',
        item: 'Plastic Cup',
        qty: 0.02,
      },
      {
        id: '5',
        item: 'Coffee Bean',
        qty: 0.05,
      },
      {
        id: '6',
        item: 'Mineral Water',
        qty: 1,
      },
    ],
  },
  {
    id: '2',
    name: 'Hot Coffee',
    recipeDetail: [
      {
        id: '1',
        item: 'Aren Sugar',
        qty: 1,
      },
      {
        id: '2',
        item: 'Milk',
        qty: 1,
      },
      {
        id: '3',
        item: 'Ice Cube',
        qty: 1,
      },
      {
        id: '4',
        item: 'Plastic Cup',
        qty: 1,
      },
      {
        id: '5',
        item: 'Coffee Bean',
        qty: 1,
      },
      {
        id: '6',
        item: 'Mineral Water',
        qty: 1,
      },
    ],
  },
];
