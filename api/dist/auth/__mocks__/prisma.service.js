"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
exports.PrismaService = jest.fn().mockReturnValue({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
        update: jest.fn(),
    },
});
//# sourceMappingURL=prisma.service.js.map