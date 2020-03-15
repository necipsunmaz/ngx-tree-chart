export function svgParse(name: string, attributes: Object): SVGElement {
    const element = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    return element;
}
