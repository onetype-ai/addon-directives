// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.document.change', (event) =>
{
    directives.Fn('item.model', 'pour', { target: event.target });

    directives.Fn('do.dispatch', event, 'otChange');
});
