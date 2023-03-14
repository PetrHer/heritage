import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import jwt from "jsonwebtoken";
import { formatName } from "../../../utils/functions";
const secret = "minesupersecretkey";

export const dbRouter = createTRPCRouter({
  getPerson: publicProcedure.input(z.number()).mutation(async (input) => {
    const response = await prisma.person.findFirstOrThrow({
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
        token: z.string(),
        description: z.string().nullish(),
      })
    )
    .mutation(async (input) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
      jwt.verify(input.input.token, secret, (err, _) => {
        if (err) {
          throw new Error("not logged in");
        }
      });
      const birthName = input.input.birth_surname
        ? input.input.birth_surname
        : null;
      const response = await prisma.person.create({
        data: {
          year_of_death: input.input.year_of_death,
          birth_place: input.input.birth_place,
          surname: formatName(input.input.surname),
          birth_surname: birthName,
          year_of_birth: input.input.year_of_birth,
          name: input.input.name,
          mother_id: input.input.mother_id,
          father_id: input.input.father_id,
        },
      });
      return response;
    }),
  deletePerson: publicProcedure
    .input(z.object({ id: z.number(), token: z.string() }))
    .mutation(async (input) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
      jwt.verify(input.input.token, secret, (err, _) => {
        if (err) {
          throw new Error("not logged in");
        }
      });
      const response = await prisma.person.delete({
        where: { id: input.input.id },
      });
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
        token: z.string(),
        description: z.string().nullish(),
      })
    )
    .mutation(async (input) => {
      const birthName = input.input.birth_surname
      ? input.input.birth_surname
      : null;
      const data = {
        birth_place: input.input.birth_place,
        birth_surname: birthName,
        year_of_birth: input.input.year_of_birth,
        mother_id: input.input.mother_id,
        father_id: input.input.father_id,
        name: formatName(input.input.name),
        surname: formatName(input.input.surname),
        description: input.input.description,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
      jwt.verify(input.input.token, secret, (err, _) => {
        if (err) {
          throw new Error("not logged in");
        }
      });
      const response = await prisma.person.update({
        where: { id: input.input.id },
        data,
      });
      return response;
    }),
  getAll: publicProcedure
    .input(z.string().nullish())
    .mutation(async (input) => {
      if (input.input) {
        const name = formatName(input.input);
        const response = await prisma.person.findMany({
          where: { surname: name },
          select: { name: true, surname: true, year_of_birth: true, id: true },
        });
        return response;
      }
      const response = await prisma.person.findMany({
        where: { year_of_birth: { gt: 1960 } },
        select: { name: true, surname: true, year_of_birth: true, id: true },
      });
      return response;
    }),
  uploadImage: publicProcedure
    .input(z.object({ filePath: z.string(), id: z.number() }))
    .mutation(async (input) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      //const path = await uploadImage(file,input.input.name)
      const data = { image: input.input.filePath };
      const response = await prisma.person.update({
        where: { id: input.input.id },
        data,
      });
      return response;
    }),
});
