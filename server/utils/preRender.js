function preRender(stores, { component, location, params }, appConfig = {}, req) {
    component = component.WrappedComponent ? component.WrappedComponent : component;
    const pageConfig = component.OriginalPage && component.OriginalPage.pageConfig;

    return component.fetchData ? component.fetchData({ stores, location, params, appConfig, pageConfig }, req) : null;

    let lastComponent = components[components.length - 1].WrappedComponent ? components[components.length - 1].WrappedComponent : components[components.length - 1];
    appConfig.pageId = lastComponent && lastComponent.OriginalPage && lastComponent.OriginalPage.pageConfig && lastComponent.OriginalPage.pageConfig.pageId;

    return Promise.all(promises);
}

export default preRender;
