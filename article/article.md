Hierarchical HTML Entitling, Auto-Numbering and TOC Generation[](title)

[*Sergey A Kryukov*](https://www.SAKryukov.org)

A pure Web browser application as a tool for advanced music harmony study in different tone systems 

<!-- copy to CodeProject from here ------------------------------------------->

## Contents[](notoc)

## Introduction

This is another contribution related to the preparation of publications.

This time, it offers alternative way of processing HTML document structure to generated titles, auto-number them and, optionally, also add auto-generated Table of Contents (TOC). All this behavior is based on pure CSS, but TOC generation requires JavaScript.

## Motivation

???

Traditional HTML approach of breaking of the documents into semantic parts, chapters, sections and similar units, is mostly based on headings elements `h1`.. `h6`. Most of the HTML document processing tools are also based on this approach. This approach is minimalistic and can be most convenient in many cases. After all, in many texts, structure is not the most important thing.

In many other cases, typically, in scientific and technical literature, structure is critically important, by many reasons. At the same time, the document structure is totally insensitive to the heading levels: if the number following "h" in HTML tags is typed incorrectly, the HTML processing software won't detect it. If the selection of heading levels is broken, the semantic structure of the document will likely be broken, undetected. 

HTML5 introduced new elements to be used to express semantic structure of documents, but even then, HTML code samples published around very typically use the same `h1`.. `h6` elements. Now, if document sections are organized hierarchically, software can easily detect inconsistencies between heading levels and actual structure and somehow report it.

But why? Instead, isn't it better to generate headings out of sections, using some HTML attributes/elements which don't include level information? It can be extracted from the structure itself. Only then the [single source of truth principle](https://en.wikipedia.org/wiki/Single_source_of_truth) will be observed.


[](toc)

<!-- copy to CodeProject to here --------------------------------------------->
