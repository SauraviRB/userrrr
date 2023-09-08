"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
class CommentService {
    comment;
    constructor(comment) {
        this.comment = comment;
    }
    async create(input) {
        return this.comment.create(input);
    }
    async findAll(where) {
        return this.comment.findAll({ where });
    }
    async findByPk(commentId) {
        const comment = await this.comment.findByPk(commentId);
        if (!comment) {
            throw new Error(`No comment exists with id: ${commentId}`);
        }
        return comment;
    }
    async update(where, updatedValues) {
        return this.comment.update(updatedValues, {
            where: { id: where.commentId },
        });
    }
    async delete(where) {
        const deletedPost = await this.comment.findOne({ where });
        this.comment.destroy({
            where: { id: where.id, userId: where.userId },
        });
        return deletedPost;
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=commentService.js.map