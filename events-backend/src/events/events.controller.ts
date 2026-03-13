import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetEventsDto } from './dto/get-events.dto';
import { RegisterEventDto } from './dto/register-event.dto';
import { EventsService, RegisterEventResponse } from './events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated events list with filters' })
  getEvents(@Query() query: GetEventsDto) {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one event by id' })
  @ApiParam({ name: 'id' })
  getEventById(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/register')
  @ApiOperation({ summary: 'Register participant for event' })
  @ApiParam({ name: 'id' })
  async registerForEvent(
    @Param('id') id: string,
    @Body() body: RegisterEventDto,
  ): Promise<RegisterEventResponse> {
    return this.eventsService.register(id, body);
  }
}
