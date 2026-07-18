// Route definitions and handlers will go here
import z from 'zod'
import { Router, Request, Response } from 'express'
import { validationRequest } from '../../middleware/validateRequest.js'
import { shortenUrlService } from './index.js'


const urlRoutes =  Router()

const ShortenUrlSchema = z.object({
    fullUrl: z.string().url().max(2048, { message: "URL is too long" }) // TODO: validate if the url is valid to be redirected using res.redirect
}).strict()


type ShortenUrlBody = z.infer<typeof ShortenUrlSchema>

urlRoutes.post('/shorten', validationRequest(ShortenUrlSchema), async (req: Request<{}, {}, ShortenUrlBody>, res: Response) => {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const shortenedUrl = await shortenUrlService.shortenUrl(req.body.fullUrl);

        req.log.info({ shortenedUrl }, 'URL shortened successfully');

        return res.status(200).json({ shortenedUrl: `${baseUrl}/api/${shortenedUrl}` });
})

urlRoutes.get('/:shortCode', async (req: Request, res: Response) => {

    // validate shortCode is a valid base62 string
    const shortCode = req.params.shortCode;
    if (!/^[0-9a-zA-Z]+$/.test(shortCode)) {
        return res.status(400).json({ message: 'Invalid short code' });
    }

    const fullUrl = await shortenUrlService.getFullUrl(req.params.shortCode);
    
    req.log.info({ shortCode, fullUrl }, 'Redirecting to full URL');
    return res.redirect(fullUrl);
})

export default urlRoutes