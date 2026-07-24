// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

directives.Fn('item.teleport', function(selector, compile, node)
{
    if(!directives.StoreHas('teleports.pending'))
    {
        directives.StoreSet('teleports.pending', []);
    }

    directives.StoreGet('teleports.pending').push({
        selector: selector,
        node: node,
        key: compile.render.Name + ':' + compile.identifier
    });
});
