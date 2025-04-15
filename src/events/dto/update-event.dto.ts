import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateEventDTO {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    notes: string;

    @Type(() => Date)
    @IsDate()
    start: Date;

    @Type(() => Date)
    @IsDate()
    end: Date;

}
