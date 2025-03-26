import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'dr. appt mgmnt server is running!';
  }
}
