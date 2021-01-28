import { shallow, mount } from 'enzyme';
import { ReactTable } from './ReactTable';


// create data with different lengths to test pagination
const data_3 = [
    {id: 1, firstName: 'Jay', lastName: 'Day', edit: false},
    {id: 2, firstName: 'Kay', lastName: 'Fay', edit: true},
    {id: 3, firstName: 'lay', lastName: 'Day', edit: false},
]

const data_12 = [
    {id: 1, firstName: 'Jay', lastName: 'Day', edit: false},
    {id: 2, firstName: 'kay', lastName: 'Day', edit: true},
    {id: 3, firstName: 'lay', lastName: 'Day', edit: false},
    {id: 4, firstName: 'Jmay', lastName: 'Day', edit: true},
    {id: 5, firstName: 'nay', lastName: 'Day', edit: false},
    {id: 6, firstName: '0oay', lastName: 'Day', edit: true},
    {id: 1, firstName: 'Jay', lastName: 'Day', edit: false},
    {id: 2, firstName: 'kay', lastName: 'Day', edit: true},
    {id: 3, firstName: 'lay', lastName: 'Day', edit: false},
    {id: 4, firstName: 'Jmay', lastName: 'Day', edit: true},
    {id: 5, firstName: 'nay', lastName: 'Day', edit: false},
    {id: 6, firstName: '0oay', lastName: 'Day', edit: true},
]

const columns = [
    { Header: 'First Name', accessor: 'firstName' },
    { Header: 'Last Name', accessor: 'lastName' },
    { Header: 'DOB', accessor: 'dob' },
];

const currentUserTrainee = {
    "principal":{
        "username":"linda",
        "authorities":[
            {"role":"ROLE_TRAINEE"},
            {"role":"patient:read"}
        ],
        "accountNonExpired":true,
        "accountNonLocked":true,
        "credentialsNonExpired":true,
        "enabled":true
    },
    "authorities":[
        {"role":"ROLE_TRAINEE"},
        {"role":"patient:read"}
    ],
    "details":{
        "remoteAddress":"127.0.0.1"
    },
    "authenticated":true
}

const currentUserAdministrator = {
    "principal":{
        "username":"jane",
        "authorities":[
            {"role":"ROLE_ADMINISTRATOR"},
            {"role":"patient:read"},
            {"role":"patient:write"}
        ],
        "accountNonExpired":true,
        "accountNonLocked":true,
        "credentialsNonExpired":true,
        "enabled":true
    },
    "authorities":[
        {"role":"ROLE_ADMINISTRATOR"},
        {"role":"patient:read"},
        {"role":"patient:write"}
    ],
    "details":{
        "remoteAddress":"127.0.0.1"
    },
    "authenticated":true
}

const getShallow = (data, user) => {
    return shallow(<ReactTable 
        columns={columns}
        data={data}
        setSelectedRows={() => {}}
        currentUser={user}
    />);
}

describe('ReactTable', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = getShallow(data_3, currentUserTrainee)
    })

    it('renders fully with no errors', () => {
        const wrapper2 = mount(<ReactTable 
            columns={columns}
            data={data_3}
            setSelectedRows={() => {}}
            currentUser={currentUserTrainee}
        />);
    })

    it('renders only passed columns when user does not have patient:write', () => {
        const wrapper = getShallow(data_3, currentUserTrainee)
        expect(wrapper.find('th')).toHaveLength(columns.length);
    })

    it('renders passed columns and select, edit when user does have patient:write', () => {
        const wrapper = getShallow(data_3, currentUserAdministrator)
        expect(wrapper.find('th')).toHaveLength(columns.length + 2);
    })

    it('has the correct title for each column', () => {
        columns.forEach((column) => {
            const colHeader = wrapper.findWhere(element => {
                return element.is('th') && element.text() == column.Header;
            })
            expect(colHeader).toHaveLength(1);
        })
    })

    it('has the correct number of rows', () => {
        const tableRows = wrapper.find('tr');

        expect(tableRows).toHaveLength(data_3.length + 1);
    })

    it('has first, previous, next, and last page buttons disabled with 10 or less rows', () => {
        const paginationElement = wrapper.find('.pagination');
        expect(paginationElement).toHaveLength(1);

        const disabledButtons = wrapper.findWhere((element) => {
            return element.is('button') && element.prop('disabled');
        })

        expect(disabledButtons).toHaveLength(4);
    })

    it('has first/previous buttons disabled, and next/last buttons enabled when more than 10 rows and on first page', () => {
        // use 12 rows to test pagination
        const wrapper = getShallow(data_12, currentUserTrainee)

        // next and last buttons should be enabled 
        const disabledNextAndLastButtons = wrapper.findWhere(element => {
            return element.is('button') && element.prop('disabled') && (element.text() == '>' || element.text() == '>>');
        })
        expect(disabledNextAndLastButtons).toHaveLength(0);

        // first and previous buttons should be disabled
        const disabledFirstAndPreviousButtons = wrapper.findWhere(element => {
            return element.is('button') && element.prop('disabled') && (element.text() == '<<' || element.text() == '<');
        })
        expect(disabledFirstAndPreviousButtons).toHaveLength(2);
    })

    it('has first/previous buttons enabled, and next/last buttons disabled when on last page of more than 10 rows', () => {
        // use 12 rows to test pagination
        const wrapper = getShallow(data_12, currentUserTrainee)

        const nextPageButton = wrapper.findWhere(element => {
            return element.is('button') && element.text() == '>';
        })

        // go to second page
        nextPageButton.simulate('click');

        // next and last buttons should be disabled
        const disabledNextAndLastButtons = wrapper.findWhere(element => {
            return element.is('button') && element.prop('disabled') && (element.text() == '>' || element.text() == '>>');
        })
        expect(disabledNextAndLastButtons).toHaveLength(2);

        // first and previous buttons should be enabled
        const disabledFirstAndPreviousButtons = wrapper.findWhere(element => {
            return element.is('button') && element.prop('disabled') && (element.text() == '<<' || element.text() == '<');
        })
        expect(disabledFirstAndPreviousButtons).toHaveLength(0);
    })

    it('can change page via buttons', () => {
        // use 12 rows to test pagination
        wrapper = getShallow(data_12, currentUserTrainee)

        // check that last page button works
        const lastPageButton = wrapper.findWhere(element => {
            return element.is('button') && element.text() == '>>';
        })
        lastPageButton.simulate('click')
        expect(wrapper.findWhere(element => element.text() == '2 of 2')).toHaveLength(1);

        // check that first page button works
        const firstPageButton = wrapper.findWhere(element => {
            return element.is('button') && element.text() == '<<';
        })
        firstPageButton.simulate('click')
        expect(wrapper.findWhere(element => element.text() == '1 of 2')).toHaveLength(1);

        //go to last page then check if previous page button works
        lastPageButton.simulate('click');
        const previousPageButton = wrapper.findWhere(element => {
            return element.is('button') && element.text() == '<';
        })
        previousPageButton.simulate('click')
        expect(wrapper.findWhere(element => element.text() == '1 of 2')).toHaveLength(1);
    })

    it('can change page via number input field', () => {
        // use 12 rows to test pagination
        wrapper = getShallow(data_12, currentUserTrainee)

        const numberInputField = wrapper.findWhere(element => {
            return element.is('input') && element.props().type == 'number';
        })

        // input a value of 2 into the number input field
        numberInputField.simulate('change', {target: {value: 2}})

        expect(wrapper.findWhere(element => element.text() == '2 of 2')).toHaveLength(1);
    })

    it('views page 1 when there is no value provided to the number input event', () => {
        // use 12 rows to test pagination
        wrapper = getShallow(data_12, currentUserTrainee)

        const numberInputField = wrapper.findWhere(element => {
            return element.is('input') && element.props().type == 'number';
        })

        // don't input a value into the number input field event
        numberInputField.simulate('change', {target: {}})

        expect(wrapper.findWhere(element => element.text() == '1 of 2')).toHaveLength(1);
    })

    it('can change the amount of rows shown via pagination', () => {
        // use 12 rows to test pagination
        wrapper = getShallow(data_12, currentUserTrainee)

        // set row count to 20
        const paginationSelection = wrapper.find('select');
        paginationSelection.simulate('change', {target: {value: "20"}});

        // check that all the rows are on the first page
        const tableRows = wrapper.find('tr');
        expect(tableRows).toHaveLength(data_12.length + 1);

        // check that there is only one page
        expect(wrapper.findWhere(element => element.text() == '1 of 1')).toHaveLength(1);
    })
});