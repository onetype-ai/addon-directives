// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-for',
        icon: 'repeat',
        name: 'For',
        description: 'Multiply the node over an array or an iterable, each row keyed and scoped.',
        trigger: 'node',
        order: 90,
        attributes: {
            'ot-for': {
                type: 'string',
                description: 'The loop expression, row in rows, with an optional index like row, place in rows.'
            }
        },
        code: function(data, compile, node)
        {
            this.items = (expression) =>
            {
                const items = onetype.Function(expression, compile.data, false);

                if(Array.isArray(items))
                {
                    return items;
                }

                if(items && typeof items === 'object')
                {
                    return items[Symbol.iterator] ? Array.from(items) : Object.entries(items);
                }

                onetype.Error(400, 'ot-for expects an array or iterable.');

                return null;
            };

            this.key = (value, index) =>
            {
                if(value && typeof value === 'object' && 'id' in value)
                {
                    return String(value.id);
                }

                const printed = typeof value === 'object' ? JSON.stringify(value) : String(value);

                return onetype.GenerateHash(index + ':' + printed);
            };

            this.row = (value, index, shape) =>
            {
                const loopData = Object.assign({}, compile.data);

                loopData[shape.name] = value;
                loopData[shape.index] = index;

                const key = this.key(value, index);
                const compiled = compile.render.Compile(shape.html, loopData, { key });
                const source = shape.foreign ? compiled.element.firstChild : compiled.element;

                while(source.firstChild)
                {
                    this.adopt(source.firstChild, key, shape.fragment);
                }
            };

            this.adopt = (child, key, fragment) =>
            {
                if(child.nodeType === Node.ELEMENT_NODE && !child.hasAttribute('ot-key') && !child.__otExternal)
                {
                    child.setAttribute('ot-key', key);
                }

                fragment.appendChild(child);
            };

            this.multiply = (items, match) =>
            {
                const foreign = node.namespaceURI === 'http://www.w3.org/2000/svg';
                const shape = {
                    name: match[1],
                    index: match[2] ? match[2] : match[1] + '_index',
                    html: foreign ? '<svg>' + node.outerHTML + '</svg>' : node.outerHTML,
                    foreign: foreign,
                    fragment: document.createDocumentFragment()
                };

                items.forEach((value, index) => this.row(value, index, shape));

                node.before(shape.fragment);
                node.remove();
            };

            const match = data['ot-for'].value.match(/(\w+)(?:\s*,\s*(\w+))?\s+in\s+(.+)/);

            if(!match)
            {
                return onetype.Error(400, 'Invalid ot-for syntax. Expected: "row in rows".');
            }

            const paused = compile.children;

            compile.children = false;

            const items = this.items(match[3]);

            if(items)
            {
                this.multiply(items, match);
            }

            compile.children = paused;
        }
    });
});
