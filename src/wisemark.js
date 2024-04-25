class WisemarkEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.parser = new WisemarkParser();
        
        this.htmlContent = this.innerHTML;
    }
    
    shadowHtml() {
        return `
            <style>
                ${this.shadowStylesheet()}
            </style>
            <div class="toolbar">
                <a href="javascript:void(0)" id="boldBtn" title="Bold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/></svg>
                </a>
                <a href="javascript:void(0)" id="italicBtn" title="Italic">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/></svg>
                </a>
                <a href="javascript:void(0)" id="linkBtn" title="Link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
                </a>
                <hr>
                <a href="javascript:void(0)" id="headingBtn" title="Heading">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>
                </a>
                <a href="javascript:void(0)" id="quoteBtn" title="Quote">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- adapted from !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path d="M48 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192Z
                             m144 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192Z
                             m0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192Z
                             M16 232v195c0 13.3 10.7 24 24 24H53c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24Z"/>
                    </svg>
                </a>
                <a href="javascript:void(0)" id="listBtn" title="List">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
                </a>
                <a href="javascript:void(0)" id="orderedListBtn" title="Ordered List">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
                </a>
                <a href="javascript:void(0)" id="horizontalRuleBtn" title="Horizontal Rule">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- adapted from !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path d="M48 225c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192Z"/>
                        <path d="M48 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192Z
                             m0 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192Z" opacity="0.3"/>
                    </svg>
                </a>
                    
            </div>
            <div id="editor" contenteditable="true">${this.htmlContent}</div>
            <textarea id="hiddenTextarea" name="markdown"></textarea>
        `;
    }
    
    shadowStylesheet() {
        return `
            :host {
                display: block;
            }
            #editor {
                min-height: 150px;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 8px;
                outline: none;
            }
            #hiddenTextarea {
                /* display: none; */
                width: 100%;
                height: 20vh;
            }
            .toolbar > a {
                display: inline-block;
                margin-right: 5px;
                margin-bottom: 5px;
                vertical-align: middle;
                
                padding: 5px;
                
                border: 1px solid #ccc;
                border-radius: 3px;
            }
            
            .toolbar > a svg {
                display: block;
                width: 1em;
                height: 1em;
            }
            
            .toolbar > hr {
                margin: 0 4px 0 0;
                display: inline-block;
                width: 1px;
                height: 0.8em;
                border: none;
                border-left: 1px solid #ccc;
                vertical-align: middle;
            }
            
            #editor > *:first-child {
                margin-top: 0;
            }
            
            #editor hr {
                margin: 1em 0;
                border: none;
                border-top: 1px solid #ccc;
            }
            
            #editor ul,
            #editor ol {
                padding-left: 20px;
            }
            
            #editor blockquote {
                margin: 1em 0;
                padding: 10px;
                border-left: 3px solid #ccc;
                background-color: #f9f9f9;
            }
        `;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.shadowHtml();

        this.editor = this.shadowRoot.querySelector('#editor');
        this.hiddenTextarea = this.shadowRoot.querySelector('#hiddenTextarea');
        this.toolbarSetup();
        this.updateTextarea();

        this.editor.addEventListener('input', () => this.processInput());
        
        this.editor.addEventListener('paste', (event) => {
            event.preventDefault();
            this.handlePaste(event);
        });
    }

    toolbarSetup() {
        this.shadowRoot.querySelector('#headingBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatHeading();
        });
        this.shadowRoot.querySelector('#boldBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatText('bold');
        });
        this.shadowRoot.querySelector('#italicBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatText('italic');
        });
        this.shadowRoot.querySelector('#linkBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.createLink();
        });
        this.shadowRoot.querySelector('#quoteBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatBlockquote();
        });
        this.shadowRoot.querySelector('#listBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatText('insertUnorderedList');
        });
        this.shadowRoot.querySelector('#orderedListBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatText('insertOrderedList');
        });
        this.shadowRoot.querySelector('#horizontalRuleBtn').addEventListener('click', (ev) => {
            ev.preventDefault();
            this.formatText('insertHorizontalRule');
        });
    }
    
    formatHeading() {
        let shadowRoot = this.shadowRoot;
        let selection = shadowRoot.getSelection();
        let range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        if (!range) {
            console.error("No selection found.");
            return;
        }

        let node = range.startContainer;
        let isHeading = false;
        
        while (node) {
            if (node.tagName && node.tagName.match(/^H[1-6]$/)) {
                isHeading = true;
                break;
            }
            node = node.parentNode;
        }
        
        document.execCommand('formatBlock', false, (isHeading ? '<p>' : '<h2>'));
        
        this.updateTextarea();
    }
    
    formatBlockquote() {
        let shadowRoot = this.shadowRoot;
        let selection = shadowRoot.getSelection();
        let range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        
        if (!range) {
            console.error("No selection found.");
            return;
        }
        
        let node = range.startContainer;
        let isBlockquote = false;
        
        while (node) {
            if (node.tagName && node.tagName === 'BLOCKQUOTE') {
                isBlockquote = true;
                break;
            }
            node = node.parentNode;
        }
        
        document.execCommand('formatBlock', false, (isBlockquote ? '<p>' : '<blockquote>'));
        
        this.updateTextarea();
    }
    
    insertUnorderedList() {
        document.execCommand('insertUnorderedList', false, null);
        this.updateTextarea();
    }
    
    insertOrderedList() {
        document.execCommand('insertOrderedList', false, null);
        this.updateTextarea();
    }
    
    insertHorizontalRule() {
        document.execCommand('insertHorizontalRule', false, null);
        this.updateTextarea();
    }

    formatText(command) {
        document.execCommand(command, false, null);
        this.updateTextarea();
    }
    
    createLink() {
        // is a link already selected? Change the URL
        const selectedLink = this.editor.querySelector('a[href]');
        if (selectedLink) {
            let newUrl = prompt("Enter the URL:", selectedLink.href);
            
            if (newUrl === null) { // abort
                this.updateTextarea();
                return;
            }
            
            if (newUrl.trim() === '') { // cleared link field
                selectedLink.outerHTML = selectedLink.innerHTML;
                
                this.updateTextarea();
                return;
            }
            
            selectedLink.href = newUrl;
            
            this.updateTextarea();
            return;
        }
        
        // selected normal text or no selection - insert a new link
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const url = prompt("Enter the URL:", "https://");

        if (!url || url === 'https://') {
            return;
        }
        
        if (selectedText) {
            document.execCommand('createLink', false, url);
        } else {
            document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${url}</a>`);
        }
        
        this.updateTextarea();
    }

    
    processInput() {
        // replace all <div> tags with <p> tags. Users can hold shift-enter to insert a line break.
        for (let div of this.editor.querySelectorAll('div')) {
            let p = document.createElement('p');
            p.innerHTML = div.innerHTML;
            div.replaceWith(p);
        }
        
        this.updateTextarea();
    }

    updateTextarea() {
        let markdown = this.parser.markdownFromDom(this.editor);
        
        this.hiddenTextarea.value = markdown;
    }
    
    handlePaste(event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text/plain');
        
        const sanitizedHTML = this.sanitizeHTML(pastedData);
        document.execCommand('insertHTML', false, sanitizedHTML);
    }
    
    sanitizeHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // List of allowed tags and their allowed attributes
        const allowedTags = ['p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'blockquote'];
        const allowedAttributes = {
            'a': ['href']
        };

        // Remove all elements not in the allowed list
        Array.from(doc.body.querySelectorAll('*')).forEach(node => {
            if (!allowedTags.includes(node.tagName.toLowerCase())) {
                node.parentNode.removeChild(node);
            } else {
                // Remove all attributes that aren't specifically allowed
                Array.from(node.attributes).forEach(attr => {
                    let allowedAttrs = allowedAttributes[node.tagName.toLowerCase()] || [];
                    if (!allowedAttrs.includes(attr.name)) {
                        node.removeAttribute(attr.name);
                    }
                });
            }
        });
        
        // finally, make sure all links contain valid URLs (must start with http(s)):
        Array.from(doc.body.querySelectorAll('a')).forEach(node => {
            if (!node.href) {
                node.outerHTML = node.innerHTML;
            }
            
            if (!node.href.match(/^https?:\/\//)) {
                node.outerHTML = node.innerHTML;
            }
        });

        return doc.body.innerHTML;
    }

}

class WisemarkParser
{
    markdownFromHtml(str) {
        let parser = new DOMParser();
        let rootNode = parser.parseFromString(htmlStrOrDomNode, 'text/html');
        return this.markdownFromDom(rootNode);
    }
    
    markdownFromDom(rootNode) {
        let markdown = "";
        
        function parseNode(node) {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE: // Handle element nodes
                    return handleElement(node);
                case Node.TEXT_NODE: // Handle text nodes
                    return node.textContent.replace(/\n/g, ' '); // Clean up new lines
                default:
                    return '';
            }
        }
        
        function handleElement(node) {
            const content = Array.from(node.childNodes).map(parseNode).join('');
            switch (node.tagName.toLowerCase()) {
                case 'p':
                    return '\n\n' + content.trim() + '\n\n';
                case 'em':
                case 'i':
                    return '*' + content.trim() + '*';
                case 'strong':
                case 'b':
                    return '**' + content + '**';
                case 'a':
                    return '[' + content + '](' + node.href + ')';
                case 'ul':
                    return content; // Handle list items within <li> tags
                case 'ol':
                    // convert unordered list to ordered list
                    let orderedListContent = content.trim().split('\n').map( (line, index) => {
                        line = line.trim();
                        line = line.replace(/^\*\s/, ''); // remove the bullet point
                        return (index+1) + '. ' + line
                    }).join('\n');
                    return orderedListContent;
                case 'li':
                    return '* ' + content.trim() + '\n';
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    const level = node.tagName.charAt(1);
                    return '\n\n' + '#'.repeat(parseInt(level)) + ' ' + content + '\n\n';
                case 'br':
                    return '  \n'; // a line break with extra spaces
                case 'hr':
                    return '\n\n---\n\n';
                case 'blockquote':
                    let lines = content.split('\n');
                    lines = lines.map( line => '> ' + line );
                    return '\n\n' + lines.join('\n') + '\n\n';
                default:
                    return content.trim(); // Default to no formatting
            }
        }

        markdown += parseNode(rootNode);
        
        // cleanup
        markdown = markdown.replace(/\n +\n/g, '\n\n'); // remove spaces on empty lines
        markdown = markdown.replace(/\n>  +/g, '\n> '); // remove spaces after blockquotes
        markdown = markdown.replace(/\n{3,}/g, '\n\n'); // remove multiple empty lines
        markdown = markdown.trim(); // remove leading/trailing spaces
        
        return markdown;
    }
}


customElements.define('wisemark-editor', WisemarkEditor);
