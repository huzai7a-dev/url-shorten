// Route definitions and handlers will go here
import { Router, Request, Response } from 'express'
import { validationRequest } from '../middleware/validateRequest.js'
import z from 'zod'
import ShortenUrlService from '../services/shortenUrl.service.js'

const router =  Router()

const ShortenUrlSchema = z.object({
    fullUrl: z.string().url()
})

type ShortenUrlBody = z.infer<typeof ShortenUrlSchema>

router.post('/shorten', validationRequest(ShortenUrlSchema), async (req: Request<{}, {}, ShortenUrlBody>, res: Response) => {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const shortenedUrl = await ShortenUrlService.prototype.shortenUrl(req.body.fullUrl);
        return res.status(200).json({ shortenedUrl: `${baseUrl}/${shortenedUrl}` });
})

export default router