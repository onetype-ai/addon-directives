// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.lazy', function(mark, compile, node)
{
    this.reveal = (html) =>
    {
        const paused = compile.children;

        compile.children = false;

        const compiled = compile.render.Compile(html, compile.data);

        while(compiled.element.firstChild)
        {
            node.appendChild(compiled.element.firstChild);
        }

        compile.children = paused;
        node.removeAttribute('ot-skip');
    };

    if(!directives.StoreHas('lazy'))
    {
        directives.StoreSet('lazy', new Set());
    }

    const key = compile.render.Name + ':' + mark;
    const seen = directives.StoreGet('lazy');

    if(seen.has(key))
    {
        return;
    }

    const html = node.innerHTML;

    node.innerHTML = '';
    node.setAttribute('ot-skip', '');
    compile.children = false;

    onetype.ObserverVisible(node, (entry) =>
    {
        if(!entry.isIntersecting || seen.has(key))
        {
            return;
        }

        seen.add(key);
        this.reveal(html);
    });
});
