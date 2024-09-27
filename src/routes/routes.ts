import { Router } from 'express';
import { MediaController } from '../controllers/controller';
import multer from 'multer';
import * as path from 'path';

const router = Router();
const mediaController = new MediaController();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', mediaController.getAllMediaInfo);
router.post('/', upload.single('media'), mediaController.uploadMedia);
router.put('/:id', upload.single('media'), mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.get('/:id', mediaController.getMedia);

export default router;