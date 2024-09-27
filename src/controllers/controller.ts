import { Request, Response } from 'express';
import { MediaService } from '../services/service';
import * as path from 'path';

const mediaService = new MediaService();

export class MediaController {
    async uploadMedia(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const { filename, mimetype } = req.file;
            const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

            const media = await mediaService.saveMedia({
                filename,
                mimetype,
                path: filePath,
            });

            res.status(201).json(media);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error uploading file' });
        }
    }

    async getMedia(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const media = await mediaService.getMediaById(id);

            if (!media) {
                return res.status(404).json({ message: 'Media not found' });
            }

            res.sendFile(media.path);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving file' });
        }
    }

    async getAllMediaInfo(req: Request, res: Response) {
        try {
            const media = await mediaService.getAllMediaInfo();
            res.status(200).json(media);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving media info' });
        }
    }

    async deleteMedia(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const media = await mediaService.getMediaById(id);

            if (!media) {
                return res.status(404).json({ message: 'Media não encontrada' });
            }

            const updatedMedia = await mediaService.deleteMedia(id);
            res.status(200).json({message: 'Media deletada com sucesso'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting media' });
        }
    }

    async updateMedia(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const media = await mediaService.getMediaById(id);

            if (!media) {
                return res.status(404).json({ message: 'Media not found' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const { filename, mimetype } = req.file;
            const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

            const updatedMedia = await mediaService.updateMedia(id, {
                filename,
                mimetype,
                path: filePath,
            });

            res.status(200).json(updatedMedia);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating media' });
        }
    }
}