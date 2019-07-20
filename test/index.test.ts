
const run = command => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('###', command)
            resolve();
        }, 2000)
    })
}

describe('util/index.ts', () => {
    test('init', async () => {
        const args = { _: ['check'] }

        const { _: commands } = args;
        const [command = '',] = commands || [];

        switch (command) {
            case 'check':
                await run(command);
                break;

            case 'release':

                await run(command);
                break;

            default:
                console.log('@@command', 'no command found');
                break;
        }
    })
})