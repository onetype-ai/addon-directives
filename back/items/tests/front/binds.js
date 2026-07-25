// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'directives:front/binds',
        addon: 'directives',
        description: 'A moustache prints what the data holds and a colon attribute computes what it carries, both reading an expression.',
        callback: async function({ mount, settle, assert })
        {
            this.printed = async () =>
            {
                await mount('<p id="node">{{ word }}</p>', { word: 'printed' });

                settle();

                assert.text('#node', 'printed', 'a moustache prints the value');
            };

            this.computed = async () =>
            {
                await mount('<p id="node">{{ one + two }}</p>', {
                    one: 2,
                    two: 3
                });

                settle();

                assert.text('#node', '5', 'and reads an expression, not just a name');
            };

            this.attributed = async () =>
            {
                await mount('<a id="node" :href="target">go</a>', { target: '/there' });

                settle();

                assert.attribute('#node', 'href', '/there', 'a colon attribute carries the value');
                assert.attribute('#node', ':href', null, 'and the binding leaves the markup');
            };

            this.classed = async () =>
            {
                await mount('<p id="node" :class="tone">x</p>', { tone: 'warn' });

                settle();

                assert.attribute('#node', 'class', 'warn', 'a computed class lands on the node');
                assert.attribute('#node', ':class', null, 'and the binding leaves the markup');
            };

            this.entities = async () =>
            {
                await mount('<p id="node">{{ word }}</p>', { word: 'a & b < c' });

                settle();

                assert.text('#node', 'a & b < c', 'what the data holds reaches the page as it stands');
            };

            this.missing = async () =>
            {
                await mount('<p id="node">{{ nowhere }}</p>', {});

                settle();

                assert.exists('#node', 'a name the data never carried still renders the node');
            };

            await this.printed();
            await this.computed();
            await this.attributed();
            await this.classed();
            await this.entities();
            await this.missing();
        }
    });
});
