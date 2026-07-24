// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.teleport.sweep', function()
{
    this.anchors = () =>
    {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        const present = new Set();

        for(let comment = walker.nextNode(); comment; comment = walker.nextNode())
        {
            if(comment.textContent.startsWith('ot-teleport:'))
            {
                present.add(comment.textContent.slice('ot-teleport:'.length));
            }
        }

        return present;
    };

    this.clean = (taken) =>
    {
        const present = this.anchors();

        for(const [mark, held] of taken)
        {
            if(!present.has(mark) && held.node.isConnected)
            {
                held.node.remove();
                taken.delete(mark);
            }
        }
    };

    if(!directives.StoreHas('teleports'))
    {
        return;
    }

    const taken = directives.StoreGet('teleports');

    if(taken.size)
    {
        this.clean(taken);
    }
});
