import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getAllLinkFromWebsite(@Query('website') website) {
    return this.appService.getLinkFromWebsite('https://' + website);
  }
}
