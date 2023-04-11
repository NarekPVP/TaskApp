import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'
import { DatabaseModule } from './database/database.module';
import { PassportModule } from '@nestjs/passport';
import { KeycloakConnectModule, KeycloakConnectOptions } from 'nest-keycloak-connect';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    KeycloakConnectModule.registerAsync({
      useFactory: (): KeycloakConnectOptions => ({
        authServerUrl: 'http://localhost:8080/auth',
        realm: 'app-realm',
        clientId: 'client',
        secret: 'RWRrsPQ6ZTMBnCTobDhpnkdz6cY4F46Z',
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required()
      }),
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Chat]),
    DatabaseModule,
    TasksModule
  ],
  controllers: [AppController, UserController, ChatController],
  providers: [AppService, UserService, ChatService, AppGateway],
})
export class AppModule {}