import { test, expect } from "@jest/globals";
import type { AppRouter} from "../../../src/server/api/root";
import { appRouter } from "../../../src/server/api/root";
import type { inferProcedureInput } from "@trpc/server";
import { prismaMock } from "../../../singleton";
import type { Person } from "@prisma/client";

test("getPerson id 1", async () => {
  const mockResponse: Person = {
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
    year_of_death: "",
    partner_id:null,
  };
  prismaMock.person.findFirstOrThrow.mockResolvedValue(mockResponse);
  const caller = appRouter.createCaller({ session: null, prisma: prismaMock });
  type Input = inferProcedureInput<AppRouter["dbRouter"]["getPerson"]>;
  const input: Input = 1;
  const result = await caller.dbRouter.getPerson(input);
  expect(result?.name).toBe("Petr");
});
