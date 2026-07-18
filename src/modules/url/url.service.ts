import { Logger } from "pino";
import { STATUS_CODES } from "../../constants/index.js";
import { NotFoundError } from "../../utils/error.js";
import UrlRepository from "./url.repository.js";
import { getLogger as defaultLogger } from "../../context.js";

class ShortenUrlService {
    constructor(
        private urlRepository: UrlRepository,
        private getLogger: () => Logger = defaultLogger
    ) {}


    async shortenUrl(fullUrl: string): Promise<string> {
    const log = this.getLogger();

        const isExist = await this.urlRepository.findUrlByField('original_url', fullUrl);
        if (isExist) {
            return isExist.short_code;
        }

        const shortUrl = await this.urlRepository.createShortUrl(fullUrl);
        log.info({ shortUrl }, 'Short URL created');

        return shortUrl;
    }

    async getFullUrl(shortCode: string): Promise<string> {
        const urlRecord = await this.urlRepository.findUrlByField('short_code', shortCode);
        if (!urlRecord) {
            throw new NotFoundError(`Short code ${shortCode} not found`);
        }
        return urlRecord.original_url;
    }
}

export default ShortenUrlService;