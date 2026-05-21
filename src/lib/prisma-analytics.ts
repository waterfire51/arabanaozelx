import { prisma } from "@/lib/prisma";

/** Prisma client migrate/generate sonrası `analyticsEvent` delegate kullanılır */
type AnalyticsPrisma = {
  analyticsEvent: {
    createMany: (args: unknown) => Promise<unknown>;
    create: (args: unknown) => Promise<unknown>;
    findMany: (args: unknown) => Promise<unknown[]>;
  };
};

export function analyticsPrisma() {
  return (prisma as unknown as AnalyticsPrisma).analyticsEvent;
}
