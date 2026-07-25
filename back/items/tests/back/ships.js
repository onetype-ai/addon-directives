// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'directives:back/ships',
        addon: 'directives',
        description: 'Every directive the addon ships is a file of its own named for the order it runs at, and the front folder carries the whole vocabulary.',
        callback: function({ assert })
        {
            this.root = new URL('../../../..', import.meta.url).pathname.replace(/\/$/, '');

            this.files = () =>
            {
                return onetype.assets.read(this.root + '/front/items/directives');
            };

            this.named = (file) =>
            {
                return file.split('/').pop();
            };

            this.many = () =>
            {
                const shipped = this.files();

                assert.truthy(shipped.length > 30, 'the vocabulary counts ' + shipped.length + ' directives');
            };

            this.ordered = () =>
            {
                this.files().forEach((file) =>
                {
                    const name = this.named(file);

                    assert.truthy(/^\d+\./.test(name), 'the file ' + name + ' opens with the order it runs at');
                    assert.match(name, '.ot.', 'and names the directive after it');
                });
            };

            this.alone = () =>
            {
                const seen = new Set();

                this.files().forEach((file) =>
                {
                    const name = this.named(file);

                    assert.falsy(seen.has(name), 'the file ' + name + ' is shipped once');
                    seen.add(name);
                });
            };

            this.spoken = () =>
            {
                const canon = onetype.AddonGet('canon');

                if(!canon)
                {
                    return;
                }

                const broken = [];

                this.files().forEach((file) =>
                {
                    canon.violations(file).forEach((entry) =>
                    {
                        broken.push(entry.rule + ' on ' + this.named(file) + ':' + entry.line);
                    });
                });

                assert.equal(broken.length, 0, broken.length ? broken.slice(0, 4).join(', ') : 'every directive obeys the canon');
            };

            this.many();
            this.ordered();
            this.alone();
            this.spoken();
        }
    });
});
