import Express  from 'express';
import Path from 'path';
import { Enviroment } from '@configs/enviroment';
  
const app = Express();

app.use(Express.static('dist'));
app.use(Express.static('assets'));

app.use('*', (_req, res) => { 
    res.sendFile(Path.join(__dirname,`./../dist/index.html`));
}); 
    
app.use(((err, _req, res, _next) => {
    console.error(err);
    return res.sendFile(Path.join(__dirname,`./../dist/index.html`));
}) as Express.ErrorRequestHandler);
 
app.listen(Enviroment.Port, () => console.log(`Server is running on port ${Enviroment.Port}`));