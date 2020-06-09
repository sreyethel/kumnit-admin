import * as _ from 'lodash';
import * as moment from 'moment';
import { crimeStatus } from './data';

export function toNumber(value: any) {
    if (value === null || value === undefined || value === "") {
        return 0;
    }
    if (Number(value) === NaN) return 0;
    return Number(value);
}

export function toNull(value: any) {
    if (value === "" || value === undefined) {
        return null;
    }
    return value;
}

export function caseStatus(itemKey: any) {
    if(itemKey){
        return {
            pending: itemKey === crimeStatus.pending.key ? 1 : 0,
            complete: itemKey === crimeStatus.complete.key ? 1 : 0,
            close: itemKey === crimeStatus.close.key ? 1 : 0,
        };
    }else{
        return {
            pending: 0,
            complete: 0,
            close: 0,
        };
    }
    
}

export function updatedArrayItem(data: Array<any>, newItem: any) {
    const exist = data.filter(m => m.key === newItem.key);
    if (exist && exist.length > 0) {
      const index = data.findIndex((obj => obj.key == newItem.key));
      data[index] = newItem;
    } else {
      data.push(newItem);
    }
    return data;
  }

export function orderBy(data: Array<any>, field: string) {
    return _.orderBy(data, [field])
}

export function orderByDesc(data: Array<any>, field: string) {
    return _.orderBy(data, [field], ['desc'])
}

export function pageKey() {
    return Number(moment().format('YYYYMMDDHHmmss'))
}

export function toDateKey(date: Date) {
    return Number(moment(date).format('YYYYMMDD'))
}

export function toMonthKey(date: Date) {
    const dateKey = moment(date).format('YYYYMM');
    return dateKey.toString();
}

export function toYearKey(date: Date) {
    const dateKey = moment(date).format('YYYY');
    return dateKey.toString();
}

export function addressObj(item: any) {
    const obj = toNull(item)
    if (obj) {
        return {
            key: item.key,
            id: toNull(item.id),
            house_nr: toNull(item.house_nr),
            street: toNull(item.street),
            resident_type: toNull(item.resident_type),
            CitizenId: toNull(item.CitizenId),
            village: toNull(item.village),
            commune: toNull(item.commune),
            district: toNull(item.district),
            province: toNull(item.province),
        };
    } else return null;
}