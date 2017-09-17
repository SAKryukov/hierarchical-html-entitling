## Hierarchical HTML Entitling

This contribution provides methods for entitling of HTML content, auto-numbering and automatic Table of Contents (TOC) generation. The structure of this added content is based on document hierarchy, as opposed to the approaches based on isolated non-semantic HTML elements, such as `h1`.. `h6`. In other words, the text processing is based on semantic HTML elements and their structural (parent/child) relationships. In the current implementation, it is based on the semantic element <code>section</code>, and, optionally, on its first-child element <code>header</code>.

The content entitling and auto-numbering is performed using pure CSS. On top of it, optional TOC generation is done using JavaScript matching CSS properties. This approach is a bit more difficult and flexible than pure JavaScript generation of all the added content, but its benefit is the possibility to fully exclude JavaScript if TOC is not needed.

### Usage

```
<!DOCTYPE html>
<html>
<head>
    <title>Usage</title>
    <style>
        /* This CSS file is critically important for content: */
        @import "../auto-numbering/auto-numbering.css";
        
        /* Custom styles, first of all, font-size of all nesting levels */
        header, section:before { font-weight: bold; }
        header, section:before { font-size: 140%; }
        section>header, section>section:before { font-size: 110%; }
        #toc ul { list-style-type: none; }
        #toc>ul { margin: 0; padding: 0; }
    </style>
</head>

<body>

    <h1>Contents:</h1>
    <div id="toc"><!-- TOC will be automatically added here --></div>
    <hr/>

    <section name="Some title for this section">
	<p>First entitling method: simple text title using "name" attribute.</p>
        <!-- any level of nesting: -->
        <section name="Inner">
            Some content
        </section>
    </section>

    <section>
	<header>Some <i>Formatting</i> can be <sup>used</sup></header>
	<p>Second entitling method: "heading" as first child element of a section.</p>
	<p>Some content&hellip;</p>
        <p>It's important to avoid using "name" attribute if "header" element is used.</p>
    </section>

    <script src="../auto-numbering/auto-numbering.js"></script>
    <script>
        autoNumbering(document.getElementById("toc"), "auto.toc-", document.body);
    </script>

</body>
</html>
```

For further detail and ideas, please see [the comprehensive code sample](https://sakryukov.github.io/hierarchical-html-entitling/demo/demo.html).

See the [documentation](https://sakryukov.github.io/hierarchical-html-entitling).