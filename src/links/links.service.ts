import { Injectable, NotFoundException } from '@nestjs/common';
import { Link } from './links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create.link.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async findAll(): Promise<Link[]> {
    const links = await this.linkRepository.find()
    return links
  }

  async findOne(id : number): Promise<Link> {
    const link = await this.linkRepository.findOneBy({id})

    if (!link) {
      throw new NotFoundException(`Link with id ${id} not found`)
    }

    return link
  }

  async FindOneByShortCode(shortCode: string): Promise<string> {
    const link = await this.linkRepository.findOneBy({shortCode})

    if (!link) {
      throw new NotFoundException(`Link with that shortCode:${shortCode} is not existed`)
    }

    const {originalUrl} = link
    return originalUrl
  }

  async create(originalUrl: string): Promise<CreateLinkDto>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ''

    for (let i = 0; i< 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const newLink = {
      originalUrl: originalUrl,
      shortCode: result,
    }

    await this.linkRepository.save(newLink)

    return newLink
  }

  async delete(id: number) : Promise<void> {
    const link = await this.linkRepository.findOneBy({id})

    if (!link) {
      throw new NotFoundException(`Link with id:${id} not found`)
    }

    await this.linkRepository.delete(id)
  }

  async updateOne(id: number, originallUrl: string) : Promise<Link>{
    const link = await this.linkRepository.preload({
      id: id,
      originalUrl: originallUrl
    })

    if (!link) {
      throw new NotFoundException(`Link with id:${id} not found`)
    }

    return await this.linkRepository.save(link)
  }
}
