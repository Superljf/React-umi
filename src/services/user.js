import request from '@/utils/request';
import {stringify} from 'qs';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(payload) {
  return request('inquireCurrentAccountEmployeeInfo', {
    method: 'POST',
    body: stringify(payload)
  });
}

export async function inquireOperationCodeListAccount(payload) {
  return request('inquireOperationCodeListAccount', {
    method: 'POST',
    body: stringify(payload)
  });
}

