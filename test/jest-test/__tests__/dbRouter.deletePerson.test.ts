import type { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { test, expect } from "@jest/globals";
import {  appRouter } from "../../../src/server/api/root";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";
import { prismaMock } from "../../../singleton";
import type { Person } from "@prisma/client";


test('delete person', async()=>{
  const mockVerify = jest.fn().mockImplementation((token: string, secret: Secret, callback: (err: unknown, decoded: unknown) => void) => {
    callback(null, {});
  });
    const mockResponse: Person = {
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
      };
      prismaMock.person.delete.mockResolvedValue(mockResponse);

      (jwt.verify as jest.Mock) = mockVerify;
    const caller = appRouter.createCaller(createInnerTRPCContext({
        prisma: prismaMock,
        session: null
    }))
    const result = await caller.dbRouter.deletePerson({id:4,token:'blablabla'})
    expect(result.name).toBe('Jane')
})