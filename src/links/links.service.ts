import { Injectable } from '@nestjs/common';
import { Link } from './link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LinksService {
    constructor(@InjectRepository(Link)
    private linkRepository : Repository<Link>
){}
}
