
import { DataSource } from "typeorm";
import { User } from "./src/users/user.entity";
import { Movie } from "./src/movies/movie.entity";

export default new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Movie],
});
