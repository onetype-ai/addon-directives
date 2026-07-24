// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.teleport.land', function()
{
    if(!directives.StoreHas('teleports.pending'))
    {
        return;
    }

    if(!directives.StoreHas('teleports'))
    {
        directives.StoreSet('teleports', new Map());
    }

    const taken = directives.StoreGet('teleports');

    this.arrive = (pending) =>
    {
        const anchor = document.createComment('ot-teleport:' + pending.key);

        pending.node.replaceWith(anchor);

        const target = document.querySelector(pending.selector);

        if(!target)
        {
            return;
        }

        target.appendChild(pending.node);
        taken.set(pending.key, {
            node: pending.node
        });
    };

    this.refresh = (pending, held) =>
    {
        const anchor = document.createComment('ot-teleport:' + pending.key);

        pending.node.replaceWith(anchor);
        onetype.DOMPatch(held.node, pending.node);
    };

    this.settle = (pending) =>
    {
        const held = taken.get(pending.key);

        if(held && held.node.isConnected)
        {
            return this.refresh(pending, held);
        }

        taken.delete(pending.key);
        this.arrive(pending);
    };

    const pending = directives.StoreGet('teleports.pending');

    while(pending.length)
    {
        this.settle(pending.shift());
    }
});
