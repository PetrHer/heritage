import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const secret = 'minesupersecretkey'


export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async(input) => {
        const password_db = await prisma.user.findFirst({where:{username:input.input.username},select:{password:true}})
        if (password_db?.password){
            const isMatch = await bcrypt.compare(input.input.password, password_db?.password);
            if (!isMatch) {throw new Error('failed to login')}
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const token = jwt.sign({ username: input.input.username }, secret)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return token;
    }),

  registration: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        confirmed_password: z.string(),
      })
    )
    .mutation(async(input) => {
      if (input.input.password != input.input.confirmed_password) {
        throw new Error("password does not match");
      }
      const saltRounds = 10;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const hashedPassword = await bcrypt.hash(input.input.password, saltRounds);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await prisma.user.create({data:{username:input.input.username,password:hashedPassword}})
      return response;
    }),
    verify:publicProcedure
        .input(z.string())
        .mutation((input)=>{
            jwt.verify(input.input, secret, (err, decoded) => {
                if (err) {
                  throw new Error('invalid token')
                }
                return true
              })
        })
});
