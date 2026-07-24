// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.document.mouseover', (event) =>
{
    directives.Fn('item.enter', event);

    directives.Fn('item.leave', event);
});
