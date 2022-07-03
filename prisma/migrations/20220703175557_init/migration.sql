-- CreateEnum
CREATE TYPE "CommunityRole" AS ENUM ('Admin', 'Mod', 'Member');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Mod', 'User');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_img" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dizyob2oz/image/upload/v1636463581/profile_img.png',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "suspend" BOOLEAN NOT NULL DEFAULT false,
    "accept_tos" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "community_img" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dizyob2oz/image/upload/v1656868674/communities_vozshg.jpg',
    "description" TEXT,
    "founder_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMembers" (
    "id" TEXT NOT NULL,
    "community_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "CommunityRole" NOT NULL DEFAULT 'Member',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_id_user_name_email_idx" ON "User"("id", "user_name", "email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_email_key" ON "User"("user_name", "email");

-- CreateIndex
CREATE INDEX "Community_id_name_idx" ON "Community"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_founder_id_fkey" FOREIGN KEY ("founder_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMembers" ADD CONSTRAINT "CommunityMembers_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
