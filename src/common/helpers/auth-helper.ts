import { AuthSession, AuthSessionKey } from '../../types/auth';

export class AuthHelper {
  /**
   * 生成用户信息key
   *
   * 用户登录后，在登录方法中，把用户详细信息放入redis
   * 生成sessionKey的字段全部放入payload，用于jwt签名
   */
  static sessionKey(payload: AuthSessionKey) {
    const keys = [payload.type, payload.key, payload.id.toString()];
    return keys.join('::');
  }

  static isAdmin(user: AuthSession) {
    return user.role === '1';
  }
}
