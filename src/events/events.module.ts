import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { EventSchema } from './entities/event.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [EventsController],
  imports: [
    ConfigModule,
       AuthModule,
      PassportModule,
      MongooseModule.forFeature([
        { name: Event.name, schema: EventSchema }       
    ]),

  ],
  providers: [EventsService
  ],
})
export class EventsModule { }
