import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Link } from './links/link.entity';
import { LinksModule } from './links/links.module';
import { LinksService } from 'links/links.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: [Link],
      synchronize: true
    }),
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService, LinksService],
})
export class AppModule {}
