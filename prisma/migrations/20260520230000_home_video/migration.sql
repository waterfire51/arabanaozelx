-- CreateTable
CREATE TABLE "HomeVideo" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "videoPath" TEXT NOT NULL,
    "href" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeVideo_pkey" PRIMARY KEY ("id")
);
