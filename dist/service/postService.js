"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
class PostService {
    post;
    constructor(post) {
        this.post = post;
    }
    async create(input) {
        return this.post.create(input);
    }
    async findAll(where) {
        return this.post.findAll({ where });
    }
    async update(where, updatedValues) {
        return this.post.update(updatedValues, {
            where: { id: where.id },
        });
    }
    async findOne(where) {
        return this.post.findOne({ where });
    }
    async delete(where) {
        const deletedPost = await this.post.findOne({ where });
        this.post.destroy({
            where: { id: where.id, userId: where.userId },
        });
        return deletedPost;
    }
}
exports.PostService = PostService;
//# sourceMappingURL=postService.js.map