// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'directives:back/claims',
        addon: 'directives',
        description: 'The addon hands canon the shape a directive file takes and the folder it registers in, and hands assets the front that carries them.',
        callback: function({ assert })
        {
            this.pattern = () =>
            {
                const patterns = onetype.AddonGet('canon.patterns');

                if(!patterns)
                {
                    return;
                }

                const claimed = patterns.ItemGet('directives:directives');

                assert.truthy(claimed, 'the directives pattern stands');
                assert.match(claimed.Get('claims'), '/items/directives/', 'claiming the folder they live in');
                assert.match(claimed.Get('pattern'), 'directives.ItemAdd', 'and naming the call it expects');
            };

            this.placement = () =>
            {
                const placements = onetype.AddonGet('canon.placements');

                if(!placements)
                {
                    return;
                }

                const placed = placements.ItemGet('directives:directives');

                assert.truthy(placed, 'the directives placement stands');
                assert.equal(placed.Get('method'), 'ItemAdd', 'naming the method');
                assert.equal(placed.Get('receiver'), 'directives', 'and the receiver it rides');
            };

            this.asset = () =>
            {
                const shipped = Object.values(onetype.assets.Items()).filter((entry) => entry.Get('addon') === 'directives');

                assert.equal(shipped.length, 1, 'assets carries the directives front once');
                assert.truthy(shipped[0].Get('js'), 'and the folder it hands over');
            };

            this.checking = () =>
            {
                const patterns = onetype.AddonGet('canon.patterns');

                if(!patterns)
                {
                    return;
                }

                assert.truthy(onetype.AddonGet('directives'), 'the addon itself registers on the back');
                assert.equal(typeof patterns.ItemGet('directives:directives').Get('assert'), 'function',
                    'and the pattern carries a check of its own beyond the shape');
            };

            this.pattern();
            this.placement();
            this.asset();
            this.checking();
        }
    });
});
