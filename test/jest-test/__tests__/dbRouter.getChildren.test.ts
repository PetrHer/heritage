import {  appRouter } from "../../../src/server/api/root";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";
import { prismaMock } from "../../../singleton";
import type { Person } from "@prisma/client";

test('get children', async()=>{
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
        year_of_death: "",
      }];
      prismaMock.person.findMany.mockResolvedValue(mockResponse);
    const caller = appRouter.createCaller(createInnerTRPCContext({
        prisma: prismaMock,
        session: null
    }))
    const id = 2;
    const result = await caller.dbRouter.getChildren(id)
    expect(result[0]?.name).toBe('Jane')
    expect(result).toHaveLength(1);
})