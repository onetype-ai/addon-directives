// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'directives:front/events',
        addon: 'directives',
        description: 'An event directive binds its handler to the node, the document carries the event to it, and ot-model walks both ways.',
        callback: async function({ mount, click, type, settle, eval: read, assert })
        {
            this.clicking = async () =>
            {
                await mount('<button id="node" ot-click="() => { document.querySelector(\'#node\').textContent = \'clicked\' }">idle</button>');
                await click('#node');

                assert.text('#node', 'clicked', 'a click reaches the handler bound to the node');
            };

            this.consumed = async () =>
            {
                await mount('<button id="node" ot-click="() => { }">idle</button>');

                settle();

                assert.attribute('#node', 'ot-click', null, 'the directive leaves the markup once it is bound');
            };

            this.typing = async () =>
            {
                await mount('<input id="field" ot-input="(payload) => { document.querySelector(\'#echo\').textContent = payload.event.target.value }">'
                    + '<span id="echo"></span>');
                await type('#field', 'typed');

                assert.text('#echo', 'typed', 'an input event carries the value to the handler');
            };

            this.modelled = async () =>
            {
                await mount('<input id="field" ot-model="word"><span id="echo">{{ word }}</span>', { word: 'start' });

                assert.equal(await read('document.querySelector("#field").value'), 'start', 'the model fills the field from the data');

                await type('#field', 'changed');

                assert.text('#echo', 'changed', 'and carries what is typed back into it');
            };

            this.absent = async () =>
            {
                await mount('<p id="node">nothing to click</p>');

                await assert.throws(() => click('#nowhere'), 'clicking a node that is not there');
            };

            await this.clicking();
            await this.consumed();
            await this.typing();
            await this.modelled();
            await this.absent();
        }
    });
});
