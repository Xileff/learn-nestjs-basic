import { Injectable } from '@nestjs/common';

// Class provider
export class Connection {
  getName(): string {
    return null;
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'MySQL';
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string {
    return 'MongoDB';
  }
}
