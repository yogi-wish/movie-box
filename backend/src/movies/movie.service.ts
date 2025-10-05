
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  create(data: Partial<Movie>) {
    const m = this.repo.create(data);
    return this.repo.save(m);
  }

  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.repo.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const m = await this.repo.findOneBy({ id });
    if (!m) throw new NotFoundException('Movie not found');
    return m;
  }

  async update(id: number, data: Partial<Movie>) {
    const m = await this.findOne(id);
    Object.assign(m, data);
    return this.repo.save(m);
  }

  async remove(id: number) {
    const m = await this.findOne(id);
    return this.repo.remove(m);
  }
}
