// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'directives:front/flows',
        addon: 'directives',
        description: 'ot-if decides whether a node exists at all and ot-show only whether it can be seen, so one leaves the dom and the other stays in it.',
        callback: async function({ mount, settle, assert })
        {
            this.present = async () =>
            {
                await mount('<p id="node" ot-if="on">here</p>', { on: true });

                settle();

                assert.exists('#node', 'a true expression leaves the node standing');
                assert.text('#node', 'here', 'carrying what it held');
            };

            this.absent = async () =>
            {
                await mount('<p id="node" ot-if="on">here</p>', { on: false });

                settle();

                assert.missing('#node', 'a false expression takes the node out of the dom');
            };

            this.seen = async () =>
            {
                await mount('<p id="node" ot-show="on">here</p>', { on: true });

                settle();

                assert.exists('#node', 'a shown node stands');
                assert.attribute('#node', 'style', null, 'wearing nothing to hide it');
            };

            this.hidden = async () =>
            {
                await mount('<p id="node" ot-show="on">here</p>', { on: false });

                settle();

                assert.exists('#node', 'a hidden node is still in the dom');
                assert.contains('#node', 'here', 'still holding what it held');
            };

            this.expressions = async () =>
            {
                await mount('<p id="node" ot-if="count > 2">here</p>', { count: 3 });

                settle();

                assert.exists('#node', 'the expression is read, not just the name');
            };

            await this.present();
            await this.absent();
            await this.seen();
            await this.hidden();
            await this.expressions();
        }
    });
});
