import { AsyncLocalStorage } from 'node:async_hooks';
import { Logger } from 'pino';

interface Store {
  log: Logger;
}

export const asyncLocalStorage = new AsyncLocalStorage<Store>();

export function getLogger(): Logger {
  const store = asyncLocalStorage.getStore();
  if (!store) throw new Error('No request context found');
  return store.log;
}