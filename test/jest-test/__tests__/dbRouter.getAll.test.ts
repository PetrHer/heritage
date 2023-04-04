import { test, expect } from "@jest/globals";
import { appRouter } from "../../../src/server/api/root";
import type { Person } from "@prisma/client";
import { createInnerTRPCContext } from "../../../src/server/api/trpc";
import { prismaMock } from "../../../singleton";

test("get all", async () => {
  const mockResponse: Person[] = [
    {
      id: 1,
      name: "Petr",
      surname: "Doe",
      year_of_birth: 1980,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
    {
      id: 2,
      name: "John",
      surname: "Doe",
      year_of_birth: 1970,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
    {
      id: 3,
      name: "Jane",
      surname: "Doe",
      year_of_birth: 1961,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
  ];
  prismaMock.person.findMany.mockResolvedValue(mockResponse);

  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null, prisma: prismaMock })
  );

  const result = await caller.dbRouter.getAll({});
  expect(result.every((x) => x.year_of_birth && x.year_of_birth > 1960)).toBe(
    true
  );
});

test("get all by surname", async () => {
  const mockResponse: Person[] = [
    {
      id: 1,
      name: "Petr",
      surname: "Doe",
      year_of_birth: 1980,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
    {
      id: 2,
      name: "John",
      surname: "Doe",
      year_of_birth: 1970,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
    {
      id: 3,
      name: "Jane",
      surname: "Doe",
      year_of_birth: 1961,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
  ];
  prismaMock.person.findMany.mockResolvedValue(mockResponse);
  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null, prisma: prismaMock })
  );
  const surname = "Doe";
  const result = await caller.dbRouter.getAll({ surname: surname });
  expect(result.every((x) => x.surname == surname)).toBe(true);
});

test("get all by initials", async () => {
  const mockResponse: Person[] = [
    {
      id: 1,
      name: "Petr",
      surname: "Doe",
      year_of_birth: 1980,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
    {
      id: 2,
      name: "John",
      surname: "Boe",
      year_of_birth: 1970,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
    {
      id: 3,
      name: "Jane",
      surname: "Doe",
      year_of_birth: 1961,
      birth_place: "",
      birth_surname: "",
      description: "",
      father_id: 0,
      image: "",
      mother_id: 0,
      year_of_death: null,
      partner_id: null,
    },
  ];
  prismaMock.person.findMany.mockResolvedValue(mockResponse);
  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null, prisma: prismaMock })
  );
  const initials = "ABCDEF";
  const result = await caller.dbRouter.getAll({ initials: initials });
  if (result[0]?.surname[0])
    expect(initials.includes(result[0].surname[0])).toBe(true);
  expect(
    result.every((x) => x.surname[0] && initials.includes(x.surname[0]))
  ).toBe(true);
});
