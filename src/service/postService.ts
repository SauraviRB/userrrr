import { PostInterface } from "@src/interface";
import { WhereOptions } from "sequelize";
export class PostService {
  constructor(public readonly post: any) {}

  async create(input: { description: string; userId: number }) {
    return this.post.create(input);
  }
  async findAll(where?: {
    where: WhereOptions<any>;
  }): Promise<PostInterface[]> {
    return this.post.findAll({ where });
  }
  async update(where: { id: number }, updatedValues: { description: string }) {
    return this.post.update(updatedValues, {
      where: { id: where.id },
    });
  }
  async destroy(where: { id: number; userId: number}) {
    return this.post.destroy({
      where: { id: where.id, userId: where.userId},
    });
  }
}
