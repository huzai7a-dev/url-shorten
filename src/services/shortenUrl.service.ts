import { AppError } from "../utils/error.js";
import UrlRepository from "../repository/url.repository.js";
import { encodeBase62 } from "../lib/base62.js";

class ShortenUrlService {
    async shortenUrl(fullUrl: string): Promise<string> {
        const isExist = await UrlRepository.prototype.findUrlByField('original_url', fullUrl);
        if (isExist) {
            return isExist.short_code;
        }

        const id = await UrlRepository.prototype.storeFullUrl(fullUrl);
        const shortUrl = encodeBase62(id);
        await UrlRepository.prototype.mapShortUrlToFullUrl(id, shortUrl);
        return shortUrl;
    }
}

export default ShortenUrlService;