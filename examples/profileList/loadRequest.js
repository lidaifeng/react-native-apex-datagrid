// @flow

import data from './data';

export type Profile = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export type Response = {
  profiles: Array<Profile>,
  count: number,
};

let i = 0;

// 模拟网络请求
export default function loadRequest(page: number, size: number = 10): Promise<Response> {
  const start = Math.max(page - 1, 0) * size;
  const end = start + size;
  const profiles = data.slice(start, end);
  const count = data.length;

  return new Promise((resolve, reject) => {
    // setTimeout(() => resolve({ profiles, count }), 500);
    setTimeout(() => {
      if (i >= 2) {
        resolve({ profiles, count });
        return;
      }
      reject('网络不可用');
      i++;
    }, 500);
  });
}
