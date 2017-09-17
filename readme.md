## Hierarchical HTML Entitling

This contribution provides methods for entitling of HTML content, auto-numbering and automatic Table of Contents (TOC) generation. The structure of this added content is based on document hierarchy, as opposed to the approaches based on isolated non-semantic HTML elements, such as `h1`.. `h6`. In other words, the text processing is based on semantic HTML elements and their structural (parent/child) relationships. In the current implementation, it is based on the semantic element <code>section</code>, and, optionally, on its first-child element <code>header</code>.

The content entitling and auto-numbering is performed using pure CSS. On top of it, optional TOC generation is done using JavaScript matching CSS properties. This approach is a bit more difficult and flexible than pure JavaScript generation of all the added content, but its benefit is the possibility to fully exclude JavaScript if TOC is not needed.

### Usage 

