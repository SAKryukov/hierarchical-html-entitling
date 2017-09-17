<!--
//
// Hierarchical HTML Entitling
//
// Copyright (c) Sergey A Kryukov, 2017
//
// http://www.SAKryukov.org
// http://www.codeproject.com/Members/SAKryukov
// https://github.com/SAKryukov
// https://github.com/SAKryukov/hierarchical-html-entitling
//
-->

function autoNumbering(target, prefix, top) {

    if (!top)
        top = document.body;

    function isSection(node) {
        if (!node.tagName) return false;
        return node.tagName.toLowerCase() == "section";
    } //isSection
    function isHeader(node) {
        if (!node.tagName) return false;
        return node.tagName.toLowerCase() == "header";
    } //isHeader

    function createIdAttributeValue(prefix, numbering) {
        const source = prefix + numbering;
        return source.replace(/ /g, '-')
            .replace(/[^A-Za-z0-9\-\.\_]/g, function (match) {
                return match.codePointAt().toString(16);
            }).toLowerCase();
    } // createIdAttributeValue

    function makeAnchor(node, anchorNode, text) {
        anchorNode.setAttribute("id", createIdAttributeValue(prefix, node.structureData.numbering));
        return {
            number: node.structureData.numbering,
            header: text
        };
    } //makeAnchor

    function collectData(node, prefix, delimiter) {
        const currentSet = [];
        const children = node.childNodes;
        const name = node.getAttribute("name");
        let currentIndex = 0;
        let anchor, nameAnchor, headerAnchor;
        if (isSection(node))
            if (name)
                anchor = nameAnchor = makeAnchor(node, node, name);
            else if (node.firstElementChild && isHeader(node.firstElementChild))
                anchor = headerAnchor =
                    makeAnchor(node, node.firstElementChild, node.firstElementChild.textContent);
        if (anchor)
            currentSet.push(anchor);
        const effectiveDelimiter = nameAnchor ? delimiter.header : delimiter.section;
        for (let child of node.childNodes) {
            if (node.constructor == Text) continue;
            if (isSection(child)) {
                ++currentIndex;
                let numbering = currentIndex.toString();
                if (node && node.structureData)
                    numbering = node.structureData.numbering + effectiveDelimiter + numbering;
                child.structureData = { index: currentIndex, numbering: numbering };
                currentSet.push(collectData(child, prefix, delimiter));
            } else
                continue;
        } //loop
        return currentSet;
    } //collectData

    function findDelimiter(node) {
        const defaultDelimiter = '.';
        const findDelimiterInner = function (node) {
            for (let child of node.childNodes) {
                if (node.constructor == Text) continue;
                if (isHeader(child) && isSection(child.parentNode)) {
                    const headerStyle = getComputedStyle(child, ":before").content;
                    const sectionStyle = getComputedStyle(child.parentNode, ":before").content;
                    const regex = /counters\(.*?[\'\"](.*?)[\'\"]\)/;
                    const matches = { header: regex.exec(headerStyle), section: regex.exec(sectionStyle) };
                    const delimiters = {};
                    for (let matchIndex in matches) {
                        const match = matches[matchIndex];
                        if (match)
                            delimiters[matchIndex] = match[match.length - 1];
                    } //loop matches
                    throw delimiters;
                } //if
                findDelimiterInner(child);
            } //loop
        }; //findDelimiterInner
        try {
            findDelimiterInner(node);
        } catch (delimiterSet) {
            if (!delimiterSet.header) delimiterSet.header = defaultDelimiter;
            if (!delimiterSet.section) delimiterSet.section = defaultDelimiter;
            return delimiterSet;
        } //exception
        // fall-back:
        return { header: defaultDelimiter, section: defaultDelimiter };
    } //findDelimiter

    function writeData(data, target, prefix) {
        for (let element of data) {
            if (element.constructor == Array) {
                const list = document.createElement("ul");
                target.appendChild(list);
                writeData(element, list, prefix);
            } else {
                const item = document.createElement("li");
                const url = "#" + createIdAttributeValue(prefix, element.number);
                const anchor = document.createElement("a");
                anchor.setAttribute("href", url);
                item.textContent = element.number + " ";
                anchor.textContent = element.header;
                item.appendChild(anchor);
                target.appendChild(item);
            } //if
        } //loop
    } //writeData

    (function main() {
        const delimiter = findDelimiter(top);
        const data = collectData(top, prefix, delimiter);
        writeData(data, target, prefix);
    })();

} //autoNumbering
