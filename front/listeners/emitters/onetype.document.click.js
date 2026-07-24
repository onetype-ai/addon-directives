// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.document.click', (event) =>
{
    directives.Fn('do.dispatch', event, 'otClick');

    directives.Fn('item.outside', event);
});
