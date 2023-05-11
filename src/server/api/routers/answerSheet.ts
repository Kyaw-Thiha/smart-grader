import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@server/api/trpc";

export const answerSheetRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.answerSheet.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getAnswers: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.answerSheet.findFirst({
        where: {
          id: input.id,
        },
        select: {
          studentName: true,
          studentEmail: true,
          status: true,
          totalMarks: true,
          startTime: true,
          endTime: true,
          answers: {
            orderBy: {
              order: "asc",
            },
            include: {
              multipleChoiceQuestionAnswer: true,
              shortAnswerQuestionAnswer: true,
              longAnswerQuestionAnswer: true,
            },
          },
        },
      });
    }),

  checkPassword: publicProcedure
    .input(z.object({ id: z.string(), passwordHash: z.string() }))
    .query(({ ctx, input }) => {
      ctx.prisma.answerSheet
        .findFirst({
          where: {
            id: input.id,
          },
        })
        .then((answerSheet) => {
          return answerSheet?.studentPassword == input.passwordHash;
        })
        .catch(() => {
          return;
        });
    }),

  create: publicProcedure
    .input(
      z.object({
        studentName: z.string(),
        studentEmail: z.string(),
        publishedWorksheetId: z.string(),
        answers: z.array(
          z.object({
            order: z.number(),
            answerType: z.union([
              z.literal("MultipleChoiceQuestionAnswer"),
              z.literal("ShortAnswerQuestionAnswer"),
              z.literal("LongAnswerQuestionAnswer"),
            ]),
            multipleChoiceQuestionAnswer: z
              .object({
                create: z.object({
                  studentAnswer: z.number(),
                }),
              })
              .optional(),
            shortAnswerQuestionAnswer: z
              .object({
                create: z.object({
                  studentAnswer: z.string(),
                }),
              })
              .optional(),
            longAnswerQuestionAnswer: z
              .object({
                create: z.object({
                  studentAnswer: z.string(),
                  studentImages: z.string(),
                }),
              })
              .optional(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.answerSheet.create({
        data: {
          studentName: input.studentName,
          studentEmail: input.studentEmail,
          status: "answering",
          publishedWorksheetId: input.publishedWorksheetId,
          answers: {
            create: input.answers,
          },
        },
      });
    }),

  editStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.union([
          z.literal("answering"),
          z.literal("checking"),
          z.literal("returned"),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.answerSheet.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),

  editStudentName: publicProcedure
    .input(
      z.object({
        id: z.string(),
        studentName: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.answerSheet.update({
        where: {
          id: input.id,
        },
        data: {
          studentName: input.studentName,
        },
      });
    }),

  editStudentEmail: publicProcedure
    .input(
      z.object({
        id: z.string(),
        studentEmail: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.answerSheet.update({
        where: {
          id: input.id,
        },
        data: {
          studentEmail: input.studentEmail,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.answerSheet.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
