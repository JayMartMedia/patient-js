import { CURRENT_USER_URI } from '../constants/uris';
import Auth from './authenticationUtility';

// mock fetch and create a watcher
const fetchWatcher = jest.fn((url, requestObj) => {})

global.fetch = (url, requestObj) => {
    fetchWatcher(url, requestObj);
    return Promise.resolve({
        json: () => Promise.resolve({}),
        response: 200
    })
};

describe("authenticationUtility", () => {
    afterEach(() => {    
        jest.clearAllMocks();
    });

    it('getCurrentUser calls fetch with correct uri', () => {
        Auth.getCurrentUser();
        expect(fetchWatcher).toBeCalledWith(CURRENT_USER_URI, {method: "GET"});
    })
})