import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NewEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { User } from 'src/auth/entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {

  constructor(
    @InjectModel(Event.name)
    private readonly eventRepository: Model<Event>
  ) { }

  async create(newEventDTO: NewEventDTO, user: User) {

    const { title, notes, start, end } = newEventDTO;

    const newEvent = await this.eventRepository.create({
      title, notes, start, end, user
    })
    if (!newEvent) throw new BadRequestException({
      "ok": false,
      "msg": "Hubo un problema.Acuda al administrador"
    })
    return {
      "ok": true,
      "event": newEvent
    }
  }

  async findAll() {

    return {
      "ok": true,
      "events": await this.eventRepository.find()
        .select('-__v')
        .populate({ path: 'user', select: '-__v' })
    }
  }

  async findOne(id: string) {
    const event = await this.eventRepository
      .findById(id)

    if (!event) throw new NotFoundException({
      "ok": false,
      "message": "No existe un evento con este ID"
    })
    return {
      "ok": true,
      "event": event
    };
  }

  async update(id: string, updateEventDto: UpdateEventDTO, { user }) {


    const event = await this.findOne(id);
    const authId = user._id.toString();
    const userEventId = event.event.user.toString();
    if (authId != userEventId) {
      throw new UnauthorizedException({
        "ok": false,
        "message": "Usted no tiene los permisos adecuados"
      })
    }
    const newEvent = await this.eventRepository.findByIdAndUpdate(event.event._id,{...updateEventDto});

    return {
      "ok": true,
      "message": "El evento ha sido actualizado correctamente"
    }

  }

  async remove(id: string,{user}) {

   
    const event = await this.findOne(id);
  
    const authId = user._id.toString();
    const userEventId = event.event.user.toString();
    if (authId !== userEventId) {
      throw new UnauthorizedException({
        "ok": false,
        "message": "Usted no tiene los permisos adecuados"
      })
    }
    const deleted = await this.eventRepository.findByIdAndDelete({ _id: id })
    if (!deleted) {
      throw new NotFoundException({
        "ok": false,
        "message": "El elemento fué eliminado"
      })
    }

    return {
      "ok": true,
      "message": 'El evento ha sido eliminado.'
    }
  }
}
