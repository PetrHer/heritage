import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const dbRouter = createTRPCRouter({
  getPerson: publicProcedure.input(z.number()).mutation(async (input) => {
    const response = await prisma.person.findFirst({
      where: { id: input.input },
    });
    return response;
  }),
  getSiblings: publicProcedure
    .input(
      z.object({
        motherId: z.number(),
        fatherId: z.number(),
        personId: z.number(),
      })
    )
    .mutation(async (input) => {
      const response = await prisma.person.findMany({
        where: {
          mother_id: input.input.motherId,
          father_id: input.input.fatherId,
          NOT: { id: input.input.personId },
        },
      });
      return response;
    }),
  getChildren: publicProcedure.input(z.number()).mutation(async (input) => {
    const response = await prisma.person.findMany({
      where: {
        OR: [{ mother_id: input.input }, { father_id: input.input }],
      },
    });
    return response;
  }),
  addPerson: publicProcedure
    .input(
      z.object({
        name: z.string(),
        surname: z.string(),
        year_of_birth: z.number().nullish(),
        year_of_death: z.string().nullish(),
        birth_place: z.string().nullish(),
        birth_surname: z.string().nullish(),
        mother_id: z.number(),
        father_id: z.number(),
      })
    )
    .mutation(async (input) => {
      const response = await prisma.person.create({
        data: {
          year_of_death: input.input.year_of_death,
          birth_place: input.input.birth_place,
          surname: input.input.surname,
          birth_surname: input.input.birth_surname,
          year_of_birth: input.input.year_of_birth,
          name: input.input.name,
          mother_id: input.input.mother_id,
          father_id: input.input.father_id,
        },
      });
      return response;
    }),
  deletePerson: publicProcedure.input(z.number()).mutation(async (input) => {
    const response = await prisma.person.delete({ where: { id: input.input } });
    return response;
  }),
  updatePerson: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        surname: z.string(),
        year_of_birth: z.number().nullish(),
        year_of_death: z.string().nullish(),
        birth_place: z.string().nullish(),
        birth_surname: z.string().nullish(),
        mother_id: z.number(),
        father_id: z.number(),
      })
    )
    .mutation(async (input) => {
      const data = {
        birth_place: input.input.birth_place,
        birth_surname: input.input.birth_surname,
        year_of_birth: input.input.year_of_birth,
        mother_id: input.input.mother_id,
        father_id: input.input.father_id,
        name:input.input.name,
        surname:input.input.surname,
      };
      const response = await prisma.person.update({where:{id:input.input.id},data})
      return response
    }),
    getALL:publicProcedure
      .mutation(async()=>{
        const response = await prisma.person.findMany({where:{year_of_birth:{gt:1960}},select:{id:true,name:true,surname:true,year_of_birth:true}})
        return response
      })
});
