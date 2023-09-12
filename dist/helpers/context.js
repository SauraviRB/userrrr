"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const auth_1 = require("./auth");
async function Context({ req }) {
    try {
        if (req.headers.authorization) {
            const { token, user } = await (0, auth_1.authenticate)(req.headers.authorization);
            return { token, user };
        }
        return {};
    }
    catch (error) {
        throw error;
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map