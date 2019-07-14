import { fetch } from '@/api'
// 获得电梯列表
export function getLiftList(params) {
  return fetch({
    url: '/auth-server/manage/lift/list',
    method: 'GET',
    params
  });
}

// 编辑电梯
export function editLiftInfo(params) {
  return fetch({
    url: '/auth-server/manage/lift/edit',
    method: 'POST',
    data: {
      ...params
    }
  });
}

// 登录
export function login(params) {
  return fetch({
    url: '/back/login',
    method: 'POST',
    data: {
      ...params
    }
  });
}


// 商品列表
export function goodsList(params) {
  return fetch({
    url: '/back/goods/list',
    method: 'GET',
    params
  });
}

// 商品新增
export function goodsEdit(params) {
  return fetch({
    url: '/back/goods/save',
    method: 'POST',
    data: {
      ...params
    }
  });
}

// 商品删除
export function goodsDel(params) {
  return fetch({
    url: '/back/goods/delete',
    method: 'POST',
    data: {
      ...params
    }
  });
}

// 订单列表
export function orderList(params) {
  return fetch({
    url: '/back/order/list',
    method: 'POST',
    data: {
      ...params
    }
  });
}