import { Module } from "@nestjs/common";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesService } from "./communities.service";
import { CommunitiesRepository } from "./communities.repository";

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository],
})
export class CommunitiesModule {}
