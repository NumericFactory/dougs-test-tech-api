import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {

    //@ApiTags('Home page HTML')
    @ApiExcludeEndpoint(true)
    @Get()
    MovementApiWelcome() {
        return `
        <!-- THIS THE HOME PAGE HTML -->
        <!-- GO TO localhost:3000/api -->
        <style>
        body { font-family: Arial, Helvetica, sans-serif; }
        .container { width: 720px; height: 100vh; margin: 0 auto;}
        a { color: blue; }
        .contact h3, .contact p { margin: 0; }
        </style>
        <div class="container">
            <h2>Dougs test tech SE</h2> 
            <div class="contact">
                <h3 class="m-0">Candidat : <a target="blank" href="https://www.linkedin.com/in/flossignol/">Frederic Lossignol</a></h3>
                <p>Tel :  06 88 36 22 55</p>
                <p>Email :  <a href="mailto:frederic.lossignol@gmail.com">Envoyer un Email</a></p>
            </div>
            <p>API validation de la synchronisation bancaire</p> 

            <hr>
            <p>Voir la documentation Swagger:<br>
            <a target="blank" href="/api">Lien vers la documentation de l'API</a>
            </p>
           
            <p>Voir le README.md sur github: <br>
            <a target="blank" href="https://github.com/NumericFactory/dougs-test-tech-api">Lien vers le repo github</a>
            </p>
        </div>
        `
    }
}