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

function autoSizeHeadings(min, max, levels, headerTagSelector) { // min, max: numbers in % units

    if (max < min) return;
    if (!levels || levels < 1) return;
    const step = levels > 1 ? (max - min) / (levels - 1) : 0;
    const ruleSet = [];

    for (let index = 0; index < levels; ++index) {
        const rule = {};
        const size = max - index * step;
        rule.section = "section:before {font-size:" + size + "%}";
        rule.header = "section>header {font-size:" + size + "%}";
        for (let level = 0; level < index; ++level) {
            rule.section = "section>" + rule.section;
            rule.header = "section>" + rule.header;
        } //loop
        ruleSet.push(rule);
    } //loop

    (function setStyles(){
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        styleSheet = styleElement.sheet;
        for (let rule of ruleSet) {
            styleSheet.insertRule(rule.section, 0);    
            styleSheet.insertRule(rule.header, 0);    
        } //loop
        if (headerTagSelector)
            styleSheet.insertRule(headerTagSelector + " {font-size:" + max + "%}", 0);
    })();

} //autoSizeHeadings