import { Request, Response } from 'express';

class UsersController {
  async store(request: Request, response: Response) {
    return response.send('test');
  }
}

export default UsersController;
