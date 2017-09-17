## Hierarchical HTML Entitling

This contribution provides methods for entitling of HTML content, auto-numbering and automatic Table of Contents (TOC) generation. The structure of this added content is based on document hierarchy, as opposed to the approaches based on isolated non-semantic HTML elements, such as `h1`.. `h6`. In other words, the text processing is based on semantic HTML elements and their structural (parent/child) relationships. In the current implementation, it is based on the semantic element <code>section</code>, and, optionally, on its first-child element <code>header</code>.

The content entitling and auto-numbering is performed using pure CSS. On top of it, optional TOC generation is done using JavaScript matching CSS properties. This approach is a bit more difficult and flexible than pure JavaScript generation of all the added content, but its benefit is the possibility to fully exclude JavaScript if TOC is not needed.

### Usage

CSS:

```
/* This CSS file is critically important for content: */
@import "../auto-numbering/auto-numbering.css";
        
/* Custom styles, first of all, font-size of all nesting levels */
header, section:before { font-weight: bold; }
header, section:before { font-size: 140%; }
section&gt;header, section&gt;section:before { font-size: 110%; }
#toc ul { list-style-type: none; }
#toc&gt;ul { margin: 0; padding: 0; }
```

HTML body:
	
```
    &lt;h1&gt;Contents:&lt;/h1&gt;
    &lt;div id="toc"&gt;&lt;!-- TOC will be automatically added here --&gt;&lt;/div&gt;

    &lt;section name="Some title for this section"&gt;
	&lt;p&gt;First entitling method: simple text title using "name" attribute.&lt;/p&gt;
        &lt;!-- any level of nesting: --&gt;
        &lt;section name="Inner"&gt;
            Some content
        &lt;/section&gt;
    &lt;/section&gt;

    &lt;section&gt;
	&lt;header&gt;Some &lt;i&gt;Formatting&lt;/i&gt; can be &lt;sup&gt;used&lt;/sup&gt;&lt;/header&gt;
	&lt;p&gt;Second entitling method: "header" as first child element of a section.&lt;/p&gt;
	&lt;p&gt;Some content&hellip;&lt;/p&gt;
	&lt;p&gt;It's important to avoid using "name" attribute if "header" element is used.&lt;/p&gt;
    &lt;/section&gt;

    &lt;script src="../auto-numbering/auto-numbering.js"&gt;&lt;/script&gt;
    &lt;script&gt;
        autoNumbering(document.getElementById("toc"), "auto.toc-", document.body);
    &lt;/script&gt;
```

For further detail and ideas, please see [the comprehensive code sample](https://sakryukov.github.io/hierarchical-html-entitling/demo/demo.html).

See the [documentation](https://sakryukov.github.io/hierarchical-html-entitling).