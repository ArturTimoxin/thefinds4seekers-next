import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
// import { Req, Res } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
// import { Request, Response } from 'express';
import { PointsService } from './points.service';
import { Point } from './interfaces/point.interface';

@Controller('points')
export class PointsController {

    constructor(private readonly pointsService: PointsService) {}

    @Get()
    findAll(): Promise<Point[]> {
        return this.pointsService.findAll();
    }

    // @Get()
    // findAll(@Req() req: Request, @Res() res: Response): Response {
    //     // можно исп. объекты resp req как и в express
    //     return res.send('TESST REQ');
    // }

    // или такая запись

    @Get(':id')
    findOne(@Param('id') id): Promise<Point> {
        return this.pointsService.findOne(id);
    }

    @Post()
    create(@Body() createPointDto: CreatePointDto): Promise<Point> {
        return this.pointsService.create(createPointDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Point> {
        return this.pointsService.delete(id);
    }

    @Put(':id')
    update(@Body() updatePointDto: CreatePointDto, @Param('id') id): Promise<Point> {
        return this.pointsService.update(id, updatePointDto);
    }
}
