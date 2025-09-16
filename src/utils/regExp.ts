/* eslint-disable */
/**
 * id 조건 영문,숫자 조합 5~16자리
 */
export function isId(id: string) {
  const regExp = /^[0-9a-zA-Z]{5,16}$/;

  return regExp.test(id);
}

/**
 * pw 조건 영문,숫자 조합 5~16자리
 */
export function isPw(pw: string) {
  const regExp = /^[0-9a-zA-Z]{5,16}$/;

  return regExp.test(pw);
}

/**
 * 이름 (한글만 확인)
 */
export function isName(pw: string) {
  const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  return regExp.test(pw);
}

/**
 * 이메일(계정ID) 양식 확인
 */
export function isEmail(email: string) {
  const regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return regExp.test(email);
}

/**
 * 특수문자 제거
 */
export function delSpecialChar(originalString: string) {
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  return originalString.replace(reg, '');
}
