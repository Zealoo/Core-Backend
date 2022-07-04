-- CreateIndex
CREATE INDEX "CommunityMembers_id_community_id_user_id_idx" ON "CommunityMembers"("id", "community_id", "user_id");
