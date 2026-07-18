import { getLogger } from "../../context.js";
import { pool } from "../../db/pool.js";
import UrlRepository from "./url.repository.js";
import ShortenUrlService from "./url.service.js";

export const urlRepository = new UrlRepository(pool);
export const shortenUrlService = new ShortenUrlService(urlRepository, getLogger);