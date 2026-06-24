import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { LinksService } from './links.service';
import { Link } from './links.entity';
import { CreateLinkDto } from './dto/create.link.dto';

@Controller('links')
export class LinksController {
    constructor(private linkService: LinksService) {
    }

    @Get()
    findAll() {
        return this.linkService.findAll()
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id : number) {
        return this.linkService.findOne(id)
    }

    @Post() 
    async create(@Body() dto: CreateLinkDto): Promise<Link> {
        return await this.linkService.create(dto)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param("id", ParseIntPipe) id : number) : Promise<void> {
        await this.linkService.delete(id)
    }

    @Patch(":id")
    async updateOne(@Param("id", ParseIntPipe) id : number, @Body() dto : CreateLinkDto): Promise<Link> {
        return await this.linkService.updateOne(id, dto)
    }
}
