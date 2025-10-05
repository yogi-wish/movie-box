
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movies/movie.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Movie],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MovieModule,
  ],
})
export class AppModule {}
