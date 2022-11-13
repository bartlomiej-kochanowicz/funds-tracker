import { Injectable } from '@nestjs/common';
import { Pagination } from 'common/types/pagination.type';

@Injectable()
export class CollectionService {
  paginate<Data>(
    data: Data[],
    count: number,
    page: number,
    limit: number,
  ): Pagination<Data> {
    return {
      collection: data,
      pagination: {
        current: page,
        total: Math.ceil(count / limit),
      },
    };
  }
}
