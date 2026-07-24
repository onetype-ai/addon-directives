// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.render.compile.after', (item, compile, node, identifier) =>
{
    compile.identifier = identifier;

    directives.Fn('do.process', 'after', compile, node);
});
