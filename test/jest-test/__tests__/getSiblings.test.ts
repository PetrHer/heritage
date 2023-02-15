import { test, expect } from "@jest/globals";
import {  appRouter } from "../../../src/server/api/root";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";

test('get siblings', async()=>{
    const caller = appRouter.createCaller(createInnerTRPCContext({
        prisma: prisma,
        session: null
    }))
    const result = await caller.dbRouter.getSiblings({motherId:2,fatherId:3,personId:1})
    expect(result[0]?.name).toBe('Jana')
})