
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async seedDefault() {
    const admin = await this.findByEmail('admin@example.com');
    if (!admin) {
      const user = this.repo.create({
        email: 'admin@example.com',
        password: await bcrypt.hash('password', 10),
      });
      await this.repo.save(user);
      console.log('Seeded user: admin@example.com / password');
    }
  }
}
