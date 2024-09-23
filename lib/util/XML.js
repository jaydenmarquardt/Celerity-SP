/**
 * Will return a value from an XML Tag
 * */
export function getXMLAttrStartFinish(xmlText, attr, attrend) {
    return xmlText.substr(xmlText.indexOf('<' + attr + '>') + ('<' + attr + '>').length, xmlText.indexOf('</' + attrend + '>') -
        ('<' + attr + '>').length -
        xmlText.indexOf('<' + attr + '>'));
}
/**
 * Will return a value from an XML Tag
 * */
export function getXMLAttr(xmlText, attr) {
    return xmlText.substr(xmlText.indexOf('<' + attr + '>') + ('<' + attr + '>').length, xmlText.indexOf('</' + attr + '>') -
        ('<' + attr + '>').length -
        xmlText.indexOf('<' + attr + '>'));
}
//# sourceMappingURL=XML.js.map