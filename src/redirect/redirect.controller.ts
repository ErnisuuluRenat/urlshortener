import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { LinksService } from 'links/links.service';

@Controller('')
export class RedirectController {
    constructor(private linksService: LinksService) {

    }

    @Get(":shortCode")
    @Redirect("here will be our url", 301)
    async findOne(@Param("shortCode") shortCode : string) {
        const url = await this.linksService.FindOneByShortCode(shortCode)
        return {url, statusCode: 301}
    }
}
