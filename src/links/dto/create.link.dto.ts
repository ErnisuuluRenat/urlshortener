import { OmitType } from "@nestjs/mapped-types";
import { IsUrl } from "class-validator";
import { Link } from "links/links.entity";

export class CreateLinkDto {
    @IsUrl()
    originalUrl: string
}
      