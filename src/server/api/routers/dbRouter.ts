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
        birthYear: z.string().nullish(),
        deathYear: z.string().nullish(),
        birthPlace: z.string().nullish(),
        birthSurname: z.string().nullish(),
        mother_id: z.number().nullish(),
        father_id: z.number().nullish(),
      })
    )
    .mutation(async (input) => {
      const response = await prisma.person.create({
        data: {
          year_of_death: input.input.deathYear,
          birth_place: input.input.birthPlace,
          surname: input.input.surname,
          birth_surname: input.input.birthSurname,
          year_of_birth: input.input.birthYear,
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
        birthYear: z.string().nullish(),
        deathYear: z.string().nullish(),
        birthPlace: z.string().nullish(),
        birthSurname: z.string().nullish(),
        mother_id: z.number().nullish(),
        father_id: z.number().nullish(),
      })
    )
    .mutation(async (input) => {
      const data = {
        birth_place: input.input.birthPlace,
        birth_surname: input.input.birthSurname,
        year_of_birth: input.input.birthYear,
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
        const response = await prisma.person.findMany({select:{id:true,name:true,surname:true,year_of_birth:true}})
        return response
      })
});
