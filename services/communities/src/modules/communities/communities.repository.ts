import { PrismaService } from "@/infra/prisma/prisma.service";
import { CreateCommunityRequest } from "@razom-pay/contracts/gen/communities";

export class CommunitiesRepository {
  constructor(private prismaService: PrismaService) {}

  findById(id: string) {
    return this.prismaService.community.findUnique({
      where: { id: id },
      select: { name: true, description: true },
    });
  }

  create(data: CreateCommunityRequest) {
    return this.prismaService.community.create({ data: data });
  }

  delete(id: string) {
    return this.prismaService.community.delete({ where: { id: id } });
  }
}
