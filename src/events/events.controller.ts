import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';
import { NewEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { Request as RequestExpress } from 'express';

@Controller('events')
@UseGuards(AuthGuard())
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(
    @Body() newEventDTO: NewEventDTO,
    @Request() req: any
  ) {
    return this.eventsService.create(newEventDTO, req.user);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDTO,
    @Request() req: any) {
    return this.eventsService.update(id, updateEventDto,req);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: any) {
    
    return this.eventsService.remove(id,req);
  }
}
