import { test, expect } from "@jest/globals";
import {  appRouter } from "../../../src/server/api/root";
import { mockDeep } from "jest-mock-extended";
import { Person, PrismaClient } from "@prisma/client";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";

test("get all", async () => {

  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null, prisma: prisma })
  );

  const result = await caller.dbRouter.getAll({})
  result.sort((a,b)=> a.id-b.id)
  expect(result[0]?.name).toBe('Petr');
});
