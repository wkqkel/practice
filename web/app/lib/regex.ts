/**
 *  username should be 5~20 alphanumeric characters
 */

export function isValidUsername(username: string) {
  return /^[a-z0-9]{5,20}$/.test(username)
}

/**
 * Should be more tahan or equal to 8 letters and contains two type minium from alphabet, numberm sepiceal character
 */

export function isValidPassword(password: string) {
  const passwordRules = [/[a-zA-Z]/, /[0-9]/, /[^A-Za-z0-9]/] // 알파벳, 숫자, 특수문자
  if (password.length < 8) return false
  const counter = passwordRules.reduce((acc, currtent) => {
    if (currtent.test(password)) {
      acc += 1
    }
    return acc
  }, 0)
  return counter > 1
}
