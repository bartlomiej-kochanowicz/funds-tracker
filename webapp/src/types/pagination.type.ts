export interface Pagination<Item> {
  collection: Item[];

  pagination: {
    total: number;
    current: number;
  };
}
