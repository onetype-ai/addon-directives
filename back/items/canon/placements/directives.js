// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.placements', (placements) =>
{
    placements.Item({
        id: 'directives:directives',
        method: 'ItemAdd',
        receiver: 'directives',
        home: '/items/directives/',
        description: 'A directive registers only in items directives, never on the way.'
    });
});
