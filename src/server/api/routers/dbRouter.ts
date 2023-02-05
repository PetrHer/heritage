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
        mother_id: z.number().nullish(),
        father_id: z.number().nullish(),
      })
    )
    .mutation(async (input) => {
      const response = await prisma.person.create({
        data: {
          name: input.input.name,
          mother_id: input.input.mother_id,
          father_id: input.input.father_id,
        },
      });
      return response
    }),
    deletePerson:publicProcedure
      .input(z.number())
      .mutation(async(input)=>{
          const response = await prisma.person.delete({where:{id:input.input}})
          return response
      })
});
