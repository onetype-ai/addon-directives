// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.render.compile.node', (item, compile, node, identifier) =>
{
    compile.identifier = identifier;

    directives.Fn('do.process', 'node', compile, node);
});
