import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SidePanel from '../../client/src/components/SidePanel';

const mockStore = configureStore([]);

describe('SidePanel Component', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            selectedDatabase: '',
            showInput: false,
            dbName: '',
            connectionString: '',
            databases: [],
            dbId: '',
            selectedAction: 'Migrate',
            currentProject: 'Test Project',
            userRole: 'Owner',
        });
    });

    it('should render correctly for Admin/Owner', () => {
        const tree = renderer.create(
            <Provider store={store}>
                <SidePanel />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should not show add database button for regular user', () => {
        store = mockStore({
            ...store.getState(),
            userRole: 'User',
        });

        const tree = renderer.create(
            <Provider store={store}>
                <SidePanel />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should show remove database button for Admin/Owner', () => {
        const tree = renderer.create(
            <Provider store={store}>
                <SidePanel />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should not show remove database button for regular user', () => {
        store = mockStore({
            ...store.getState(),
            userRole: 'User',
        });

        const tree = renderer.create(
            <Provider store={store}>
                <SidePanel />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
