import React, {
    PropTypes
} from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

import Base from '../pages/Base';
import { stores } from '../stores/spaStores.js';

let IS_FIRST_MOUNT_AFTER_LOAD = true;
if (process.browser) {
    var FIRST_PAGE_ID = window.__APP_CONFIG__.pageId;
}

// todo
export default function connectDataFetchers(storeKeys = [], cache) {
    return function (Page) {
        if (process.browser) {
            if (!Page.pageConfig) {
                console.error(`Page Component static propery pageConfig.pageId required!`);
            } else {
                IS_FIRST_MOUNT_AFTER_LOAD = Page.pageConfig.pageId === FIRST_PAGE_ID;
            }
        }

        @observer
        class DataFetchersWrapper extends Base {
            static propTypes = {
                params: PropTypes.object,
                location: PropTypes.shape({
                    pathname: PropTypes.string.required,
                    search: PropTypes.string,
                    query: PropTypes.string.object
                }).isRequired
            };

            static contextTypes = {
                $appConfig: PropTypes.object
            };

            static OriginalPage = Page;

            @action
            static fetchData({
                location,
                params,
                appConfig,
                pageConfig
            }, req) {
                console.log(stores);
                return Promise.all(
                    storeKeys.map(storeKey => {
                        return stores[storeKey] && stores[storeKey].loadData({
                            location,
                            params,
                            appConfig,
                            pageConfig
                        })
                    }, req));
            }

            shouldComponentUpdate(nextProps) {
                return this.props !== nextProps;
            }

            componentDidUpdate(prevProps) {
                const {
                    location
                } = this.props;
                const {
                    location: prevLocation
                } = prevProps;

                const isUrlChanged = (location.pathname !== prevLocation.pathname) ||
                    (location.search.slice(1) !== prevLocation.search.slice(1));

                if (isUrlChanged) {
                    this._fetchDataOnClient();
                }
            }

            componentDidMount() {
                if (!cache) {
                    if (!IS_FIRST_MOUNT_AFTER_LOAD) {
                        this._fetchDataOnClient();
                    }

                    IS_FIRST_MOUNT_AFTER_LOAD = false;
                } else {
                    if (!IS_FIRST_MOUNT_AFTER_LOAD && !Page.DATA_LOADED) {
                        this._fetchDataOnClient();
                    }

                    Page.DATA_LOADED = true;
                    IS_FIRST_MOUNT_AFTER_LOAD = false;
                }
            }

            _fetchDataOnClient() {
                this.constructor.fetchData({
                    params: this.props.params,
                    location: this.props.location,
                    appConfig: this.context.$appConfig
                });
            }

            render() {
                return ( 
                    <Page {...this.props }/>
                );
            }
        }

        return DataFetchersWrapper;
    };
}
