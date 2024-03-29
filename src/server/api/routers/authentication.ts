import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const secret = "minesupersecretkey";
interface VerifyResult {
  username: string;
  privileges: boolean; // Assuming privileges is an array of strings
}

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (input) => {
      const password_db = await prisma.userLogin.findFirstOrThrow({
        where: { username: input.input.username },
        select: { password: true, privileges: true },
      });
      if (password_db?.password) {
        const isMatch = await bcrypt.compare(
          input.input.password,
          password_db?.password
        );
        if (!isMatch) {
          throw new Error("failed to login");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const token = jwt.sign(
        { username: input.input.username, privileges: password_db.privileges },
        secret
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return token;
    }),

  registration: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        confirmed_password: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async (input) => {
      if (input.input.password != input.input.confirmed_password) {
        throw new Error("password does not match");
      }
      const saltRounds = 10;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const hashedPassword = await bcrypt.hash(
        input.input.password,
        saltRounds
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await prisma.userLogin.create({
        data: {
          username: input.input.username,
          password: hashedPassword,
          email: input.input.email,
          verified: false,
        },
      });
      const timeOfExpiration = new Date();
      timeOfExpiration.setMinutes(timeOfExpiration.getMinutes() + 10);
      let pasResToken = "";
      for (let index = 0; index < 10; index++) {
        const pasResTokenGen = String.fromCharCode(
          Math.floor(Math.random() * 26) + 97
        );
        pasResToken += pasResTokenGen;
      }
      await prisma.verificationToken.create({
        data: {
          identifier: response.username,
          expires: timeOfExpiration,
          token: pasResToken,
        },
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env["GMAIL"],
          pass: process.env["GMAIL_PASS"],
        },
      });

      const mailOptions = {
        from: process.env.GMAIL,
        to: input.input.email,
        subject: "verification email",
        text: `herytage.onrender.com/verification/?passwordToken=${pasResToken}`,
      };
      transporter.sendMail(mailOptions, (error: unknown) => {
        if (error) {
          throw new Error("not send");
        } else {
          return `email sent to ${input.input.email}`;
        }
      });
    }),
  verify: publicProcedure.input(z.string()).mutation((input) => {
    return new Promise<VerifyResult>((resolve, reject) => {
      jwt.verify(input.input, secret, (err, decoded) => {
        if (err) {
          reject(new Error("not logged in"));
        } else {
          const payload = decoded as JwtPayload;
          const result: VerifyResult = {
            username: payload.username as string,
            privileges: payload.privileges as boolean,
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          resolve(result);
        }
      });
    });
  }),
  verifyEmail: publicProcedure.input(z.string()).mutation(async (input) => {
    const currentTime = new Date();
    const accountToVerify = await prisma.verificationToken.findFirstOrThrow({
      where: { token: input.input },
    });
    if (!accountToVerify) {
      throw new Error("invalid token");
    }
    if (currentTime > accountToVerify.expires) {
      throw new Error("toked expired");
    }
    const response = await prisma.userLogin.update({
      data: { verified: true },
      where: { username: accountToVerify.identifier },
    });
    await prisma.verificationToken.deleteMany({
      where: { token: input.input },
    });
    const token = jwt.sign({ username: response.username }, secret);
    return token;
  }),
});
