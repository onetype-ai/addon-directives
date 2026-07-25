// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'directives:front/fetches',
        addon: 'directives',
        description: 'ot-fetch calls the endpoint it names and binds the answer inside it, and ot-html writes markup where a moustache prints.',
        callback: async function({ mount, network, settle, eval: read, assert })
        {
            this.settled = async () =>
            {
                settle();

                await new Promise((waited) => setTimeout(waited, 150));

                settle();
            };

            this.called = async () =>
            {
                await network({ '/api/proof': { word: 'answered' } });

                await mount('<ot-fetch get="/api/proof" bind="answer">'
                    + '<span id="out">{{ answer.response.word }}</span>'
                    + '</ot-fetch>');

                await this.settled();

                assert.text('#out', 'answered', 'the answer binds for the markup inside');
                assert.equal(await read('window.__requests.length'), 1, 'and the endpoint was called once');
            };

            this.addressed = async () =>
            {
                const called = await read('window.__requests.length ? window.__requests[0].url : "nothing"');

                assert.match(called, '/api/proof', 'the call went to the endpoint it names');
            };

            this.written = async () =>
            {
                await mount('<div id="node" ot-html="markup"></div>', { markup: '<b class="inner">bold</b>' });

                settle();

                assert.exists('.inner', 'ot-html writes markup as markup');
                assert.text('.inner', 'bold', 'carrying what it held');
            };

            this.printed = async () =>
            {
                await mount('<div id="node">{{ markup }}</div>', { markup: '<b>bold</b>' });

                settle();

                assert.falsy(await read('document.querySelector("#node b")'), 'a moustache prints markup rather than writing it');
            };

            await this.called();
            await this.addressed();
            await this.written();
            await this.printed();
        }
    });
});
