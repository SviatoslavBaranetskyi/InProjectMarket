
export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ICategory[];
  tags: ITag[];
}