"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyService = void 0;
class ReplyService {
    reply;
    constructor(reply) {
        this.reply = reply;
    }
    async create(input) {
        return this.reply.create(input);
    }
    async findAll(where) {
        return this.reply.findAll({ where });
    }
    async findByPk(replyId) {
        const reply = await this.reply.findByPk(replyId);
        if (!reply) {
            throw new Error(`No comment exists with id: ${replyId}`);
        }
        return reply;
    }
    async update(where, updatedValues) {
        return this.reply.update(updatedValues, {
            where: { id: where.replyId },
        });
    }
    async delete(where) {
        const deletedPost = await this.reply.findOne({ where });
        this.reply.destroy({
            where: { id: where.id, userId: where.userId },
        });
        return deletedPost;
    }
}
exports.ReplyService = ReplyService;
//# sourceMappingURL=replyService.js.map