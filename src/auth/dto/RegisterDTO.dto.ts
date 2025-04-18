import { PartialType } from "@nestjs/mapped-types";
import { IsString, MinDate, MinLength } from "class-validator"
import { LoginDTO } from "./LoginDTO.dto";

export class RegisterDTO  {

    @IsString()
    @MinLength(5,{message:"Name tiene que ser mayor a 5 carácteres"})
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

}
