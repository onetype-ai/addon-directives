// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'directives:front/loops',
        addon: 'directives',
        description: 'ot-for multiplies the node it stands on, keying each row and scoping the name, and renders nothing over nothing.',
        callback: async function({ mount, settle, eval: read, assert })
        {
            this.many = async () =>
            {
                await mount('<ul><li class="row" ot-for="word in words">{{ word }}</li></ul>', { words: ['one', 'two', 'three'] });

                settle();

                assert.count('.row', 3, 'a row renders for every entry');
                assert.text('.row', 'one', 'the first holding its own');
            };

            this.keyed = async () =>
            {
                await mount('<ul><li class="row" ot-for="word in words">{{ word }}</li></ul>', { words: ['one', 'two'] });

                settle();

                assert.truthy(await read('document.querySelector(".row").getAttribute("ot-key")'),
                    'a row without a named key still carries one the engine made');
                assert.count('.row', 2, 'and every row is there');
            };

            this.indexed = async () =>
            {
                await mount('<ul><li class="row" ot-for="word, place in words">{{ place }}:{{ word }}</li></ul>', { words: ['first'] });

                settle();

                assert.text('.row', '0:first', 'the index binds beside the value');
            };

            this.objects = async () =>
            {
                await mount('<ul><li class="row" ot-for="row in rows">{{ row.title }}</li></ul>', {
                    rows: [{ title: 'one' }, { title: 'two' }]
                });

                settle();

                assert.count('.row', 2, 'a list of objects walks the same way');
                assert.text('.row', 'one', 'reaching into each one');
            };

            this.empty = async () =>
            {
                await mount('<ul><li class="row" ot-for="word in words">{{ word }}</li></ul>', { words: [] });

                settle();

                assert.count('.row', 0, 'nothing to walk renders nothing');
            };

            this.nested = async () =>
            {
                await mount('<div><div ot-for="group in groups"><span class="leaf" ot-for="leaf in group">{{ leaf }}</span></div></div>', {
                    groups: [['a', 'b'], ['c']]
                });

                settle();

                assert.count('.leaf', 3, 'a loop inside a loop walks both');
            };

            await this.many();
            await this.keyed();
            await this.indexed();
            await this.objects();
            await this.empty();
            await this.nested();
        }
    });
});
