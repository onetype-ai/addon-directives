// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.document.mousedown', (event) =>
{
    directives.Fn('do.dispatch', event, 'otMousedown');

    directives.Fn('item.resize', 'grab', event);
});
