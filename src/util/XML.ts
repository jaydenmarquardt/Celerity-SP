/**
 * Will return a value from an XML Tag
 * */
export function getXMLAttrStartFinish(
  xmlText: string,
  attr: string,
  attrend: string
): string {
  return xmlText.substr(
    xmlText.indexOf('<' + attr + '>') + ('<' + attr + '>').length,
    xmlText.indexOf('</' + attrend + '>') -
      ('<' + attr + '>').length -
      xmlText.indexOf('<' + attr + '>')
  );
}

/**
 * Will return a value from an XML Tag
 * */
export function getXMLAttr(xmlText: string, attr: string): string {
  return xmlText.substr(
    xmlText.indexOf('<' + attr + '>') + ('<' + attr + '>').length,
    xmlText.indexOf('</' + attr + '>') -
      ('<' + attr + '>').length -
      xmlText.indexOf('<' + attr + '>')
  );
}
