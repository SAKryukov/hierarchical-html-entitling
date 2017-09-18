## Hierarchical HTML Entitling

This contribution provides methods for entitling of HTML content, auto-numbering and automatic Table of Contents (TOC) generation. The structure of this added content is based on document hierarchy, as opposed to the approaches based on isolated non-semantic HTML elements, such as `h1`.. `h6`. In other words, the text processing is based on semantic HTML elements and their structural (parent/child) relationships. In the current implementation, it is based on the semantic element <code>section</code>, and, optionally, on its first-child element <code>header</code>.

The content entitling and auto-numbering is performed using pure CSS. On top of it, optional TOC generation is done using JavaScript matching CSS properties. This approach is a bit more difficult and flexible than pure JavaScript generation of all the added content, but its benefit is the possibility to fully exclude JavaScript if TOC is not needed.

### Document Structure

Traditional HTML approach of breaking of the documents into semantic parts, chapters, sections and similar units, is mostly based on headings elements `h1`.. `h6`. Most of the HTML document processing tools are also based on this approach. This approach is minimalistic and can be most convenient in many cases. After all, in many texts, structure is not the most important thing.

In many other cases, typically, in scientific and technical literature, structure is critically important, by many reasons. At the same time, the document structure is totally insensitive to the heading levels: if the number following "h" in HTML tags is typed incorrectly, the HTML processing software won't detect it. If the selection of heading levels is broken, the semantic structure of the document will likely be broken, undetected. 

HTML5 introduced new elements to be used to express semantic structure of documents, but even then, HTML code samples published around very typically use the same `h1`.. `h6` elements. Now, if document sections are organized hierarchically, software can easily detect inconsistencies between heading levels and actual structure and somehow report it.

But why? Instead, isn't it better to generate headings out of sections, using some HTML attributes/elements which don't include level information? It can be extracted from the structure itself. Only then the [single source of truth principle](https://en.wikipedia.org/wiki/Single_source_of_truth) will be observed.

### Automatic Generation of Headings and Auto-Numbering

This behavior is fully defined by CSS. The processing handles only the `section` elements, which can have arbitrary level of nesting.

The CSS implementation utilizes two alternative ways of setting the text for section heading: 1) attribute `name` of the `section`, 2) first element child of the `section` can be `header`. Note that the second approach allows for HTML markup inside the heading.

For example:

```
<!-- first approach: -->
<section name="Some Chapter Name">
    <p>Some content...</p>
</section>
```

The second approach requires `header` element as the first element child of `section`. Note that first element does not mean first child. First child DOM node of a section can be a text node, which is not taken into account. Typically it is an empty text node, which can be included or not included in DOM — it depends on the browser implementation. Here is the example:

```
<!-- second approach: -->
<section>
    <header>Some <big>S</big>ection</header> <!-- this form allows inner HTML formatting -->
    <p>Some other content...</p>
</section>
```

The heading content is extracted from the `name` attributes and/or `header` elements and added to the DOM. In addition to that, these heading elements are auto-numbered.

Complete implementation if found in a single CSS file, [auto-numbering.css](auto-numbering/auto-numbering.css). It defines only the core functionality and does not affect detail of visual rendering of sections and headings. To refine those details, document needs to add its own CSS. Please see this [comprehensive HTML code sample](demo/demo.html) for further detail and ideas. 

### Automatic TOC Generation

This step is based on JavaScript and is optional. However, in most cases, auto-numbered structural content is pretty much pointless without TOC.

The TOC generation is implemented in a single JavaScript file: [auto-numbering.js](auto-numbering/auto-numbering.js). HTML file only needs a single JavaScript call, for example:

```
<script src="../auto-numbering/auto-numbering.js"></script>
<script>
    autoNumbering(document.getElementById("toc"), "auto.toc-", document.body);
</script>
```

This example shows that three parameters are passed to the call to the function `autoNumbering(target, prefix, top)`:

* `target`: HTML element to be used as a container for TOC, such as `div` or `p`.
* `prefix`: a string used to prefix the values of `id` attributes used for navigation.
    This parameter is quite important, to prevent name clashed between `id` values, which should be unique in the scope of an HTML file.
* `top` (optional parameter): HTML element representing a container element for the entire document structure to be parsed. If omitted, `top` defaults to `document.body`, which would be the most typical case.
