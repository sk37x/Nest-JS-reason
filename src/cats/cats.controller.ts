import { Controller, Bind, Get, Req, Res, Post, Put, Delete, HttpCode, Param, Body, Query, HttpStatus, HttpException, UseFilters, ForbiddenException, ParseIntPipe } from "@nestjs/common";
import { Response } from "express";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
    constructor(private catsService: CatsService) {}
    
    @Post()
    @Bind(Body())
    async create(createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        // throw new ForbiddenException();
    }

    @Get()
    async findAll() {
        try{
            return this.catsService.findAll();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message'
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });

        }
    }

    @Get(':id')
    @Bind(Param('id', ParseIntPipe))
    async findOne(id: number) {
        return this.catsService.findOne(id);
    }

    // @Get()
    // async findAll(): Promise<Cat[]> {
    //     return this.catsService.findAll();
    // }

}
