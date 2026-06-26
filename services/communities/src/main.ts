import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, type MicroserviceOptions } from "@nestjs/microservices";
import { PROTO_PATHS } from "@razom-pay/contracts";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ["auth.v1", "account.v1"],
      protoPath: [PROTO_PATHS.AUTH, PROTO_PATHS.ACCOUNT],
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
