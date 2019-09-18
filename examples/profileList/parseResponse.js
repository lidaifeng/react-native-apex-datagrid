// @flow

import data from './data';
import type { Response } from './loadRequest';

export default function parseResponse(response: Response) {
  return {
    items: response.profiles,
    total: response.count,
  };
}
