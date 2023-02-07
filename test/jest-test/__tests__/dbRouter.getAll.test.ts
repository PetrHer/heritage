import { test, expect } from "@jest/globals";
import {  appRouter } from "../../../src/server/api/root";
import { mockDeep } from "jest-mock-extended";
import { Person, PrismaClient } from "@prisma/client";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";

test("getPerson id 1", async () => {

  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null, prisma: prisma })
  );

  const result = await caller.dbRouter.getALL()
  
  expect(result).toHaveLength(9);
  expect(result.filter(e=>(e.year_of_birth && e.year_of_birth<1960))).toHaveLength(0)
});
