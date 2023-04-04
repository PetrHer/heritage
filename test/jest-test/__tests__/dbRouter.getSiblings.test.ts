import { test, expect } from "@jest/globals";
import {  appRouter } from "../../../src/server/api/root";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";
import { prismaMock } from "../../../singleton";
import type { Person } from "@prisma/client";

test('get siblings', async()=>{
    const mockResponse: Person[] = [{
        id: 4,
        name: "Jane",
        surname: "Doe",
        year_of_birth: 1980,
        birth_place: "",
        birth_surname: "",
        description: "",
        father_id: 0,
        image: "",
        mother_id: 0,
        year_of_death: null,
        partner_id:null,
      }];
      prismaMock.person.findMany.mockResolvedValue(mockResponse);
    const caller = appRouter.createCaller(createInnerTRPCContext({
        prisma: prismaMock,
        session: null
    }))
    const result = await caller.dbRouter.getSiblings({motherId:2,fatherId:3,personId:1})
    expect(result[0]?.name).toBe('Jane')
    expect(result).toHaveLength(1);
})