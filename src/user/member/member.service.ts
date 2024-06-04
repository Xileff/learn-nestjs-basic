import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
  // Get provider manually using ModuleRef, must make sure the providers are not null
  constructor(private moduleRef: ModuleRef) {}

  getConnectionName(): string {
    const connection = this.moduleRef.get(Connection);
    return connection.getName();
  }

  sendEmail() {
    const mailService = this.moduleRef.get(MailService);
    mailService.send();
  }
}
