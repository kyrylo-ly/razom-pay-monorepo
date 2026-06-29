import { RpcException } from "@nestjs/microservices";
import { CommunitiesRepository } from "./communities.repository";
import { RpcStatus } from "@razom-pay/common";
import type {
  CreateCommunityRequest,
  GetCommunityRequest,
} from "@razom-pay/contracts/gen/communities";

export class CommunitiesService {
  constructor(private communitiesRepository: CommunitiesRepository) {}

  async findById(data: GetCommunityRequest) {
    const community = await this.communitiesRepository.findById(data.id);

    if (!community) {
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
      });
    }

    return community;
  }

  create(data: CreateCommunityRequest) {
    return this.communitiesRepository.create(data);
  }

  delete(id: string) {
    return this.communitiesRepository.delete(id);
  }
}
