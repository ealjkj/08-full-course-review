import express, {Response, Request} from 'express';
import  { createDb }  from './dbCreator';
import cors from "cors"

const port = 3002
const app = express();
const db = createDb(1);

app.use(cors())

app.get('/gallery/:id', (req : Request, res : Response) => {
  const {id} = req.params;
  const count = Number(req.query.count); 
  const page = Number(req.query.page); 
  
  const galleries = db.gallery
  const gallery = galleries.find(gal => String(gal.id) === id );
  
  if(!gallery) {
    return res.status(404).send({error: 'No gallery with that id'})
  }
  
  const total = gallery.images.length
  const imagesPerPage = Math.ceil(total / count); 


  const startIndex = (page - 1)*imagesPerPage
  const endIndex = Math.min(imagesPerPage*page, total);
  const images = gallery.images.slice(startIndex, endIndex);
  
  res.send({
    id,
    images,
    page,
    total 
   });

   
})

app.listen(port, () => {
  console.log(`Listening ${port}`)
})