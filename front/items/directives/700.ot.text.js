// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-text',
        icon: 'text_fields',
        name: 'Text',
        description: 'Fill every moustache in a text node from the data.',
        trigger: 'node',
        order: 700,
        type: '3',
        code: function(data, compile, node)
        {
            this.print = (result) =>
            {
                if(result === null || result === undefined)
                {
                    return '';
                }

                if(['boolean', 'number', 'string'].includes(typeof result))
                {
                    return result;
                }

                const stringified = result.toString();

                return stringified === '[object Object]' ? '{{' + typeof result + '}}' : stringified;
            };

            this.resolve = (expression) =>
            {
                try
                {
                    return this.print(onetype.Function(expression, compile.data, false));
                }
                catch(error)
                {
                    return '{{Error: ' + error.message + '}}';
                }
            };

            if(!/\{\{.*\}\}/.test(node.textContent))
            {
                return;
            }

            node.textContent = node.textContent.replace(/\{\{\s*([^}]+)\s*\}\}/g, (whole, expression) => this.resolve(expression));
        }
    });
});
