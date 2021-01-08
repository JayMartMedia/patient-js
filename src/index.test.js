jest.mock('react-dom', () => ({render: jest.fn() }));

describe('Index', () => {
    it('compiles successfully', () => {
        require("./index.js");
    })
})