# universal-react-mobx
同构react应用，使用mobx自动进行状态管理，更高的渲染性能。
支持单页面和多页面的服务端渲染


## 技术栈:
- react
- mobx
- express
- ES2015
- webpack
- babel 6
- Service Worker cache static files
- Web安全

## Start:
- npm install universal-react-mobx
- npm run build:dev   // for development
    - contains 'in-line-source-map' for debugging
    - 'why-did-you-update' avoidable re-render checking
    - react hot module replacing
- npm run build:prod  // for production
- npm run build:lib   // build libs file
- npm run build       // both
- npm run local       // start server for dev
- npm run watch       // watch files for building


## 怎么新增一个页面?

### 1.传统多页面方式：

#### 服务端：
* 注册路由
``` javascript
    router.get('/', getIndex);
```
* 配置appName和实例化后的store
``` javascript
    module.exports = function (req, res, next) {
        res.renderReactHTML({
            component: <Page/>,
            locals: {
                appName: 'index',
                title: 'index page'
            },
            store: new Store()
        });
    };
```

#### 客户端：
* 客户端增加一个新页面且名称和上面定义的appName一致
``` javascript
    initializeRender({
        Store
        component: <Page/>
    })
```

### 单页面spa方式
#### 新增路由：
``` javascript
<Route path="/" component={App} onChange={ onChange }>
    <IndexRoute component={ require('./pages/App/Vote').default }/>
    <Route path="vote" component={ require('./pages/App/Vote').default }/>
    <Route path="about" component={About} />
</Route>
```
#### 页面组件通过connectDataFetchers修饰器进行服务端或客户端数据拉取
``` javascript
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import connectDataFetchers from '../../utils/connectDataFetchers';

@connectDataFetchers(['VoteStore'])
@observer(['VoteStore'])
class Vote extends Component {
    static pageConfig = {
        pageId: 'Vote'
    };
    render() {
        return (
            <div className="vote">
                this is vote
                <Link to="/about?debug=test">about</Link>
                <Link to="/test">test</Link>
                message: { this.props.VoteStore.message }
            </div>
        );
    }
}
```

#### 数据拉取在common/fetchList里面操作，clientFetch是给客户端使用，serverFetch给服务端使用，这样服务端就不需要外网调用
