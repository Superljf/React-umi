import {stringify} from 'qs';
import request from '../utils/request';

export async function fileImportBatch(payload) {
  return request('fileImportBatch', {
    method: 'POST',
    body: stringify(payload, { arrayFormat: 'repeat'}),
  });
}

export async function inquireImportState(payload) {
  return request('inquireImportState', {
    method: 'POST',
    body: stringify(payload, { arrayFormat: 'repeat'}),
  });
}

export async function inquireFileImportByImportId(payload) {
  return request('inquireFileImportByImportId', {
    method: 'POST',
    body: stringify(payload),
  });
}

export async function inquireStudentListByKeyword(payload) {
  return request('inquireStudentListByKeywordTenant', {
    method: 'POST',
    body: stringify(payload),
  });
}

export async function inquireImportErrorMsg(payload) {
  return request('inquireImportErrorMsg', {
    method: 'POST',
    body: stringify(payload),
  });
}


