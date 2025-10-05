
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MoviesService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

@Controller('movies')
export class MoviesController {
  constructor(private svc: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = `${Date.now()}-${uuidv4()}${extname(file.originalname)}`;
          cb(null, unique);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(@UploadedFile() file: any, @Body() body: CreateMovieDto, @Req() req: Request) {
    const posterPath = file ? `/uploads/${file.filename}` : null;
    return this.svc.create({ title: body.title, publishingYear: body.publishingYear, posterPath });
  }

  @Get()
  async list(@Query('page') page = '1', @Query('limit') limit = '10') {
    const p = parseInt(page as string, 10) || 1;
    const l = parseInt(limit as string, 10) || 10;
    const [items, total] = await this.svc.findAll(p, l);
    return { items, total, page: p, limit: l };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = `${Date.now()}-${uuidv4()}${extname(file.originalname)}`;
          cb(null, unique);
        },
      }),
    }),
  )
  async update(@Param('id') id: string, @UploadedFile() file: any, @Body() body: Partial<CreateMovieDto>) {
    const posterPath = file ? `/uploads/${file.filename}` : undefined;
    return this.svc.update(Number(id), {
      ...(body.title ? { title: body.title } : {}),
      ...(body.publishingYear ? { publishingYear: Number(body.publishingYear) } : {}),
      ...(posterPath !== undefined ? { posterPath } : {}),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.svc.remove(Number(id));
  }
}
