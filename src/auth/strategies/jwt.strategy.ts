import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/usuario.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Logger, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "../helpers/encriptar.helpers";



export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        configService: ConfigService
    ) {
        super(
            {
                secretOrKey: jwtConstants().JWT_TOKEN,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            });
    }

    async validate(payload: JwtPayload) {

        const { email, name } = payload;
        const user = await this.userModel.findOne({ email })
        if (!user) throw new UnauthorizedException('Usuario no existe')
        return user as User;
    }

}