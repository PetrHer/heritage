import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import jwt from "jsonwebtoken";
import { formatName } from "../../../utils/functions";
const secret = "minesupersecretkey";

export const dbRouter = createTRPCRouter({
  getPerson: publicProcedure
    .input(z.number().nullish())
    .query(async ({ ctx, input }) => {
      if (!input) {throw new Error("missing id")}
      const response = await ctx.prisma.person.findFirstOrThrow({
        where: { id: input },
      });
      return response;
    }),
    getPersonRecords: publicProcedure
    .input(z.number().nullish())
    .mutation(async ({ ctx, input }) => {
      if (!input) {throw new Error("missing id")}
      const response = await ctx.prisma.person.findFirstOrThrow({
        where: { id: input },
      });
      return response;
    }),
  getSiblings: publicProcedure
    .input(
      z.object({
        motherId: z.number().nullish(),
        fatherId: z.number().nullish(),
        personId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.person.findMany({
        where: {
          OR:{ mother_id: input.motherId,
          father_id: input.fatherId,},
          NOT: { id: input.personId },
        },
      });
      return response;
    }),
  getChildren: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.person.findMany({
        where: {
          OR: [{ mother_id: input }, { father_id: input }],
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
        year_of_death: z.number().nullish(),
        birth_place: z.string().nullish(),
        birth_surname: z.string().nullish(),
        mother_id: z.number().nullish(),
        father_id: z.number().nullish(),
        token: z.string(),
        description: z.string().nullish(),
        partner_id: z.number().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
      jwt.verify(input.token, secret, (err, _) => {
        if (err) {
          throw new Error("not logged in");
        }
      });
      const birthName = input.birth_surname ? input.birth_surname : null;
      const response = await ctx.prisma.person.create({
        data: {
          year_of_death: input.year_of_death,
          birth_place: input.birth_place,
          surname: formatName(input.surname),
          birth_surname: birthName,
          year_of_birth: input.year_of_birth,
          name: input.name,
          mother_id: input.mother_id,
          father_id: input.father_id,
          partner_id: input.partner_id,
        },
      });
      return response;
    }),
  deletePerson: publicProcedure
    .input(z.object({ id: z.number(), token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
      jwt.verify(input.token, secret, (err, _) => {
        if (err) {
          throw new Error("not logged in");
        }
      });
      const response = await ctx.prisma.person.delete({
        where: { id: input.id },
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
        year_of_death: z.number().nullish(),
        birth_place: z.string().nullish(),
        birth_surname: z.string().nullish(),
        mother_id: z.number().nullish(),
        father_id: z.number().nullish(),
        token: z.string(),
        description: z.string().nullish(),
        partner_id:z.number().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const birthName = input.birth_surname ? input.birth_surname : null;
      const data = {
        birth_place: input.birth_place,
        birth_surname: birthName,
        year_of_death: input.year_of_death,
        year_of_birth: input.year_of_birth,
        mother_id: input.mother_id,
        father_id: input.father_id,
        name: formatName(input.name),
        surname: formatName(input.surname),
        description: input.description,
        partner_id:input.partner_id,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
      jwt.verify(input.token, secret, (err, _) => {
        if (err) {
          throw new Error("not logged in");
        }
      });
      const response = await ctx.prisma.person.update({
        where: { id: input.id },
        data,
      });
      return response;
    }),
  getAll: publicProcedure
    .input(
      z.object({
        surname: z.string().nullish(),
        initials: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.surname) {
        const name = formatName(input.surname);
        const response = await ctx.prisma.person.findMany({
          where: { surname: name },
          select: { name: true, surname: true, year_of_birth: true, id: true },
        });
        return response;
      }
      if (input.initials) {
        const myArr = input.initials.split("");
        const data = await ctx.prisma.person.findMany({
          select: { name: true, surname: true, year_of_birth: true, id: true },
        });
        const response = data.filter(
          (x) => x.surname[0] && myArr.includes(x.surname[0])
        );
        return response;
      }
      const response = await ctx.prisma.person.findMany({
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
    getPartner: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.person.findFirstOrThrow({
        where: { partner_id: input },
      });
      return response;
    }),
});
