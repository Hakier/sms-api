import { Controller, Get } from '@nestjs/common';
import { AppInfo, InfoService } from './info.service';

@Controller('')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  public getInfo(): AppInfo {
    return this.infoService.appInfo;
  }
}
