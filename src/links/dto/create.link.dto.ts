import { Link } from "links/link.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateLinkDto extends OmitType(Link, ["id", 'createdAt']) {}