const ORMConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'tutorial',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};

export default ORMConfig;
