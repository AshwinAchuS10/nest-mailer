import { MailerService } from '@nest-modules/mailer';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { HealthIndicatorResult, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { IEmailData } from '../interfaces/email-data.interface';
import { IMailSendResponse } from '../interfaces/mail-send-response.interface';

@Controller()
export class MailerController {
  constructor(
    private db: TypeOrmHealthIndicator,
    private readonly mailerService: MailerService,
  ) { }

  @MessagePattern('ping_mailer_service')
  public async ping(): Promise<any> {
    let DATABASE_NAME = 'hq';
    let databasePingResponse: Promise<HealthIndicatorResult> = await this.db.pingCheck(DATABASE_NAME).catch(error => error);
    return {
      database: {
        status: `${DATABASE_NAME}-${databasePingResponse[DATABASE_NAME]?.status == 'up' ? 'IS_ALIVE' : 'IS_DOWN'}`
      },
      service: {
        status: `USER_SERVICE-IS_ALIVE`
      }
    };
  }

  @MessagePattern('mail_send')
  mailSend(data: IEmailData): IMailSendResponse {
    this.mailerService.sendMail(data);
    return {
      status: HttpStatus.ACCEPTED,
      message: 'mail_send_success',
    };
  }
}
