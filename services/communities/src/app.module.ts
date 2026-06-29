import { Module } from "@nestjs/common";
import { CommunitiesModule } from "./modules/communities/communities.module";

@Module({ imports: [CommunitiesModule] })
export class AppModule {}
