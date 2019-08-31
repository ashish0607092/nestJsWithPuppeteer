import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { LAUNCH_CONFIG } from './config/puppeteer.config';
@Injectable()
export class AppService {
  async getLinkFromWebsite(website: string) {
    const browser = await puppeteer.launch(LAUNCH_CONFIG);
    const page = await browser.newPage();
    await page.goto(website);
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    await browser.close();
    // tslint:disable-next-line: max-line-length
    const links = hrefs
      .filter((v, i) => hrefs.indexOf(v) === i)
      .filter(url => url !== 'javascript:void();')
      .filter(url => url !== 'javascript:void(0);')
      .filter(url => url !== '')
      .filter(url => (url.includes('https') && url.includes('http')));
    return {
      links,
      length: links.length,
    };
  }
}
