import { Connection } from '../connection/connection';

// Misalnya ini library luar, jadi ga bisa di @Injectable
export class UserRepository {
  connection: Connection;

  save() {
    console.info(`save user with connection : ${this.connection.getName()}`);
  }
}

// Factory provider dibuat supaya bisa inject value dari luar
export function createUserRepository(connection: Connection): UserRepository {
  const repository = new UserRepository();
  repository.connection = connection;
  return repository;
}
