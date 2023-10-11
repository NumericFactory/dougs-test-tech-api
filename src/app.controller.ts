import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

    @Get()
    MovementApiWelcome() {
        return "Hello. This is the movement api validation. You can call :\n[POST] /movements/validation"
    }
}