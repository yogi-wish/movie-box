"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/users/user.entity");
const movie_entity_1 = require("./src/movies/movie.entity");
exports.default = new typeorm_1.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User, movie_entity_1.Movie],
});
//# sourceMappingURL=ormconfig.js.map