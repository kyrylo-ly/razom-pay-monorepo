import { GrpcMethod } from "@nestjs/microservices";
import { CommunitiesService } from "./communities.service";
import type { GetCommunityRequest } from "@razom-pay/contracts/gen/communities";

export class CommunitiesController {
  constructor(private communitiesService: CommunitiesService) {}

  @GrpcMethod("CommunitiesService", "GetCommunity")
  getCommunity(data: GetCommunityRequest) {
    return this.communitiesService.findById(data);
  }
}
