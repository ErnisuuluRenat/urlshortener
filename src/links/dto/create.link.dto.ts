import { Link } from "links/links.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateLinkDto extends OmitType(Link, ["id", 'createdAt']) {}