import {test,expect} from "@jest/globals";
import { AppRouter, appRouter } from "../../../src/server/api/root";
import { prisma } from "../../../src/server/db";
import { type } from "os";
import { inferProcedureInput } from "@trpc/server";

test('getPerson id 1',async()=>{
    const caller = appRouter.createCaller({session:null,prisma:prisma})
    type Input = inferProcedureInput<AppRouter['dbRouter']['getPerson']>
    const input : Input = 1
    const result = await caller.dbRouter.getPerson(input)
    expect(result?.name).toBe('Petr')
})