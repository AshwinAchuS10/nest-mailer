import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { MailerController } from '../controllers/mailer.controller';
import { MailerConfigService } from '../config/mailer-config.service';
import { ConfigService } from '../config/config.service';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfigService,
    }),
  ],
  providers: [ConfigService, TypeOrmHealthIndicator],
  controllers: [MailerController],
})
export class AppMailerModule { }
