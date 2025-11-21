export function isJson(str: any) {
  let extract: any
  try {
    extract = JSON.parse(str)
  } catch (e) {
    return false
  }
  return extract ? true : false
}

/**
 *
 * @param {*} str data string json
 * @returns
 */
export function stringToJSON(str: string, def = '') {
  let result: string

  try {
    result = JSON.parse(str)
  } catch (e) {
    result = def
  }

  return result
}
/**
 *
 * @param {*} str data string json
 * @returns
 */
export function JSONtoString(json: any) {
  let result = ''

  try {
    result = JSON.stringify(json)
  } catch (e) {
    result = 'false'
  }

  return result
}
/** JSON RESETTER */
export function JSONResetter(json: any) {
  return stringToJSON(JSONtoString(json))
}
