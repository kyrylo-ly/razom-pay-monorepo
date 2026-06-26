import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, type MicroserviceOptions } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: "communities.v1",
      protoPath: "COMMUNITES",
      loader: {
        keepCase: false,
        longs: String,
        enums: Number,
        defaults: true,
        oneofs: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(9104);
}
bootstrap();
