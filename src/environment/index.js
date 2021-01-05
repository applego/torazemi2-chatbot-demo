// const config = require('./_' + process.env.NODE_ENV);
// process.env.NODE_ENV の設定一旦飛ばし
const config = require('./_development');


export default class Environment{
  static get SLACK_INCOMING_WEBHOOK_URL() {
    return config.SLACK_INCOMING_WEBHOOK_URL;
  }
}

// 使用例
// import env from '../environment/index';
// const FETCH_API = env.SLACK_INCOMING_WEBHOOK_URL + 'user/articles';
