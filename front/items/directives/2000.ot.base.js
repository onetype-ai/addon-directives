// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('directives', function(directives)
{
    directives.ItemAdd({
        id: 'ot-base',
        icon: 'link',
        name: 'Base',
        description: 'Prefix every rooted link with the base path of the app.',
        trigger: 'after',
        order: 2000,
        code: function(data, compile, node)
        {
            this.anchor = (child, base) =>
            {
                const href = child.getAttribute('href');

                if(href && href.startsWith('/') && !child.__base)
                {
                    child.setAttribute('href', base + href);
                    child.__base = base;
                }
            };

            this.visit = (child, base) =>
            {
                if(child.tagName === 'A')
                {
                    this.anchor(child, base);
                }

                if(child.childNodes.length)
                {
                    this.walk(child, base);
                }
            };

            this.walk = (parent, base) =>
            {
                for(const child of parent.childNodes)
                {
                    if(child.nodeType === 1)
                    {
                        this.visit(child, base);
                    }
                }
            };

            const base = onetype.Base();

            if(base)
            {
                this.walk(node, base);
            }
        }
    });
});
