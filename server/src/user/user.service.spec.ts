import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

        /*
            [
    {
        "id": "683a8d17-86aa-4009-b011-3ea7d83e903b",
        "createdTimestamp": 1680702567401,
        "username": "narekpvp",
        "enabled": true,
        "totp": false,
        "emailVerified": false,
        "firstName": "Narek",
        "lastName": "Hovhannisyan",
        "email": "hnarek2005@gmail.com",
        "disableableCredentialTypes": [],
        "requiredActions": [],
        "notBefore": 0,
        "access": {
            "manageGroupMembership": true,
            "view": true,
            "mapRoles": true,
            "impersonate": false,
            "manage": true
        }
    }
]
*/